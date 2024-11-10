"use client";

import { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr styles
import { onSubmit, FormData } from "@/app/preferences/actions";
// Removed unused import: import { validateHeaderName } from "http";

import "./Input.css";

let savedFormData: FormData = {
  subscribe: false,
  categories: [],
  fromDate: "",
  toDate: "",
  keywords: "",
};

interface Props {
  onSubmit: () => void;
}

export function getFormData(): FormData {
  return savedFormData;
}

export function Form() {
  const [formData, setFormData] = useState<FormData>(savedFormData);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state for submission
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  const fromDateRef = useRef<HTMLInputElement | null>(null);
  const toDateRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    // Initialize Flatpickr for the "from" date input
    flatpickr(fromDateRef.current!, {
      dateFormat: "Y-m-d",
      defaultDate: today,
      onChange: (selectedDates) => {
        const selectedDate = selectedDates[0].toISOString().split("T")[0];
        setFormData((prevData) => ({ ...prevData, fromDate: selectedDate }));
      },
    });

    // Initialize Flatpickr for the "to" date input
    flatpickr(toDateRef.current!, {
      dateFormat: "Y-m-d",
      defaultDate: today,
      onChange: (selectedDates) => {
        const selectedDate = selectedDates[0].toISOString().split("T")[0];
        setFormData((prevData) => ({ ...prevData, toDate: selectedDate }));
      },
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    console.log(value);

    if (type === "checkbox" && name === "subscribe") {
      setFormData((prevData) => ({
        ...prevData,
        subscribe: checked,
      }));
      return;
    }

    if (value !== "") {
      const valIdx = formData["categories"].indexOf(value);

      // Add value to list
      if (valIdx === -1) {
        setFormData((prevData) => ({
          ...prevData,
          categories: [...prevData.categories, value],
        }));
      }
      // Remove value from list
      else {
        setFormData((prevData) => ({
          ...prevData,
          categories: prevData.categories.filter((cat) => cat !== value),
        }));
      }

      console.log("CAT LIST: " + formData["categories"]);
    }
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, categories: [...prevData.categories, value] };
      } else {
        return {
          ...prevData,
          categories: prevData.categories.filter((cat) => cat !== value),
        };
      }
    });

    setSelectedCategories((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((c) => c !== value);
      }
    });

    console.log(
      `${checked ? "Added" : "Removed"} category: ${value}`
    );
    console.log("Selected Categories: ", selectedCategories);
  };

  const handleKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    setFormData((prevData) => ({ ...prevData, keywords: value }));
    console.log("KEYWORDS: " + value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    savedFormData = formData;
    try {
      await onSubmit(formData); // Await the onSubmit function if it's async
      console.log("Form data submitted:", formData);
      // Optionally, you can reset the form or keep it hidden
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (e.g., show an error message)
      setIsSubmitting(false); // Reset submitting state on error
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleSourceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, sources: [...prevData.sources, value] };
      } else {
        return {
          ...prevData,
          sources: prevData.sources.filter((src) => src !== value),
        };
      }
    });

    setSources((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((src) => src !== value);
      }
    });

    console.log(
      `${checked ? "Added" : "Removed"} source: ${value}`
    );
    console.log("Selected Sources: ", sources);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateSelectedCategory = (category: string) => {
    return selectedCategories.includes(category);
  };

  // If submitting, show the loading spinner
  if (isSubmitting) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Otherwise, show the form
  return (
    <form onSubmit={handleSubmit}>
      <section className="search-form-wrapper">
        <div className="form-label">
          <div className="form-descr">I want to know about:</div>
          <div className="category-select">
            {[
              "general",
              "world",
              "business",
              "technology",
              "entertainment",
              "sports",
              "science",
              "health",
            ].map((category) => (
              <div key={category}>
                <label>
                  <input
                    className="checkbox v-align-center"
                    type="checkbox"
                    value={category}
                    checked={updateSelectedCategory(category)}
                    onChange={handleCategoryChange}
                  />
                  <span className="category">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </label>
                <br className="category-line-break" />
              </div>
            ))}
          </div>
        </div>

        <div className="form-label">
          <label>
            <div className="form-descr">Searching for:</div>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleKeywordChange}
            />
          </label>
        </div>

        <div className="form-label">
          <div className="form-label date">
            <label>
              <div className="form-descr date">From:</div>
              <input
                type="text"
                ref={fromDateRef}
                value={formData.fromDate}
                readOnly
                className="date-input"
              />
            </label>
          </div>

          <div className="form-label date">
            <label>
              <div className="form-descr date">To:</div>
              <input
                type="text"
                ref={toDateRef}
                value={formData.toDate}
                readOnly
                className="date-input"
              />
            </label>
          </div>
        </div>

        <div className="form-label">
          <label>
            Join mailing list
            <input
              className="checkbox v-align-center"
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </section>
    </form>
  );
}
