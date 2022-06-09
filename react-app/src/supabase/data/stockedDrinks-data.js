import { supabase } from "../auth";

// GET ALL CURRENTLY STOCKED DRINK ITEMS
const getStockedDrinks = () => {};

// GET SINGLE STOCKED DRINK OBJECT
const getStockedDrinkObj = () => {};

// CREATE STOCKED DRINK OBJECT
const stockDrinks = async (drinksArray) => {
  const { data, error } = await supabase
    .from("Stocked Drinks")
    .insert(drinksArray);
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
