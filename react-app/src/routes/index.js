import React from "react";
import { Route, Routes } from "react-router-dom";
import StoreSelect from "../components/views/StoreSelect";
import BarSelect from "../components/views/BarSelect";
import BarSetup from "../components/views/BarSetup";
import ServerOps from "../components/views/ServerOps";
import StockerOps from "../components/views/StockerOps";

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<StoreSelect />} />
      <Route exact path="/barselect" element={<BarSelect />} />
      <Route exact path="/barsetup" element={<BarSetup />} />
      <Route exact path="/barsetup/:barID" element={<BarSetup />} />
      <Route exact path="/serverops/:barID" element={<ServerOps />} />
      <Route exact path="/stockerops/:barID" element={<StockerOps />} />
    </Routes>
  );
}
