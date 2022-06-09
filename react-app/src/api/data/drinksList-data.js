import { supabase } from '../auth';

// GET DRINKS
const getDrinksList = async () => {
  let { data: availableDrinks } = await supabase
  .from('Available Drinks')
  .select('*')

  return availableDrinks;
};

// GET SINGLE DRINK
const getSingleDrink = () => {};

// ADD DRINK
const addNewDrink = () => {};

// DELETE DRINK
const deleteDrink = async (drinkID) => {
  await supabase
  .from('Available Drinks')
  .delete()
  .eq('id', drinkID)
};

// UPDATE DRINK
const updateDrink = () => {};

export {
  getDrinksList, getSingleDrink, addNewDrink, deleteDrink, updateDrink,
};
