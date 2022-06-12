import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GenericButton from "../generics/GenericButton";
import NumberInput from "../generics/NumberInput";
import { Section } from "../generics/StyledComponents";

const DrinkObj = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 100%;

  padding: 8px;
  border: 1px solid white;
  border-radius: 4px;
  margin: 0px 5px;
`;

const DrinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 50px;
  border-radius: 4px;
  margin: 0px 10px;
  padding: 0px 15px;

  text-align: center;
  font-size: 14pt;
  color: black;
`;

const CompactSection = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
`;

const drinkTypeIcons = {
  beer: "beer",
  cocktail: "martini-glass-citrus",
  liquor: "bottle-droplet",
  jello: "whiskey-glass",
  water: "bottle-water",
};

function AvailableDrink({
  drink,
  selectDrink,
  setDrinkPrice,
  setStartCount,
  setPackageCount,
  showDeleteBtns,
  deleteDrinkBtn,
  showEditBtns,
  openEditDrinkModal,
}) {
  const [isSelected, setIsSelected] = useState(drink.default_drink);

  return (
    <DrinkObj>
      <CompactSection style={{ width: "100%" }}>
        <DrinkButton
          className={`btn-${isSelected ? "selected" : "unselected"}`}
          onClick={() => {
            selectDrink(drink);
            setIsSelected(!isSelected);
          }}
        >
          {drink.drink_name}
        </DrinkButton>
        {showEditBtns && (
          <GenericButton
            iconName="pen"
            className="btn-info"
            onClick={() => {
              openEditDrinkModal(drink);
            }}
          />
        )}
        {showDeleteBtns && (
          <GenericButton
            style={{ marginLeft: "5px" }}
            iconName="trash-alt"
            className="btn-danger"
            onClick={() => {
              deleteDrinkBtn(drink.id);
            }}
          />
        )}
      </CompactSection>
      <Section style={{ justifyContent: "space-between", margin: "0px 15px" }}>
        <CompactSection id="start-count-input">
          $
          <NumberInput
            defaultValue={drink.price}
            onChange={(e) => {
              setDrinkPrice(drink, e.target.value);
              drink.price = e.target.value;
            }}
          />
        </CompactSection>
        <CompactSection id="start-count-input">
          #
          <NumberInput
            defaultValue={drink.start_count}
            onChange={(e) => {
              setStartCount(drink, e.target.value);
              drink.start_count = e.target.value;
            }}
          />
        </CompactSection>
        <CompactSection id="package-count-input">
          <i
            className={`fas fa-${drinkTypeIcons[drink.drink_type]}`}
            style={{ marginRight: "5px" }}
          />
          <i className="fas fa-times" />
          <NumberInput
            defaultValue={drink.package_count}
            onChange={(e) => {
              setPackageCount(drink, e.target.value);
              drink.package_count = e.target.value;
            }}
          />
        </CompactSection>
      </Section>
    </DrinkObj>
  );
}

AvailableDrink.propTypes = {
  drink: PropTypes.shape().isRequired,
  selectDrink: PropTypes.func.isRequired,
  setDrinkPrice: PropTypes.func.isRequired,
  setStartCount: PropTypes.func.isRequired,
  setPackageCount: PropTypes.func.isRequired,
  showDeleteBtns: PropTypes.bool.isRequired,
  deleteDrinkBtn: PropTypes.func.isRequired,
  showEditBtns: PropTypes.bool.isRequired,
  openEditDrinkModal: PropTypes.func.isRequired,
};

export default AvailableDrink;
