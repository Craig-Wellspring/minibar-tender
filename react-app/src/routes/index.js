import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BarSelect from '../components/views/BarSelect';
import NewBar from '../components/views/NewBar';

export default function Routing() {
  return (
    <Routes>
      <Route
        exact
        path={['/', '/barselect']}
        component={() => <BarSelect />}
      />
      <Route exact path="/newbar" component={() => <NewBar />} />
    </Routes>
  );
}
