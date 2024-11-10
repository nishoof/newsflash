"use client";

import { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import { onSubmit, FormData } from "@/app/preferences/actions";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr styles

import "./Input.css";

const DEFAULT_FORM_DATA: FormData = {
  subscribe: false,
  categories: [],
  fromDate: "",
  toDate: "",
  keywords: "",
}
let savedFormData: FormData = DEFAULT_FORM_DATA;

export function Form() {
  const [formData, setFormData] = useState<FormData>(savedFormData);

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

    // Reset form data
    console.log("Resetting form data");
    setFormData((prevData) => DEFAULT_FORM_DATA);
    savedFormData = DEFAULT_FORM_DATA;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    console.log(value);

    if (value != "") {
      var valIdx = formData["categories"].indexOf(value);

      //Add value to list
      if (valIdx == -1) {
        formData["categories"].push(value);
      }

      //Remove value from list
      else {
        formData["categories"].splice(valIdx, 1);
      }

      console.log("CAT LIST: " + formData["categories"]);
    }
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Validate value
    if (value == "") return;

    let valIdx = formData["categories"].indexOf(value);
    let inExistingData = valIdx != -1;

    if (inExistingData) {
      formData["categories"].splice(valIdx, 1);
      //selectedCategories.splice(valIdx, 1);

      console.log("removed: " + value);
    } else {
      formData["categories"].push(value);
      //selectedCategories.push(value);

      console.log("pushed: " + value);
    }

    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(value)
        ? prevSelected.filter((c) => c !== value)
        : [...prevSelected, value];

      return updatedCategories;
    });

    console.log("list: " + selectedCategories);
  };

  const handleKeywordChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Validate value
    if (value == "") return;

    formData["keywords"] = value;
    console.log("KEYWORDS: " + formData["keywords"]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savedFormData = formData;
    onSubmit(formData);
    console.log("TARGET: " + e.target);
    console.log("Form data submitted:", formData);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [sources, setSources] = useState<string[]>([]);

  const handleSourceChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value } = e.target;

    var valIdx = formData["sources"].indexOf(value);

    if (valIdx != -1) {
      formData["sources"].splice(valIdx, 1);
    } else {
      formData["sources"].push(value);
    }

    setSources((prevSelected) => {
      const updatedSources = prevSelected.includes(value)
        ? prevSelected.filter((c) => c !== value)
        : [...prevSelected, value];

      return updatedSources;
    });
  };

  const updateSelectedSources = (source: string) => {
    return sources.includes(source);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateSelectedCategory = (category: string) => {
    return selectedCategories.includes(category);
  };

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
              <>
                <span>
                  <label key={category}>
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
                </span>
                <br className="category-line-break" />
              </>
            ))}
          </div>
        </div>

        <div className="form-label">
          <label>
            <div className="form-descr">Searching for:</div>
            <input type="text" name="keywords" onChange={handleKeywordChange} />
          </label>
        </div>

        <div className="form-label">
          <div className="form-label date">
            <label>
              <div className="form-descr daate">From:</div>
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

        <button className="form-button" type="submit">
          Submit
        </button>
      </section>
    </form>
  );
}
