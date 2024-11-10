'use client';

import { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr styles
import { onSubmit, FormData } from "@/app/preferences/actions";
import { validateHeaderName } from "http";

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
    const { name, value, type } = e.target;
    console.log(value);

    if (value != "") {
      var valIdx = formData['categories'].indexOf(value);

      //Add value to list
      if (valIdx == -1) {
        formData['categories'].push(value);
      }

      //Remove value from list
      else {
        formData['categories'].splice(valIdx, 1);
      }

      console.log("CAT LIST: " + formData['categories']);
    }

    const handleKeywordChange = () => {

    }

    // if (type === "checkbox") {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     [name]: (e.target as HTMLInputElement).checked,
    //   }));
    // } else {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     [name]: value,
    //   }));
    // }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Validate value
    if (value == "")
      return;

    let valIdx = formData['categories'].indexOf(value);
    let inExistingData = valIdx != -1;

    if (inExistingData) {
      formData['categories'].splice(valIdx, 1);
    } else {
      formData['categories'].push(value);
    }

    console.log("CATEGORIES: " + formData['categories']);
  }

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Validate value
    if (value == "")
      return;

    formData['keywords'] = value;
    console.log("KEYWORDS: " + formData['keywords']);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savedFormData = formData;
    onSubmit(formData);
    console.log("TARGET: " + e.target)
    console.log("Form data submitted:", formData);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="search-form-wrapper">
        <div className="form-label">
          <div className="dropdown">
            <button type="button" onClick={toggleDropdown} className="dropdown-toggle">
              {selectedCategories.length > 0 ?
                'selected (${selectedCategories.length})' : "Categories"}
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                {["general", "world", "business", "technology", "entertainment", "sports", "science", "health"].map(
                  (category) => (
                    <label key={category}>
                      <input
                        type="checkbox"
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={handleCategoryChange}
                      />
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <div className="form-label">
          <label>
            Keywords:
            <input type="text" name="keywords" onChange={handleKeywordChange} />
          </label>
        </div>

        <div className="form-label">
          <label>
            From Date:
            <input
              type="text"
              ref={fromDateRef}
              value={formData.fromDate}
              readOnly
              className="date-input"
            />
          </label>
        </div>

        <div className="form-label">
          <label>
            To Date:
            <input
              type="text"
              ref={toDateRef}
              value={formData.toDate}
              readOnly
              className="date-input"
            />
          </label>
        </div>

        <div className="form-label">
          <label>
            Subscribe to newsletter:
            <input
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
};
