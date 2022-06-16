import { supabase } from "../auth";

// GET ALL CURRENTLY STOCKED DRINK ITEMS
const getStockedDrinks = async (barID) => {
  let { data: stockedDrinks } = await supabase
    .from("Stocked Drinks")
    .select("*")
    .eq("bar_id", barID);

  return stockedDrinks;
};

// GET SINGLE STOCKED DRINK OBJECT
const getStockedDrinkObj = () => {};

// CREATE STOCKED DRINK OBJECTS
const stockDrinks = async (drinksArray) => {
  await supabase.from("Stocked Drinks").insert(drinksArray);
};

// DELETE INVENTORY OBJECT
const deleteStockedDrink = () => {};

// UPDATE INVENTORY OBJECT
const updateStockedDrink = () => {};

export {
  getStockedDrinks,
  getStockedDrinkObj,
  stockDrinks,
  deleteStockedDrink,
  updateStockedDrink,
};
