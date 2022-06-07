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

  margin-top: 15px;
`;

const NewDrinkButton = styled.button``;

const DateDisplay = styled.div``;

export default function NewBar() {
  const [currentDate, setDate] = useState(null);
  const [floor, setFloor] = useState(0);
  const [stockerOnly, setStockerOnly] = useState(true);
  const [availableDrinks, setAvailableDrinks] = useState([])
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
  }

  useEffect(() => {
    formatCurrentDate();
    populateDrinks();
  }, []);

  return (
    <>
      <Title title="Open New Bar" />
      <BarDetails>
        <DateDisplay>
          Date
          {<br />}
          <input type="date" defaultValue={currentDate} />
        </DateDisplay>
        {<br />}
        Floor
        <BtnContainer>
          <FloorButton
            className={`btn-${floor == 1 ? "selected" : "unselected"}`}
            onClick={() => {
              setFloor(1);
            }}
          >
            1
          </FloorButton>
          <FloorButton
            className={`btn-${floor == 2 ? "selected" : "unselected"}`}
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
      
      <DrinkSelection>
        Select Drinks
        {availableDrinks.map((drink) => (
          <AvailableDrink
            key={drink.id}
            drink={drink}
          />
        ))}
        <NewDrinkButton>+</NewDrinkButton>
      </DrinkSelection>
    </>
  );
}
