// 📌 Smartwatch Form Component
import React, { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";


// 🧠 Step 1: Initial Form Data constant
const initialFormData = {
  title: "",
  price: "",
  brand: "",
  image_url: "",
  specifications: {
    displaySize: "",
    resolution: "",
    processor: "",
    ram: "",
    hardDrive: "",
    graphics: "",
    chipsetBrand: "",
    cardDescription: "",
    wirelessType: "",
    usbPorts: "",
    batteryLife: "",
    series: "",
    modelNumber: "",
    operatingSystem: "",
    weight: "",
    dimensions: "",
    processorBrand: "",
    processorCount: "",
    memoryType: "",
    flashMemorySize: "",
    hardDriveInterface: ""
  }
};

const SmartwatchForm = ({ existingData }) => {
  const { addProduct, updateProduct } = useContext(ProductContext);
// 🧠 Step 2: useState using initialFormData
const [formData, setFormData] = useState(existingData || initialFormData);


  // 📥 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("specifications.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // 📤 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingData) {
      await updateProduct("smartwatches", existingData._id, formData);
    } else {
      const response = await addProduct("smartwatches", formData);
      if (response === "ok") {
        setFormData(initialFormData); // Reset form after adding
      }
    }
  };

  // 🧾 Form UI
  return (
    <form
    onSubmit={handleSubmit}
className="custom-form"
  >
    {/* === 🟦 Basic Info === */}
    <label>
      Title (String)
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g. Galaxy Watch 4"
        required
      />
    </label>
  
    <label>
      Price (Number)
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="e.g. 24999"
        required
      />
    </label>
  
    <label>
      Brand (String)
      <input
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="e.g. Samsung"
        required
      />
    </label>
  
    <label>
      Image URL (String)
      <input
        name="image_url"
        value={formData.image_url}
        onChange={handleChange}
        placeholder="e.g. https://image.com/smartwatch.jpg"
        required
      />
    </label>
  
    {/* === ⚙️ Specifications === */}
    <h4>Specifications</h4>
    {Object.entries(formData.specifications).map(([key, val]) => {
      const isNumeric = [
        "usbPorts",
        "processorCount",
        "flashMemorySize",
      ].includes(key);
  
      return (
        <label key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)} ({isNumeric ? "Number" : "String"})
          <input
            name={`specifications.${key}`}
            value={val}
            type={isNumeric ? "number" : "text"}
            onChange={handleChange}
            placeholder={`Enter ${key}`}
          />
        </label>
      );
    })}
  
    {/* ✅ Submit Button */}
    <button type="submit">
      {existingData ? "Update" : "Add"} Smartwatch
    </button>
  </form>
  
  );
};

export default SmartwatchForm;
