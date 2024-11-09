import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import PreferencesPage from "./pages/preferences";
import SummaryPage from "./pages/summary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreferencesPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;