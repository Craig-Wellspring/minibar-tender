import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Break, ColumnSection, Section } from "../generics/StyledComponents";
import Title from "../Title";
import NumberInput from "../generics/NumberInput";

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  row-gap: 10px;
`;

const NameInput = styled.input`
  height: 30px;
  font-size: 20px;
  width: 80%;
  text-align: center;
`;

const TypeDropdown = styled.select`
  height: 30px;
  font-size: 20px;
  padding: 4px;
  width: 80%;
`;

function AvailableDrinkModal({ drinkObj, setModalData }) {
  return (
    <ColumnSection>
      <Title title={`${drinkObj.id ? "Edit" : "Add New"} Drink`} />
      <Break />
      <ModalGrid>
        <Title title="Name" style={{ gridColumn: "1 / span 2" }} />
        <Title title="Price" />

        <NameInput
          type="text"
          defaultValue={drinkObj.drink_name}
          style={{ gridColumn: "1 / span 2" }}
          onChange={(e) => {
            setModalData({ ...drinkObj, drink_name: e.target.value });
          }}
        />
        <NumberInput
          defaultValue={drinkObj.price}
          onChange={(e) => {
            setModalData({ ...drinkObj, price: e.target.value });
          }}
        />

        <Title title="Start Count" />
        <Title title="Drink Type" />
        <Title title="Package Count" />

        <NumberInput
          defaultValue={drinkObj.start_count}
          onChange={(e) => {
            setModalData({ ...drinkObj, start_count: e.target.value });
          }}
        />
        <TypeDropdown
          defaultValue={drinkObj.drink_type}
          onChange={(e) => {
            setModalData({ ...drinkObj, drink_type: e.target.value });
          }}
        >
          <option value="beer">Beer</option>
          <option value="cocktail">Cocktail</option>
          <option value="liquor">Liquor</option>
          <option value="jello">Jello Shot</option>
          <option value="water">Water</option>
        </TypeDropdown>
        <NumberInput
          defaultValue={drinkObj.package_count}
          onChange={(e) => {
            setModalData({ ...drinkObj, package_count: e.target.value });
          }}
        />
      </ModalGrid>
      <br />
      <Section>
        <input
          type="checkbox"
          style={{ width: "25px", height: "25px" }}
          checked={drinkObj.default_drink}
          onChange={() => {
            setModalData({
              ...drinkObj,
              default_drink: !drinkObj.default_drink,
            });
          }}
        />
        <Title title="Selected by Default" />
      </Section>
    </ColumnSection>
  );
}

AvailableDrinkModal.propTypes = {
  drinkObj: PropTypes.object.isRequired,
  setModalData: PropTypes.func.isRequired,
};

export default AvailableDrinkModal;
