// src/components/Tabs.tsx
import React, { useState } from "react";
import Tab from "./Tab";

interface TabContent {
  id: number;
  label: string;
  content: JSX.Element;
}

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: TabContent[] = [
    { id: 0, label: "Politics", content: <div>Trump, Senate</div> },
    { id: 1, label: "Sports", content: <div>Super Bowl</div> },
    { id: 2, label: "Technology", content: <div>Google, SpaceX</div> },
  ];

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "2px solid #ddd" }}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={tab.label}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      <div style={{ padding: "20px" }}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
