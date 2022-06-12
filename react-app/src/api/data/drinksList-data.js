import { supabase } from "../auth";

// GET DRINKS
const getDrinksList = async () => {
  let { data: availableDrinks } = await supabase
    .from("Available Drinks")
    .select("*");

  return availableDrinks;
};

// GET SINGLE DRINK
const getSingleDrink = () => {};

// ADD DRINK
const addNewDrink = async (drinkObj) => {
  const { data: newDrink } = await supabase
    .from("Available Drinks")
    .insert([drinkObj]);

    return newDrink[0];
};

// DELETE DRINK
const deleteDrink = async (drinkID) => {
  await supabase.from("Available Drinks").delete().eq("id", drinkID);
};

// UPDATE DRINK
const updateDrink = async (drinkObj) => {
  const { data: updatedDrinkObj } = await supabase
  .from('Available Drinks')
  .update(drinkObj)
  .eq('id', drinkObj.id)

  return updatedDrinkObj[0];
};

export { getDrinksList, getSingleDrink, addNewDrink, deleteDrink, updateDrink };
