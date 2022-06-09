import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GenericButton from "../buttons/GenericButton";

const DrinkObj = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
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

function AvailableDrink({
  drink,
  selectDrink,
  setStartCount,
  setDrinkPrice,
  showDeleteBtns,
  showEditBtns,
}) {
  const [isSelected, setIsSelected] = useState(drink.default_drink);

  return (
    <DrinkObj>
      {showDeleteBtns && <GenericButton iconName="trash-alt" className="btn-danger" />}
      {showEditBtns && <GenericButton iconName="pen" className="btn-info" />}
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
  showDeleteBtns: PropTypes.bool.isRequired,
  showEditBtns: PropTypes.bool.isRequired,
};

export default AvailableDrink;
