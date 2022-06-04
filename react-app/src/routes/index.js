import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StoreSelect from '../components/views/StoreSelect';
import BarSelect from '../components/views/BarSelect';
import NewBar from '../components/views/NewBar';

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<StoreSelect />} />
      <Route exact path="/barselect" element={<BarSelect />} />
      <Route exact path="/newbar" element={<NewBar />} />
    </Routes>
  );
}
