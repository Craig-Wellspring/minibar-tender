import axios from "axios";

const dbURL = "https://localhost:7269/api";

// GET ALL BAR SALES RECORDS

// GET SALES RECORDS BY BAR ID

// GET DRINK SALES RECORDS BY BAR ID

// CREATE BAR SALES RECORD
const createBarSalesRecord = async (barRecordObj) => {
  axios.post(`${dbURL}/barrecords`, barRecordObj);
};

// CREATE DRINK SALES RECORD
const createDrinkSalesRecord = async (drinkRecordObj) => {
  axios.post(`${dbURL}/drinkrecords`, drinkRecordObj);
};

export { createBarSalesRecord, createDrinkSalesRecord };
