import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GenericButton from "../generics/GenericButton";
import NumberInput from "../generics/NumberInput";
import {
  ColumnSection,
  CompactSection,
  Section,
} from "../generics/StyledComponents";

const DrinkObj = styled(ColumnSection)`
  width: 100%;
  gap: 5px;
  padding: 8px;
  margin: 0px 5px;
`;

const DrinkButton = styled(Section)`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  font-size: 18px;
`;

const BigCompactSection = styled(CompactSection)`
  font-size: 22px;
`;

const RoundButton = styled(GenericButton)`
  font-size: 16px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
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
  updateDrinkData,
  showDeleteBtns,
  deleteDrinkBtn,
  showEditBtns,
  openDrinkModal,
}) {
  return (
    <DrinkObj className="card">
      <Section style={{ width: "100%", gap: "5px" }}>
        {showDeleteBtns && (
          <RoundButton
            iconName="trash-alt"
            className="btn-danger"
            onClick={() => {
              deleteDrinkBtn(drink.id);
            }}
          />
        )}
        <DrinkButton
          className={`btn btn-${
            drink.isSelected ? "selected down" : "unselected"
          }`}
          onClick={() => {
            updateDrinkData(drink, "isSelected", !drink.isSelected);
          }}
        >
          {drink.drink_name}
        </DrinkButton>
        {showEditBtns && (
          <RoundButton
            iconName="pen"
            className="btn-info"
            onClick={() => {
              openDrinkModal(drink);
            }}
          />
        )}
      </Section>
      <Section
        style={{ justifyContent: "space-between", margin: "0px 15px" }}
        className="main-text"
      >
        <BigCompactSection id="start-count-input">
          $
          <NumberInput
            defaultValue={drink.price}
            onChange={(e) => {
              updateDrinkData(drink, "price", e.target.value);
            }}
          />
        </BigCompactSection>
        <BigCompactSection id="start-count-input">
          #
          <NumberInput
            defaultValue={drink.start_count}
            onChange={(e) => {
              updateDrinkData(drink, "start_count", e.target.value);
            }}
          />
        </BigCompactSection>
        <BigCompactSection id="package-count-input">
          <i
            className={`fas fa-${drinkTypeIcons[drink.drink_type]}`}
            style={{ marginRight: "5px" }}
          />
          <i className="fas fa-times" />
          <NumberInput
            defaultValue={drink.package_count}
            onChange={(e) => {
              updateDrinkData(drink, "package_count", e.target.value);
            }}
          />
        </BigCompactSection>
      </Section>
    </DrinkObj>
  );
}

AvailableDrink.propTypes = {
  drink: PropTypes.shape().isRequired,
  updateDrinkData: PropTypes.func.isRequired,
  showDeleteBtns: PropTypes.bool.isRequired,
  deleteDrinkBtn: PropTypes.func.isRequired,
  showEditBtns: PropTypes.bool.isRequired,
  openDrinkModal: PropTypes.func.isRequired,
};

export default AvailableDrink;
