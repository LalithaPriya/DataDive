// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DataDive from './pages/datadive.js';
// import Eval from './pages/eval.js';
// import QueryRouter from './pages/queryRouter';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/datadive' element={<DataDive/>}/>
      {/* <Route exact path='/eval' element={<Eval/>}></Route> */}
    </Routes>
  );
}

export default Main;