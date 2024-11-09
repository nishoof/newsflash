// src/components/Form.tsx
import React, { useState } from "react";
import './Input.css';

interface Props {
  onSubmit: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  subscribe: boolean;
  gender: string;
  categories: string;
  message: string;
}

const Form = ({ onSubmit }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    subscribe: false,
    gender: "",
    categories: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Type guard for checkbox inputs
    if (type === "checkbox") {
      // Cast e.target to HTMLInputElement to access `checked`
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
    // Add any submission logic here, such as API calls
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <section className="search-form-wrapper">
      <div>
          <label>
            <select
              name="Categories"
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
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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

        <div>
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        
        <div>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
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
