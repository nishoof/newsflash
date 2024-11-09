// src/components/Form.tsx
import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr styles
import './Input.css';
import { get } from "http";

let savedFormData: FormData = {
  subscribe: false,
  categories: "",
  fromDate: "",
  toDate: "",
  keywords: ""
};

interface Props {
  onSubmit: () => void;
}

interface FormData {
  subscribe: boolean;
  categories: string;
  fromDate: string;
  toDate: string;
  keywords: string;
}

export function getFormData(): FormData {
  return savedFormData;
}

const Form = ({ onSubmit }: Props) => {
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

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    console.log("Form data submitted:", formData);
    savedFormData = formData;
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <section className="search-form-wrapper">
        <div>
          <label>
            Category:
            <select
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              className="dropdown"
            >
              <option value="">Select your category</option>
              <option value="general">General</option>
              <option value="world">World</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="science">Science</option>
              <option value="health">Health</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Keywords:
            <input
              type="text"
              name="keywords"
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
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

        <div>
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

        <div>
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

export default Form;
