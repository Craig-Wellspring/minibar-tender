import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Title from "../Title";
import styled from "styled-components";
import {
  addNewDrink,
  deleteDrink,
  getDrinksList,
  updateDrink,
} from "../../api/data/drinksList-data";
import AvailableDrink from "../listables/AvailableDrink";
import BackButton from "../buttons/BackButton";
import GenericButton from "../generics/GenericButton";
import { createNewBar } from "../../api/data/openBars-data";
import { stockDrinks } from "../../api/data/stockedDrinks-data";
import LoadingIcon from "../buttons/LoadingIcon";
import { ColumnSection, Section } from "../generics/StyledComponents";
import Modal from "../generics/Modal";
import AvailableDrinkModal from "../modal-content/AvailableDrinkModal";

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

export default function NewBar() {
  const navigate = useNavigate();

  const [currentDate, setDate] = useState(null);
  const [floor, setFloor] = useState(1);
  const [stockerOnly, setStockerOnly] = useState(true);

  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [availableDrinks, setAvailableDrinks] = useState([]);

  const [showDeleteBtns, setShowDeleteBtns] = useState(false);
  const [showEditBtns, setShowEditBtns] = useState(false);
  const [showBtnTray, setShowBtnTray] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [drinkModalData, setDrinkModalData] = useState(defaultDrinkData);

  const formatCurrentDate = () => {
    const rawDate = new Date();
    const formattedDate = `${rawDate.getFullYear()}-${String(
      rawDate.getMonth() + 1
    ).padStart(2, "0")}-${String(rawDate.getDate()).padStart(2, "0")}`;

    setDate(formattedDate);
  };

  const populateDrinks = async () => {
    const drinksList = await getDrinksList();
    setAvailableDrinks(drinksList);
    setSelectedDrinks(drinksList.filter((d) => d.default_drink));
  };

  const selectDrink = (drink) => {
    if (
      selectedDrinks.filter((d) => d.drink_name === drink.drink_name).length ===
      0
    ) {
      setSelectedDrinks([...selectedDrinks, drink]);
    } else {
      unselectDrink(drink);
    }
  };

  const drinkIsSelected = (drink) => {
    if (selectedDrinks.filter((d) => d.id === drink.id).length > 0) return true;
    return false;
  };

  const unselectDrink = (drink) => {
    setSelectedDrinks(selectedDrinks.filter((d) => d.id !== drink.id));
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

  //Initialize
  useEffect(() => {
    formatCurrentDate();
    populateDrinks();
  }, []);

  return (
    <Body>
      <Title title="Open New Bar" />

      <ColumnSection id="dateSection">
        <Title title="Date" />
        <DateSelector
          type="date"
          defaultValue={currentDate}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </ColumnSection>

      <ColumnSection id="floorSection">
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
            selectDrink={selectDrink}
            setDrinkPrice={setDrinkPrice}
            setStartCount={setStartCount}
            setPackageCount={setPackageCount}
            showDeleteBtns={showDeleteBtns}
            deleteDrinkBtn={deleteDrinkBtn}
            showEditBtns={showEditBtns}
            openEditDrinkModal={openEditDrinkModal}
          />
        ))}
        <Section>
          <GenericButton
            id="add-drink-button"
            className="btn-selected"
            iconName="plus"
            onClick={() => {
              openNewDrinkModal();
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
          <GenericButton
            id="show-delete-buttons"
            className={`btn-${showDeleteBtns ? "unselected" : "danger"}`}
            iconName="minus"
            onClick={() => {
              setShowDeleteBtns(!showDeleteBtns);
            }}
          />
        </Section>
      </ColumnSection>

      <Section>
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

      <Section>
        {showBtnTray ? (
          <>
            <GenericButton
              className="btn-selected"
              iconName="vote-yea"
              onClick={submitNewBar}
            />
            <BackButton />
          </>
        ) : (
          <LoadingIcon />
        )}
      </Section>

      {showModal && (
        <Modal
          id="drinkFormModal"
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
        />
      )}
    </Body>
  );
}
