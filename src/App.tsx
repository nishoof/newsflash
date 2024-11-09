import React from "react";
import "./App.css";
import { useState } from "react";
import { updateText } from "./components/Summary";

import Summary from './components/Summary';
import Input from "./components/Input";

let selectedCategories = "";

function App() {
  //TODO: Call function to grab summary
  // import { getCategories } from "./components/Input";
  // const categories = getCategories();
  // console.log(categories);
  updateText(selectedCategories);
  const [formOpen, setFormOpen] = useState(true);
  return (
    <div>
      <h1>Newsflash</h1>
      {!formOpen && <Summary />}
      {formOpen && (
        <Input
          onSubmit={() => {
            setFormOpen(false);
          }}
        />
      )}
    </div>
  );
}

export function updateCategories(categories: string) {
  selectedCategories = categories;
}

export default App;
