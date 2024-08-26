import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import WebApiServiceDetails from './components/ApiDetails';

const App: React.FC = () => {
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
