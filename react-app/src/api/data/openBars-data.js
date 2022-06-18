import { supabase } from "../auth";

const storeId = 1;

// GET CURRENTLY OPEN BARS
const getOpenBars = async () => {
  const { data } = await supabase
    .from("Open Bars")
    .select("*")
    .eq("store_id", storeId);

  return data;
};

// GET SINGLE OPEN BAR
const getOpenBar = async (barID) => {
  const { data } = await supabase.from("Open Bars").select("*").eq("id", barID);
  return data[0];
};

// CREATE NEW BAR
const createNewBar = async (newBarDataObj) => {
  const { data } = await supabase.from("Open Bars").insert([newBarDataObj]);
  return data[0].id;
};

// CLOSE BAR AND UNSTOCK DRINKS FROM INVENTORY
const closeBar = async (barID) => {
  await supabase.from("Open Bars").delete().eq("id", barID);
};

// UPDATE BAR
const updateBar = async (barID, updateObject) => {
  await supabase.from("Open Bars").update(updateObject).eq("id", barID);
};

export { getOpenBars, getOpenBar, createNewBar, closeBar, updateBar };
