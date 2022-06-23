import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ColumnSection, Label, Title } from "../generics/StyledComponents";
import StockerWrapupDrink from "../listables/StockerWrapupDrink";

const WrapupForm = styled.div`
  display: grid;
  grid-template-columns: auto 40px 40px 40px;
  gap: 8px;

  justify-items: center;
  align-items: center;

  padding: 20px;
  margin: 10px 0px;
`;

const ColumnLabel = styled.div`
  height: 40px;
  font-size: 15px;
  display: flex;
  align-items: flex-end;
  padding: 0 0 4px 0;
  border-bottom: 1px dashed white;
`;

export default function StockerWrapupModal({
  barData,
  drinks,
  updateDrinkEndCount,
}) {
  const [totalSales, setTotalSales] = useState(0);

  const calculateDrinkSales = (drink) => {
    const totalDrinks = drink.start_count + drink.add_count;
    const soldCount = barData.stocker_only
      ? totalDrinks - drink.end_count
      : drink.sold_count;
    return drink.price * soldCount;
  };

  const updateDrinkSales = () => {
    let total = 0;
    drinks.forEach((d) => {
      total += calculateDrinkSales(d);
    });
    setTotalSales(total);
  };

  useEffect(() => {
    updateDrinkSales();
  }, []);

  return (
    <ColumnSection id="modal-content">
      <ColumnSection>
        <Label>Barback</Label>
        <span>
          Floor: {barData.floor} | {String(barData.bar_date).substring(5)}
        </span>
        {barData.server_name && <span>Bartender: {barData.server_name}</span>}
      </ColumnSection>

      <WrapupForm id="wrapup-form" className="card">
        <ColumnLabel>{"Drink Name"}</ColumnLabel>
        <ColumnLabel>{"Price"}</ColumnLabel>
        <ColumnLabel>{"Total Count"}</ColumnLabel>
        <ColumnLabel>{"End Count"}</ColumnLabel>
        {drinks.map((d) => (
          <StockerWrapupDrink
            key={d.id}
            drink={d}
            updateDrinkEndCount={updateDrinkEndCount}
            updateDrinkSales={updateDrinkSales}
          />
        ))}
      </WrapupForm>

      <ColumnSection id="totals-display">
        <Label>Total Sales</Label>
        <Title style={{ fontSize: "40px" }}>{`$${totalSales}`}</Title>
        <Label>Tipout:</Label>
        <Title style={{ fontSize: "40px" }}>{`$${Math.round(
          totalSales * 0.03
        )}`}</Title>
      </ColumnSection>
    </ColumnSection>
  );
}
