import React from "react";
import NumberInput from "../generics/NumberInput";

export default function StockerWrapupDrink({
  drink,
  updateDrinkEndCount,
  updateDrinkSales,
}) {
  return (
    <>
      <div id="drink-name">{drink.drink_name}</div>
      <span style={{ whiteSpace: "nowrap" }}>${drink.price}</span>
      <div id="total-count">{drink.start_count + drink.add_count}</div>
      <NumberInput
        defaultValue={drink.end_count || null}
        placeholder="0"
        onChange={(e) => {
          updateDrinkEndCount(drink, e.target.value);
          updateDrinkSales();
        }}
      />
    </>
  );
}
