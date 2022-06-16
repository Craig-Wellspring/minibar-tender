import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Break, ColumnSection, Section } from "../generics/StyledComponents";
import StockerWrapupDrink from "../listables/StockerWrapupDrink";
import Title from "../Title";

const WrapupForm = styled.div`
  display: grid;
  grid-template-columns: auto 50px 50px;
  gap: 8px;

  justify-items: center;
  align-items: center;

  margin: 20px 0px;
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

  useEffect(() => {
    let total = 0;
    drinks.forEach((d) => {
      total += calculateDrinkSales(d);
    });
    setTotalSales(total);
  }, [drinks]);

  return (
    <ColumnSection id="modal-content">
      <div>
        Floor: {barData.floor} | {String(barData.bar_date).substring(5)}
      </div>

      <WrapupForm id="wrapup-form">
        <div>{"Drink Name"}</div>
        <div>{"Total Count"}</div>
        <div>{"End Count"}</div>
        {drinks.map((d) => (
          <StockerWrapupDrink
            key={d.id}
            drink={d}
            updateDrinkEndCount={updateDrinkEndCount}
          />
        ))}
      </WrapupForm>

      <ColumnSection id="totals-display">
        <Title title="Total Sales:" />
        <Title title={`$${totalSales}`} style={{ fontSize: "40px" }} />
        <Title title="Tipout:" />
        <Title
          title={`$${Math.round(totalSales * 0.03)}`}
          style={{ fontSize: "40px" }}
        />
      </ColumnSection>
    </ColumnSection>
  );
}
