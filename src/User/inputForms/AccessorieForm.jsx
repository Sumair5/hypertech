import React, { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

// ✅ Initial form state
const initialAccessoryData = {
  title: "",
  price: "",
  brand: "",
  image_url: "",
  category: "mobile", // Default category
  accessoryType: "",
  description: [""],
};

// ✅ Accessory Type Options Based on Category
const accessoryOptions = {
  mobile: [
    "cables-chargers",
    "power-banks",
    "mobile-covers",
    "screen-protectors",
    "earphones",
    "bluetooth-headsets",
    "phone-holders",
    "memory-cards",
  ],
  computer: [
    "laptop-bags",
    "laptop-chargers",
    "keyboards",
    "mouse",
    "USB-hubs",
    "external-hard-drives",
    "webcam",
    "cooling-pads",
  ],
};

// ✅ Accessory Form Component
const AccessoryForm = ({ existingData }) => {
  const { addProduct, updateProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState(
    existingData || initialAccessoryData
  );

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("description")) {
      const index = name.split(".")[1];
      const updatedDescription = [...formData.description];
      updatedDescription[index] = value;
      setFormData((prev) => ({ ...prev, description: updatedDescription }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Add new description line
  const addDescriptionLine = () => {
    setFormData((prev) => ({
      ...prev,
      description: [...prev.description, ""],
    }));
  };

  // ✅ Remove a description line
  const removeDescriptionLine = (index) => {
    const updatedDescription = formData.description.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, description: updatedDescription }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingData) {
      await updateProduct("accessories", existingData._id, formData);
    } else {
      const response = await addProduct("accessories", formData);
      if (response === "ok") {
        setFormData(initialAccessoryData);
      }
    }
  };

  return (
<form
  onSubmit={handleSubmit}
className="custom-form"
>
  {/* === Basic Fields === */}

  {/* 📌 Title (String) */}
  <label>
    Title (String):
    <input
      name="title"
      value={formData.title}
      onChange={handleChange}
      placeholder="e.g. Wireless Charger"
      required
    />
  </label>

  {/* 🏷️ Brand (String) */}
  <label>
    Brand (String):
    <input
      name="brand"
      value={formData.brand}
      onChange={handleChange}
      placeholder="e.g. Samsung"
      required
    />
  </label>

  {/* 💸 Price (Number) */}
  <label>
    Price (Number in PKR):
    <input
      name="price"
      type="number"
      value={formData.price}
      onChange={handleChange}
      placeholder="e.g. 2500"
      required
    />
  </label>

  {/* 🖼️ Image URL (String - URL) */}
  <label>
    Image URL (String):
    <input
      name="image_url"
      value={formData.image_url}
      onChange={handleChange}
      placeholder="e.g. https://example.com/image.jpg"
      required
    />
  </label>

  {/* === Category and Accessory Type === */}

  {/* 📂 Category (String - Enum) */}
  <label>
    Category (String: 'mobile' | 'computer'):
    <select
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
    >
      <option value="">Select Category</option>
      <option value="mobile">Mobile Accessory</option>
      <option value="computer">Computer Accessory</option>
    </select>
  </label>

  {/* 🧩 Accessory Type (String) */}
  <label>
    Accessory Type (String):
    <select
      name="accessoryType"
      value={formData.accessoryType}
      onChange={handleChange}
      required
    >
      <option value="">Select Accessory Type</option>
      {formData.category &&
        accessoryOptions[formData.category].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
    </select>
  </label>

  {/* === Description Section === */}

  <h4>Description (Array of Strings):</h4>
  {formData.description.map((line, index) => (
    <label key={index}>
      Description Line {index + 1} (String):
      <input
        name={`description.${index}`}
        value={line}
        onChange={handleChange}
        placeholder={`e.g. Compatible with all USB-C devices`}
      />
      <button type="button" onClick={() => removeDescriptionLine(index)}>
        Remove
      </button>
    </label>
  ))}

  <button type="button" onClick={addDescriptionLine}>
    Add Description Line
  </button>

  {/* ✅ Submit Button */}
  <button type="submit">
    {existingData ? "Update" : "Add"} Accessory
  </button>
</form>

  );
};

export default AccessoryForm;
