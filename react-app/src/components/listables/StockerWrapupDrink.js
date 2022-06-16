import React, { useState } from "react";
import NumberInput from "../generics/NumberInput";

export default function StockerWrapupDrink({ drink, updateDrinkEndCount }) {
  return (
    <>
      <div id="drink-name">{drink.drink_name}</div>
      <div id="total-count">{drink.start_count + drink.add_count}</div>
      <NumberInput
        id="remaining-count"
        defaultValue={drink.end_count}
        onChange={(e) => updateDrinkEndCount(drink, e.target.value)}
      />
    </>
  );
}
