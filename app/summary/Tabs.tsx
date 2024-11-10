"use client";

import React, { useRef } from "react";

import "./tabs.css";

interface TabsProps {
  categories: string[];
  categoryContent: Record<string, string>;
}

export default function Tabs({ categories, categoryContent }: TabsProps) {
  // Use a ref to store the active category
  const activeCategoryRef = useRef<string>(categories[0]);

  // Function to handle tab clicks
  const handleTabClick = (category: string) => {
    // Update the active category ref
    activeCategoryRef.current = category;

    // Force a re-render without useState (unconventional)
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.setAttribute(
        "style",
        pane.id === category ? "display: block;" : "display: none;"
      );
    });

    document.querySelectorAll(".tab-button").forEach((button) => {
      if ((button as HTMLButtonElement).dataset.category === category) {
        button.classList.add("active-tab");
      } else {
        button.classList.remove("active-tab");
      }
    });
  };

  // Use an effect to set up the initial display
  React.useEffect(() => {
    // Show the initial active tab
    handleTabClick(activeCategoryRef.current);
  }, []);

  return (
    <>
      {/* Tab navigation */}
      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button${
              category === activeCategoryRef.current ? " active-tab" : ""
            }`}
            data-category={category}
            onClick={() => handleTabClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Content display for all categories */}
      <div className="tab-content">
        {categories.map((category) => (
          <div
            key={category}
            id={category}
            className="tab-pane"
            style={{
              display:
                category === activeCategoryRef.current ? "block" : "none",
            }}
            dangerouslySetInnerHTML={{ __html: categoryContent[category] }}
          />
        ))}
      </div>
    </>
  );
}
