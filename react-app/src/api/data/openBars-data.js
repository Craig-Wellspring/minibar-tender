import { supabase } from "../auth";

const storeId = 1;

// GET CURRENTLY OPEN BARS
const getOpenBars = async () => {
  const openBars = await supabase
    .from("Open Bars")
    .select("*")
    .eq("store_id", storeId);

  return openBars;
};

// GET SINGLE OPEN BAR
const getOpenBar = async (barId) => {};

// CREATE NEW BAR
const createNewBar = async (newBarInfoObj) => {
  const { data } = await supabase.from("Open Bars").insert([newBarInfoObj]);

  return data[0].id;
};

// GET BAR INVENTORY
const getBarInventory = async (barKey) => {};

// DELETE BAR
const deleteBar = async (barId) => {};

// CLOSE BAR AND UNSTOCK DRINKS FROM INVENTORY
const closeBar = async (barKey) => {};

// UPDATE BAR
const updateBar = async (barID, updateObject) => {
  await supabase.from("Open Bars").update(updateObject).eq("id", barID);
};

export {
  getOpenBars,
  getOpenBar,
  createNewBar,
  deleteBar,
  closeBar,
  updateBar,
  getBarInventory,
};
