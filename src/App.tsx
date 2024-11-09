import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Tabs from "./components/Tabs";

function App() {
  const articleData = [
    {
      name: "Politics",
      summary: "Trump, Senate",
    },
    {
      name: "Sports",
      summary: "Super Bowl",
    },
    {
      name: "Technology",
      summary: "SpaceX, Google",
    },
  ];
  return (
    <div>
      <h1>Newsflash</h1>
      <Tabs />
    </div>
  );
}

export default App;
