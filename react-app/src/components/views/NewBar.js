import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Title from "../Title";
import styled from "styled-components";
import { getDrinksList } from "../../api/data/drinksList-data";
import AvailableDrink from "../listables/AvailableDrink";
import BackButton from "../buttons/BackButton";
import GenericButton from "../generics/GenericButton";
import { createNewBar } from "../../api/data/openBars-data";
import { stockDrinks } from "../../api/data/stockedDrinks-data";
import LoadingIcon from "../buttons/LoadingIcon";
import { ColumnSection, Section } from "../generics/StyledComponents";
import Modal from "../generics/Modal";

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

const ModeCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function NewBar() {
  const navigate = useNavigate();

  const [currentDate, setDate] = useState(null);
  const [floor, setFloor] = useState(1);
  const [stockerOnly, setStockerOnly] = useState(true);
  const [availableDrinks, setAvailableDrinks] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  const [showDeleteBtns, setShowDeleteBtns] = useState(false);
  const [showEditBtns, setShowEditBtns] = useState(false);
  const [showBtnTray, setShowBtnTray] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const formatCurrentDate = () => {
    const rawDate = new Date();
    const formattedDate = `${rawDate.getFullYear()}-${String(
      rawDate.getMonth() + 1
    ).padStart(2, "0")}-0${rawDate.getDate()}`;
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

  const setStartCount = (drink, newStartCount) => {
    if (newStartCount && drinkIsSelected(drink)) {
      const otherDrinks = selectedDrinks.filter((d) => d.id !== drink.id);
      drink.start_count = newStartCount;
      setSelectedDrinks([...otherDrinks, drink]);
    }
  };

  const setDrinkPrice = (drink, newPrice) => {
    if (newPrice && drinkIsSelected(drink)) {
      const otherDrinks = selectedDrinks.filter((d) => d.id !== drink.id);
      drink.price = newPrice;
      setSelectedDrinks([...otherDrinks, drink]);
    }
  };

  const defaultDrinkData = {
    drink_name: "",
    drink_type: "",
    price: 9,
    start_count: 24,
    default_drink: true,
  };

  const [drinkModalData, setDrinkModalData] = useState(defaultDrinkData);

  const openNewDrinkModal = () => {
    setShowModal(true);
  };

  const closeDrinkModal = () => {
    setShowModal(false);
    setDrinkModalData(defaultDrinkData);
  };

  const submitNewDrink = (drinkObj) => {
    console.warn("submitnewdrink");
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
        bar_id: newBarID,
      };
      drinksToStock.push(newDrinkObj);
    });
    await stockDrinks(drinksToStock);

    // Return to bar select
    navigate("/barselect");
  };

  useEffect(() => {
    formatCurrentDate();
    populateDrinks();

    availableDrinks.forEach((drink) => {
      if (drink.default_drink) {
        setSelectedDrinks([...selectedDrinks, drink]);
      }
    });
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
            setStartCount={setStartCount}
            setDrinkPrice={setDrinkPrice}
            showDeleteBtns={showDeleteBtns}
            showEditBtns={showEditBtns}
          />
        ))}
        <Section>
          <GenericButton
            id="show-delete-buttons"
            className={`btn-${showDeleteBtns ? "unselected" : "danger"}`}
            iconName="minus"
            onClick={() => {
              setShowDeleteBtns(!showDeleteBtns);
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
            id="add-drink-button"
            className="btn-selected"
            iconName="plus"
            onClick={() => {
              openNewDrinkModal();
            }}
          />
        </Section>
      </ColumnSection>

      <ModeCheck>
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
      </ModeCheck>

      <Section>
        {showBtnTray ? (
          <>
            <BackButton />
            <GenericButton
              className="btn-selected"
              iconName="vote-yea"
              onClick={submitNewBar}
            />
          </>
        ) : (
          <LoadingIcon />
        )}
      </Section>

      {showModal && (
        <Modal
          id="drinkFormModal"
          closeModal={() => {
            closeDrinkModal();
          }}
          submitModal={() => {
            submitNewDrink();
          }}
        />
      )}
    </Body>
  );
}
