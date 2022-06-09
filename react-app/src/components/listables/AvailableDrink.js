import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GenericButton from "../generics/GenericButton";
import { deleteDrink } from "../../api/data/drinksList-data";

const DrinkObj = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
`;

const NumberInput = styled.input`
  width: 2.2em;
  height: 2.2em;
  border-radius: 4px;
  text-align: center;
  margin: 4px;
  font-size: 14pt;
`;

const DrinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  width: 100%;
  height: 2.8em;
  border-radius: 4px;
  margin: 0px 10px;

  text-align: center;
  font-size: 14pt;
  color: black;
`;

const drinkTypeIcons = {
  beer: "beer",
  seltzer: "can-food",
  liquor: "bottle-droplet",
  jello: "whiskey-glass",
  water: "bottle-water"
}

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
      {showDeleteBtns && <GenericButton iconName="trash-alt" className="btn-danger" onClick={() => {deleteDrink(drink.id)}}/>}
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
        <i className={`fas fa-${drinkTypeIcons[drink.drink_type]}`} />
        {drink.drink_name}
      </DrinkButton>
      $<NumberInput
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
