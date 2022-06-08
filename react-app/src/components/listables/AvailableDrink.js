import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DrinkObj = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  padding: 5px;
`;

const NumberInput = styled.input`
  width: 3em;
  height: 3em;
  border-radius: 4px;
  text-align: center;
`;

const DrinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 4px;

  padding: 10px;
  text-align: center;
`;

function AvailableDrink({ drink, selectDrink, setStartCount, setDrinkPrice }) {
  const [isSelected, setIsSelected] = useState(drink.default_drink);

  return (
    <DrinkObj>
      <NumberInput
        type="number"
        defaultValue={drink.start_count}
        onChange={(e) => {
          setStartCount(drink, e.target.value);
          drink.start_count = e.target.value;
        }}
      />
      <DrinkButton
        className={`btn-${isSelected ? "selected" : "unselected"}`}
        onClick={() => {
          selectDrink(drink);
          setIsSelected(!isSelected);
        }}
      >
        {drink.drink_name} {drink.drink_type}
      </DrinkButton>
      <NumberInput
        type="number"
        defaultValue={drink.price}
        onChange={(e) => {
          setDrinkPrice(drink, e.target.value);
          drink.price = e.target.value;
        }}
      />
    </DrinkObj>
  );
}

AvailableDrink.propTypes = {
  drink: PropTypes.shape().isRequired,
  selectDrink: PropTypes.func.isRequired,
  setStartCount: PropTypes.func.isRequired,
  setDrinkPrice: PropTypes.func.isRequired,
};

export default AvailableDrink;
