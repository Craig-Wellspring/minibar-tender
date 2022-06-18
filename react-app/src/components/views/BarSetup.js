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
import {
  closeBar,
  createNewBar,
  getOpenBar,
} from "../../api/data/openBars-data";
import {
  deleteStockedDrinks,
  getStockedDrinks,
  stockDrinks,
} from "../../api/data/stockedDrinks-data";
import { ColumnSection, Section } from "../generics/StyledComponents";
import Modal from "../generics/Modal";
import AvailableDrinkModal from "../modal-content/AvailableDrinkModal";
import { sortDrinkListByName } from "../generics/HelperFunctions";
import LargeLoading from "../generics/LargeLoading";

const Body = styled(ColumnSection)`
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

  const [isLoading, setIsLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(null);
  const [floor, setFloor] = useState(1);
  const [stockerOnly, setStockerOnly] = useState(true);

  const [availableDrinks, setAvailableDrinks] = useState([]);

  const [showDeleteBtns, setShowDeleteBtns] = useState(false);
  const [showEditBtns, setShowEditBtns] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [drinkModalData, setDrinkModalData] = useState(defaultDrinkData);

  //Initialize
  useEffect(() => {
    setIsLoading(true);
    (async function () {
      setBarData();
      await populateDrinks();
      setIsLoading(false);
    })();
    // eslint-disable-next-line
  }, [barID]);

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

  // Modal Control
  const openDrinkModal = (drinkData) => {
    setShowModal(true);
    setDrinkModalData(drinkData || defaultDrinkData);
    window.scrollTo(0, 0);
  };

  const submitDrinkModal = async (drinkObj) => {
    let otherDrinks = availableDrinks;

    if (drinkModalData.id) {
      // Submit edit drink
      otherDrinks = availableDrinks.filter((d) => d.id !== drinkObj.id);
      delete drinkObj.isSelected;
      drinkObj = await updateDrink(drinkObj);
    } else {
      // Submit new drink
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

  // Bar Control
  const submitBar = async () => {
    setIsLoading(true);
    const barDataObj = {
      store_id: 1,
      bar_date: currentDate,
      floor: floor,
      stocker_only: stockerOnly,
    };

    if (barID) {
      // Submit edit bar
    } else {
      // Submit new bar
      const newBarID = await createNewBar(barDataObj);

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
    }

    // Return to bar select
    navigate("/barselect");
  };

  const deleteBar = async () => {
    setIsLoading(true);
    await Promise.all([closeBar(barID), deleteStockedDrinks(barID)]);
    navigate("/barselect");
  };

  return (
    <Body id="setup-body">
      <Title title={barID ? "Edit Bar " : "Open New Bar"} />
      {isLoading ? (
        <LargeLoading />
      ) : (
        <>
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

          <ColumnSection id="drink-selection">
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
              <GenericButton
                id="show-delete-buttons"
                className={`btn-${showDeleteBtns ? "unselected" : "danger"}`}
                iconName="minus"
                onClick={() => {
                  setShowDeleteBtns(!showDeleteBtns);
                }}
              />
              <GenericButton
                id="add-drink-button"
                className="btn-selected"
                iconName="plus"
                style={barID ? { width: "240px" } : { width: "120px" }}
                onClick={() => {
                  openDrinkModal();
                }}
              />
              <GenericButton
                id="show-edit-buttons"
                className={`btn-${showEditBtns ? "unselected" : "info"}`}
                iconName="edit"
                onClick={() => {
                  setShowEditBtns(!showEditBtns);
                }}
              />
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
            <BackButton />
            {showDeleteBtns && barID && (
              <GenericButton
                className="btn-danger"
                iconName="trash-alt"
                onClick={deleteBar}
              />
            )}
            <GenericButton
              className={barID ? "btn-info" : "btn-selected"}
              iconName={barID ? "check-double" : "vote-yea"}
              onClick={submitBar}
            />
          </Section>
        </>
      )}

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
