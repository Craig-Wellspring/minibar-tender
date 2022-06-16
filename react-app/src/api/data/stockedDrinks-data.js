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

// DELETE ENTIRE BAR INVENTORY
const deleteStockedDrinks = async (barID) => {
  await supabase.from("Stocked Drinks").delete().eq("bar_id", barID);
};

// UPDATE STOCKED INVENTORY OBJECT
const updateStockedDrink = async (drinkID, columnName, value) => {
  const { data } = await supabase
    .from("Stocked Drinks")
    .update({ [columnName]: value })
    .eq("id", drinkID);
};

export {
  getStockedDrinks,
  getStockedDrinkObj,
  stockDrinks,
  deleteStockedDrinks,
  updateStockedDrink,
};
