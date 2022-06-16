import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Title from "../Title";
import styled from "styled-components";
import {
  addNewDrink,
  deleteDrink,
  getAllAvailableDrinks,
  updateDrink,
} from "../../api/data/drinksList-data";
import AvailableDrink from "../listables/AvailableDrink";
import BackButton from "../buttons/BackButton";
import GenericButton from "../generics/GenericButton";
import { createNewBar, getOpenBar } from "../../api/data/openBars-data";
import {
  getStockedDrinks,
  stockDrinks,
} from "../../api/data/stockedDrinks-data";
import LoadingIcon from "../buttons/LoadingIcon";
import { ColumnSection, Section } from "../generics/StyledComponents";
import Modal from "../generics/Modal";
import AvailableDrinkModal from "../modal-content/AvailableDrinkModal";
import { sortDrinkListByName, sortedMerge } from "../generics/HelperFunctions";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`;

const DateSelector = styled.input`
  text-align: center;
  font-size: 150%;
  width: 10em;
  align-self: center;
`;

const defaultDrinkData = {
  drink_name: "",
  drink_type: "beer",
  price: 9,
  start_count: 24,
  package_count: 6,
  default_drink: true,
};

export default function BarSetup() {
  const navigate = useNavigate();
  const { barID } = useParams();

  const [currentDate, setCurrentDate] = useState(null);
  const [floor, setFloor] = useState(1);
  const [stockerOnly, setStockerOnly] = useState(true);

  const [availableDrinks, setAvailableDrinks] = useState([]);

  const [showDeleteBtns, setShowDeleteBtns] = useState(false);
  const [showEditBtns, setShowEditBtns] = useState(false);
  const [showBtnTray, setShowBtnTray] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [drinkModalData, setDrinkModalData] = useState(defaultDrinkData);

  //Initialize
  useEffect(() => {
    setBarData();
    populateDrinks();
  }, []);

  const setBarData = async () => {
    if (barID) {
      const barData = await getOpenBar(barID);
      setCurrentDate(barData.bar_date);
      setFloor(barData.floor);
      setStockerOnly(barData.stocker_only);
    } else {
      const rawDate = new Date();
      const formattedDate = `${rawDate.getFullYear()}-${String(
        rawDate.getMonth() + 1
      ).padStart(2, "0")}-${String(rawDate.getDate()).padStart(2, "0")}`;

      setCurrentDate(formattedDate);
    }
  };

  // Handle Drinks
  const populateDrinks = async () => {
    let allDrinksList = await getAllAvailableDrinks();

    if (barID) {
      // Bar is being edited
      const stockedDrinks = await getStockedDrinks(barID);
      const stockedDrinkNames = stockedDrinks?.map((d) => d.drink_name);
      allDrinksList = allDrinksList.map((d) => {
        const stockedDrinkData = stockedDrinks.find(
          (obj) => obj.drink_name === d.drink_name
        );
        return {
          ...d,
          price: stockedDrinkData?.price || d.price,
          start_count: stockedDrinkData?.start_count || d.start_count,
          package_count: stockedDrinkData?.package_count || d.package_count,
          isSelected: stockedDrinkNames?.includes(d.drink_name),
        };
      });
    } else {
      // Creating new bar
      allDrinksList = allDrinksList.map(
        (d) => (d = { ...d, isSelected: d.default_drink })
      );
    }

    setAvailableDrinks(sortDrinkListByName(allDrinksList));
  };

  const updateDrinkData = (drink, key, value) => {
    if (value !== null) {
      const otherDrinks = availableDrinks.filter((d) => d.id !== drink.id);
      drink[key] = value;
      setAvailableDrinks(sortDrinkListByName([...otherDrinks, drink]));
    }
  };

  const deleteDrinkBtn = (drinkID) => {
    deleteDrink(drinkID);
    setAvailableDrinks(
      sortDrinkListByName(availableDrinks.filter((d) => d.id !== drinkID))
    );
  };

  // Handle Modal
  const openDrinkModal = (drinkData) => {
    setShowModal(true);
    setDrinkModalData(drinkData || defaultDrinkData);
    window.scrollTo(0, 0);
  };

  const submitDrinkModal = async (drinkObj) => {
    let otherDrinks = availableDrinks;

    if (drinkModalData.id) {
      // Submit edit
      otherDrinks = availableDrinks.filter((d) => d.id !== drinkObj.id);
      delete drinkObj.isSelected;
      drinkObj = await updateDrink(drinkObj);
    } else {
      // Submit new
      drinkObj = await addNewDrink(drinkObj);
    }

    setAvailableDrinks(
      sortDrinkListByName([
        ...otherDrinks,
        { ...drinkObj, isSelected: drinkObj.default_drink },
      ])
    );
    setShowModal(false);
  };

  // Submit Button
  const submitNewBar = async () => {
    // Hide submit/back buttons
    setShowBtnTray(false);

    // Create new bar with date, floor, mode
    const newBarInfoObj = {
      store_id: 1,
      bar_date: currentDate,
      floor: floor,
      stocker_only: stockerOnly,
    };
    const newBarID = await createNewBar(newBarInfoObj);

    // Stock new bar with each drink
    const drinksToStock = [];
    const selectedDrinks = availableDrinks.filter((d) => d.isSelected);
    selectedDrinks.forEach((drink) => {
      const newDrinkObj = {
        drink_name: drink.drink_name,
        drink_type: drink.drink_type,
        price: parseInt(drink.price),
        start_count: parseInt(drink.start_count),
        package_count: parseInt(drink.package_count),
        bar_id: newBarID,
      };
      drinksToStock.push(newDrinkObj);
    });
    await stockDrinks(drinksToStock);

    // Return to bar select
    navigate("/barselect");
  };

  const submitEditBar = () => {
    // const combinedlists = sortedMerge([selectedDrinks, availableDrinks]);
    // console.warn(combinedlists);
    // Return to bar select
    // navigate("/barselect");
  };

  return (
    <Body>
      <Title title="Open New Bar" />

      <ColumnSection id="date-selection">
        <Title title="Date" />
        <DateSelector
          type="date"
          defaultValue={currentDate}
          onChange={(e) => {
            setCurrentDate(e.target.value);
          }}
        />
      </ColumnSection>

      <ColumnSection id="floor-selection">
        <Title title="Floor" />
        <Section>
          <GenericButton
            className={`btn-${floor === 1 ? "selected" : "unselected"}`}
            iconName="1"
            onClick={() => {
              setFloor(1);
            }}
          />
          <GenericButton
            className={`btn-${floor === 2 ? "selected" : "unselected"}`}
            iconName="2"
            onClick={() => {
              setFloor(2);
            }}
          />
        </Section>
      </ColumnSection>

      <ColumnSection id="drinkSelectionSection">
        <Title title="Select Drinks" />
        {availableDrinks.map((drink) => (
          <AvailableDrink
            key={drink.id}
            drink={drink}
            updateDrinkData={updateDrinkData}
            showDeleteBtns={showDeleteBtns}
            deleteDrinkBtn={deleteDrinkBtn}
            showEditBtns={showEditBtns}
            openDrinkModal={openDrinkModal}
          />
        ))}
        <Section id="drink-management-buttons">
          {!barID && (
            <GenericButton
              id="show-delete-buttons"
              className={`btn-${showDeleteBtns ? "unselected" : "danger"}`}
              iconName="minus"
              onClick={() => {
                setShowDeleteBtns(!showDeleteBtns);
              }}
            />
          )}
          <GenericButton
            id="add-drink-button"
            className="btn-selected"
            iconName="plus"
            style={barID ? { width: "240px" } : { width: "120px" }}
            onClick={() => {
              openDrinkModal();
            }}
          />
          {!barID && (
            <GenericButton
              id="show-edit-buttons"
              className={`btn-${showEditBtns ? "unselected" : "info"}`}
              iconName="edit"
              onClick={() => {
                setShowEditBtns(!showEditBtns);
              }}
            />
          )}
        </Section>
      </ColumnSection>

      <Section id="mode-select">
        <input
          type="checkbox"
          style={{ width: "25px", height: "25px" }}
          id="stockerOnly-check"
          checked={stockerOnly}
          onChange={() => {
            setStockerOnly(!stockerOnly);
          }}
        />
        <Title title="Stocker Only Mode" />
      </Section>

      <Section id="nav-buttons">
        {showBtnTray ? (
          <>
            <BackButton />
            <GenericButton
              className={barID ? "btn-info" : "btn-selected"}
              iconName={barID ? "check-double" : "vote-yea"}
              onClick={barID ? submitEditBar : submitNewBar}
            />
          </>
        ) : (
          <LoadingIcon />
        )}
      </Section>

      {showModal && (
        <Modal
          id="drink-form-modal"
          title={`${drinkModalData.id ? "Edit" : "Add a"} Drink Option`}
          modalContent={
            <AvailableDrinkModal
              drinkObj={drinkModalData}
              setModalData={setDrinkModalData}
            />
          }
          closeModal={() => {
            setShowModal(false);
          }}
          submitModal={() => {
            submitDrinkModal(drinkModalData);
          }}
          submitIcon={drinkModalData.id ? "check-double" : "check"}
          submitClass={drinkModalData.id ? "btn-info" : "btn-selected"}
        />
      )}
    </Body>
  );
}
