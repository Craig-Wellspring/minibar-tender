import { supabase } from "../auth";

// GET DRINKS
const getAllAvailableDrinks = async () => {
  let { data } = await supabase.from("Available Drinks").select("*");
  return data;
};

// ADD DRINK
const addNewDrink = async (drinkObj) => {
  const { data } = await supabase.from("Available Drinks").insert([drinkObj]);
  return data[0];
};

// DELETE DRINK
const deleteDrink = async (drinkID) => {
  await supabase.from("Available Drinks").delete().eq("id", drinkID);
};

// UPDATE DRINK
const updateDrink = async (drinkObj) => {
  const { data } = await supabase
    .from("Available Drinks")
    .update(drinkObj)
    .eq("id", drinkObj.id);
  return data[0];
};

export { getAllAvailableDrinks, addNewDrink, deleteDrink, updateDrink };
