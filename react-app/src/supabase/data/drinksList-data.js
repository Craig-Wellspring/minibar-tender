import { supabase } from '../auth';

// GET DRINKS
const getDrinksList = async () => {
  let { data: availableDrinks, error } = await supabase
  .from('Available Drinks')
  .select('*')

  return availableDrinks;
};

// GET SINGLE DRINK
const getSingleDrink = () => {};

// ADD DRINK
const addNewDrink = () => {};

// DELETE DRINK
const deleteDrink = () => {};

// UPDATE DRINK
const updateDrink = () => {};

export {
  getDrinksList, getSingleDrink, addNewDrink, deleteDrink, updateDrink,
};
