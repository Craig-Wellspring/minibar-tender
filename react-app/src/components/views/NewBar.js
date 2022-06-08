import React, { useState, useEffect } from "react";
import Title from "../Title";
import styled from "styled-components";
import { getDrinksList } from "../../supabase/data/drinksList-data";
import AvailableDrink from "../listables/AvailableDrink";

const BarDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const FloorButton = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 4px;

  font-size: 25px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ModeCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DrinkSelection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const NewDrinkButton = styled.button``;

const DateDisplay = styled.div``;

export default function NewBar() {
  const [currentDate, setDate] = useState(null);
  const [floor, setFloor] = useState(0);
  const [stockerOnly, setStockerOnly] = useState(true);
  const [availableDrinks, setAvailableDrinks] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

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
    <>
      <Title title="Open New Bar" />

      <BarDetails>
        <DateDisplay>
          Date
          {<br />}
          <input
            type="date"
            defaultValue={currentDate}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </DateDisplay>
        {<br />}
        Floor
        <BtnContainer>
          <FloorButton
            className={`btn-${floor === 1 ? "selected" : "unselected"}`}
            onClick={() => {
              setFloor(1);
            }}
          >
            1
          </FloorButton>
          <FloorButton
            className={`btn-${floor === 2 ? "selected" : "unselected"}`}
            onClick={() => {
              setFloor(2);
            }}
          >
            2
          </FloorButton>
        </BtnContainer>
        {<br />}
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
          Stocker Only Mode
        </ModeCheck>
      </BarDetails>

      {<br />}
      <DrinkSelection>
        Select Drinks
        {availableDrinks.map((drink) => (
          <AvailableDrink
            key={drink.id}
            drink={drink}
            selectDrink={selectDrink}
            setStartCount={setStartCount}
            setDrinkPrice={setDrinkPrice}
          />
        ))}
        <NewDrinkButton
          onClick={() => {
            // Create new bar with date, floor, mode

            // Stock new bar with each drink
            selectedDrinks.forEach((drink) => {
              console.warn(drink);
            });
          }}
        >
          +
        </NewDrinkButton>
      </DrinkSelection>

      {/* Accept and Cancel buttons */}
    </>
  );
}
