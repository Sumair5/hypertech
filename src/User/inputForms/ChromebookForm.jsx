// === ChromebookForm.jsx ===
import React, { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";


// 🧠 Initial Chromebook form data
const initialChromebookData = {
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
    hardDriveInterface: "",
  }
};



// ✅ Chromebook Form Component
const ChromebookForm = ({ existingData }) => {
  const { addProduct, updateProduct } = useContext(ProductContext);
  // ✅ useState using existing data or fallback to initial
  const [formData, setFormData] = useState(existingData || initialChromebookData);


  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("specifications.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: value,
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingData) {
      await updateProduct("chromebooks", existingData._id, formData);
    } else {
      const response = await addProduct("chromebooks", formData);
      if (response === "ok") {
        setFormData(initialChromebookData); // Reset form after adding
      }
    }
  };

  return (
    <>
      {/* === Chromebook Input Form === */}
      <form
  onSubmit={handleSubmit}
className="custom-form"
>
  {/* === Title (String) === */}
  <label>
    Title (String):
    <input
      name="title"
      value={formData.title}
      onChange={handleChange}
      placeholder="e.g. Acer Chromebook 11"
      required
    />
  </label>

  {/* === Price (Number) === */}
  <label>
    Price (Number in PKR):
    <input
      name="price"
      type="number"
      value={formData.price}
      onChange={handleChange}
      placeholder="e.g. 35000"
      required
    />
  </label>

  {/* === Brand (String - Dropdown) === */}
  <label>
    Brand (String):
    <select
      name="brand"
      value={formData.brand}
      onChange={handleChange}
      required
    >
      <option value="" disabled>Select Brand</option>
      <option value="HP">HP</option>
      <option value="Dell">Dell</option>
      <option value="Lenovo">Lenovo</option>
      <option value="Acer">Acer</option>
      <option value="Asus">Asus</option>
    </select>
  </label>

  {/* === Image URL (String) === */}
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

  {/* === Specifications Section === */}
  <h4>Specifications (All Fields are String unless mentioned otherwise)</h4>

  {Object.entries(formData.specifications).map(([key, value]) => {
    // Define data types and placeholders for each specification field
    const fieldTypes = {
      displaySize: { type: "String", eg: "11.6 Inches" },
      resolution: { type: "String", eg: "1366 x 768 Pixels" },
      processor: { type: "String", eg: "1.6 GHz 8032" },
      ram: { type: "String", eg: "4 GB DDR3" },
      hardDrive: { type: "String", eg: "Flash Memory Solid State" },
      graphics: { type: "String", eg: "Intel HD Graphics 400" },
      chipsetBrand: { type: "String", eg: "Intel" },
      cardDescription: { type: "String", eg: "Integrated" },
      wirelessType: { type: "String", eg: "802.11a/b/g" },
      usbPorts: { type: "Number", eg: "2" },
      batteryLife: { type: "String", eg: "12 Hours" },
      series: { type: "String", eg: "NX.GM8AA.001" },
      modelNumber: { type: "String", eg: "NX.GM8AA.001-cr" },
      operatingSystem: { type: "String", eg: "Chrome OS" },
      weight: { type: "String", eg: "2.87 pounds" },
      dimensions: { type: "String", eg: "8.3 x 11.7 x 0.9 inches" },
      processorBrand: { type: "String", eg: "Intel" },
      processorCount: { type: "Number", eg: "2" },
      memoryType: { type: "String", eg: "DDR3" },
      flashMemorySize: { type: "Number", eg: "32" },
      hardDriveInterface: { type: "String", eg: "Unknown" },
    };

    const { type, eg } = fieldTypes[key] || { type: "String", eg: "" };
    const labelText = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    return (
      <label key={key}>
        {labelText} ({type}):
        <input
          name={`specifications.${key}`}
          value={value}
          onChange={handleChange}
          placeholder={`e.g. ${eg}`}
          type={type === "Number" ? "number" : "text"}
        />
      </label>
    );
  })}

  {/* === Submit Button === */}
  <button type="submit">
    {existingData ? "Update" : "Add"} Chromebook
  </button>
</form>


      {/* === End Chromebook Input Form === */}
    </>
  );
};

export default ChromebookForm;
