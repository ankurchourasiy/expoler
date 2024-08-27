import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import WebApiServiceDetails from './components/ApiDetails';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/WebApiServiceDetails"
          element={<WebApiServiceDetails />}
        />
      </Routes>
    </div>
  );
};

export default App;
