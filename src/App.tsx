import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PreferencesPage from "../app/preferences/page";
import SummaryPage from "../app/summary/page";

function App() {
  return (
    <div>
      <h1>Newsflash</h1>
      <Router>
        <Routes>
          <Route path="/" element={<PreferencesPage />} />
          <Route path="/summary" Component={SummaryPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
