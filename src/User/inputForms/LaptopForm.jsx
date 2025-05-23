// === LaptopForm.jsx ===
import React, { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";


// 🧠 Initial empty laptop form data constant
const initialLaptopData = {
  title: "",
  category: "Laptops",
  brand: "",
  model: "",
  ram: {
    capacity: "",
    ramType: ""
  },
  operatingSystem: "",
  screenSize: "",
  touchScreen: false,
  resolution: "",
  displayType: "",
  processor: {
    brand: "",
    class: "",
    type: "",
    speed: "",
    number: ""
  },
  storage: {
    capacity: "",
    storageType: ""
  },
  graphics: "",
  opticalDrive: "",
  audio: "",
  usbPorts: {
    total: "",
    powered: ""
  },
  audioOutJack: "",
  hdmiPorts: "",
  wifiProtocols: "",
  mouse: "",
  keyboard: "",
  webcam: false,
  price: "",
  image_url: "",
  description: "",
  inStock: true
};



// ✅ Laptop Form Component
const LaptopForm = ({ existingData }) => {
  const { addProduct, updateProduct } = useContext(ProductContext);

// ✅ useState with fallback to existing data
const [formData, setFormData] = useState(existingData || initialLaptopData);

  // ✅ Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Nested objects handle
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  // ✅ Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingData) {
      await updateProduct("laptops", existingData._id, formData);
    } else {
      const response = await addProduct("laptops", formData);
      if (response === "ok") {
        setFormData(initialLaptopData); // Reset form after adding
      }
    }
  };

  // ✅ Form UI
  return (
    <form
  onSubmit={handleSubmit}
className="custom-form"
>
  {/* === 🧾 Basic Info === */}
  <label>
    Title (string)*:
    <input name="title" value={formData.title} onChange={handleChange} placeholder="Laptop Title" required />
  </label>

  <label>
    Brand (string)*:
    <select name="brand" value={formData.brand} onChange={handleChange} required>
      <option value="">Select Brand</option>
      <option value="HP">HP</option>
      <option value="Dell">Dell</option>
      <option value="Lenovo">Lenovo</option>
      <option value="Acer">Acer</option>
      <option value="Asus">Asus</option>
    </select>
  </label>

  <label>
    Model (string)*:
    <input name="model" value={formData.model} onChange={handleChange} placeholder="Model Number" required />
  </label>

  <label>
    Price (number)*:
    <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
  </label>

  <label>
    Image URL (string)*:
    <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL" required />
  </label>

  {/* === 🧠 RAM === */}
  <h4>RAM</h4>
  <label>
    RAM Capacity (string):
    <input name="ram.capacity" value={formData.ram.capacity} onChange={handleChange} placeholder="e.g. 8GB" />
  </label>
  <label>
    RAM Type (string):
    <input name="ram.ramType" value={formData.ram.ramType} onChange={handleChange} placeholder="e.g. DDR4" />
  </label>

  {/* === ⚙️ Processor === */}
  <h4>Processor</h4>
  {["brand", "class", "type", "speed", "number"].map((field) => (
    <label key={field}>
      Processor {field.charAt(0).toUpperCase() + field.slice(1)} (string)*:
      <input
        name={`processor.${field}`}
        value={formData.processor[field]}
        onChange={handleChange}
        placeholder={`Processor ${field}`}
        required
      />
    </label>
  ))}

  {/* === 💾 Storage === */}
  <h4>Storage</h4>
  <label>
    Storage Capacity (string):
    <input name="storage.capacity" value={formData.storage.capacity} onChange={handleChange} placeholder="e.g. 512GB" />
  </label>
  <label>
    Storage Type (string):
    <input name="storage.storageType" value={formData.storage.storageType} onChange={handleChange} placeholder="e.g. SSD" />
  </label>

  {/* === 🖥️ Display & Features === */}
  <label>
    Operating System (string)*:
    <input name="operatingSystem" value={formData.operatingSystem} onChange={handleChange} placeholder="e.g. Windows 11" required />
  </label>
  <label>
    Screen Size (string):
    <input name="screenSize" value={formData.screenSize} onChange={handleChange} placeholder="e.g. 15.6 inch" />
  </label>
  <label>
    Resolution (string):
    <input name="resolution" value={formData.resolution} onChange={handleChange} placeholder="e.g. 1920x1080" />
  </label>
  <label>
    Display Type (string):
    <input name="displayType" value={formData.displayType} onChange={handleChange} placeholder="e.g. IPS" />
  </label>
  <label>
    Graphics (string):
    <input name="graphics" value={formData.graphics} onChange={handleChange} placeholder="e.g. Intel UHD" />
  </label>
  <label>
    Optical Drive (string):
    <input name="opticalDrive" value={formData.opticalDrive} onChange={handleChange} placeholder="e.g. DVD-RW" />
  </label>
  <label>
    Audio (string):
    <input name="audio" value={formData.audio} onChange={handleChange} placeholder="e.g. Dolby Audio" />
  </label>

  {/* === 🔌 Ports === */}
  <label>
    USB Ports Total (number):
    <input name="usbPorts.total" type="number" value={formData.usbPorts.total} onChange={handleChange} placeholder="e.g. 3" />
  </label>
  <label>
    Powered USB Ports (string):
    <input name="usbPorts.powered" value={formData.usbPorts.powered} onChange={handleChange} placeholder="e.g. Yes" />
  </label>
  <label>
    Audio Out Jack (string):
    <input name="audioOutJack" value={formData.audioOutJack} onChange={handleChange} placeholder="e.g. 3.5mm" />
  </label>
  <label>
    HDMI Ports (number):
    <input name="hdmiPorts" type="number" value={formData.hdmiPorts} onChange={handleChange} placeholder="e.g. 1" />
  </label>
  <label>
    WiFi Protocols (string):
    <input name="wifiProtocols" value={formData.wifiProtocols} onChange={handleChange} placeholder="e.g. WiFi 6" />
  </label>
  <label>
    Mouse (string):
    <input name="mouse" value={formData.mouse} onChange={handleChange} placeholder="e.g. Built-in" />
  </label>
  <label>
    Keyboard (string):
    <input name="keyboard" value={formData.keyboard} onChange={handleChange} placeholder="e.g. Backlit" />
  </label>
  <label>
    Description (string):
    <input name="description" value={formData.description} onChange={handleChange} placeholder="Short description" />
  </label>

  {/* === ✅ Checkboxes === */}
  <label>
    <input type="checkbox" name="touchScreen" checked={formData.touchScreen} onChange={handleChange} />
    Touch Screen (boolean)
  </label>
  <label>
    <input type="checkbox" name="webcam" checked={formData.webcam} onChange={handleChange} />
    Webcam (boolean)
  </label>


  {/* === 📨 Submit === */}
  <button type="submit">{existingData ? "Update" : "Add"} Laptop</button>
</form>

  
  );
};

export default LaptopForm;
