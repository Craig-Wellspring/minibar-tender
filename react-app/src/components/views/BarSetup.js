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
import { sortedMerge } from "../generics/HelperFunctions";

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

  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [unselectedDrinks, setUnselectedDrinks] = useState([]);
  const [listedDrinks, setListedDrinks] = useState([]);

  // Deprecate \\
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

  // Handle Drink options
  const populateDrinks = async () => {
    const allDrinksList = await getAllAvailableDrinks();
    const selectedDrinksList = [];
    const unselectedDrinksList = [];
    if (barID) {
      // Sort drinks into lists based on if they are stocked in the bar being edited
      const stockedDrinks = await getStockedDrinks(barID);
      const stockedDrinkNames = stockedDrinks?.map((d) => d.drink_name);
      allDrinksList.forEach((d) => {
        if (stockedDrinkNames?.includes(d.drink_name))
          selectedDrinksList.push(d);
        else unselectedDrinksList.push(d);
      });
    } else {
      // Sort drinks into lists based on their default settings
      allDrinksList.forEach((d) => {
        if (d.default_drink) selectedDrinksList.push(d);
        else unselectedDrinksList.push(d);
      });
    }
    setSelectedDrinks(selectedDrinksList);
    setUnselectedDrinks(unselectedDrinksList);
    setListedDrinks(sortedMerge([selectedDrinksList, unselectedDrinksList]));
  };

  const toggleDrink = (drink) => {
    if (selectedDrinks.map((d) => d.id).includes(drink.id)) {
      unselectDrink(drink);
    } else {
      selectDrink(drink);
    }
  };

  const selectDrink = (drink) => {
    setSelectedDrinks([...selectedDrinks, drink]);
  }

  const unselectDrink = (drink) => {
    setSelectedDrinks(selectedDrinks.filter((d) => d.id !== drink.id));
  };

  const drinkIsSelected = (drink) => {
    if (selectedDrinks.filter((d) => d.name === drink.name).length > 0)
      return true;
    return false;
  };


  const deleteDrinkBtn = (drinkID) => {
    deleteDrink(drinkID);
    setAvailableDrinks(availableDrinks.filter((d) => d.id !== drinkID));
  };

  const setDrinkPrice = (drink, newPrice) => {
    if (newPrice && drinkIsSelected(drink)) {
      const otherDrinks = selectedDrinks.filter((d) => d.id !== drink.id);
      drink.price = newPrice;
      setSelectedDrinks([...otherDrinks, drink]);
    }
  };

  const setStartCount = (drink, newStartCount) => {
    if (newStartCount && drinkIsSelected(drink)) {
      const otherDrinks = selectedDrinks.filter((d) => d.id !== drink.id);
      drink.start_count = newStartCount;
      setSelectedDrinks([...otherDrinks, drink]);
    }
  };

  const setPackageCount = (drink, newPackageCount) => {
    if (newPackageCount && drinkIsSelected(drink)) {
      const otherDrinks = selectedDrinks.filter((d) => d.id !== drink.id);
      drink.package_count = newPackageCount;
      setSelectedDrinks([...otherDrinks, drink]);
    }
  };

  const openNewDrinkModal = () => {
    setShowModal(true);
    setDrinkModalData(defaultDrinkData);
    window.scrollTo(0, 0);
  };

  const submitNewDrink = async (drinkObj) => {
    const newDrinkObj = await addNewDrink(drinkObj);
    setAvailableDrinks([...availableDrinks, newDrinkObj]);
    closeDrinkModal();
  };

  const openEditDrinkModal = (drinkData) => {
    setShowModal(true);
    setDrinkModalData(drinkData);
    window.scrollTo(0, 0);
  };

  const submitEditDrink = async (drinkObj) => {
    closeDrinkModal();
    const filteredList = availableDrinks.filter((d) => d.id !== drinkObj.id);
    const updatedDrinkObj = await updateDrink(drinkObj);
    setAvailableDrinks([...filteredList, updatedDrinkObj]);
  };

  const closeDrinkModal = () => {
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
    const combinedlists = sortedMerge([selectedDrinks, availableDrinks]);
    console.warn(combinedlists);

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
        {listedDrinks.map((drink) => (
          <AvailableDrink
            key={drink.id}
            drink={drink}
            selectDrink={toggleDrink}
            selected={selectedDrinks.map((d) => d.id).includes(drink.id)}
            setDrinkPrice={setDrinkPrice}
            setStartCount={setStartCount}
            setPackageCount={setPackageCount}
            showDeleteBtns={showDeleteBtns}
            deleteDrinkBtn={deleteDrinkBtn}
            showEditBtns={showEditBtns}
            openEditDrinkModal={openEditDrinkModal}
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
              openNewDrinkModal();
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
            closeDrinkModal();
          }}
          submitModal={() => {
            if (drinkModalData.id) {
              submitEditDrink(drinkModalData);
            } else {
              submitNewDrink(drinkModalData);
            }
          }}
          submitIcon={drinkModalData.id ? "check-double" : "check"}
          submitClass={drinkModalData.id ? "btn-info" : "btn-selected"}
        />
      )}
    </Body>
  );
}
