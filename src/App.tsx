import React from "react";
import "./App.css";
import { useState } from "react";

import Tabs from "./components/Tabs";
import Input from "./components/Input";

function App() {
  const [formOpen, setFormOpen] = useState(true);
  return (
    <div>
      <h1>Newsflash</h1>
      {!formOpen && <Tabs />}
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

export default App;
