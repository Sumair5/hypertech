import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMobile, updateMobile, resetMobiles } from "../../redux/MobileSlice";

// 🧠 Initial empty mobile data constant
const initialMobileData = {
  title: "",
  description: "",
  brand: "",
  model: "",
  ram_storage: "",
  battery: "",
  display: "",
  camera: "",
  processor: "",
  price: "",
  image_url: "",
};
const MobileForm = ({ existingData }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.mobiles);
  // 📦 State initialization using existing data or empty structure
  const [mobileData, setMobileData] = useState(existingData || initialMobileData);
  console.log(existingData);

  const brands = [
    "Samsung", "Apple", "OnePlus", "Motorola", "Google Pixel",
    "Xiaomi", "Realme", "Oppo", "Vivo", "Nokia",
    "Asus", "Sony", "Huawei", "Lenovo", "Honor"
  ];

  const handleChange = (e) => {
    setMobileData({ ...mobileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingData) {
      await dispatch(updateMobile(mobileData)).unwrap();
    } else {
      const result = await dispatch(addMobile(mobileData)).unwrap();
      if (result === "ok") {
        setMobileData(initialMobileData); // Reset form after adding
        dispatch(resetMobiles());
      }
    }
  };

  return (
    <>
    {/* ===== 📱 Mobile Form With Labels Start ===== */}
    <form onSubmit={handleSubmit} className="custom-form">
      {/* ✅ Title (String)* */}
      <label>
        Title (String)*:
        <input
          name="title"
          value={mobileData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </label>

      {/* ✅ Description (String)* */}
      <label>
        Description (String)*:
        <input
          name="description"
          value={mobileData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
      </label>

      {/* ✅ Brand (String)* */}
      <label>
        Brand (String)*:
        <select
          name="brand"
          value={mobileData.brand}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </label>

      {/* ✅ Model (String)* */}
      <label>
        Model (String)*:
        <input
          name="model"
          value={mobileData.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />
      </label>

      {/* ✅ RAM & Storage (String)* */}
      <label>
        RAM & Storage (String)*:
        <input
          name="ram_storage"
          value={mobileData.ram_storage}
          onChange={handleChange}
          placeholder="RAM & Storage"
          required
        />
      </label>

      {/* ✅ Battery (String)* */}
      <label>
        Battery (String)*:
        <input
          name="battery"
          value={mobileData.battery}
          onChange={handleChange}
          placeholder="Battery"
          required
        />
      </label>

      {/* ✅ Display (String)* */}
      <label>
        Display (String)*:
        <input
          name="display"
          value={mobileData.display}
          onChange={handleChange}
          placeholder="Display"
          required
        />
      </label>

      {/* ✅ Camera (String)* */}
      <label>
        Camera (String)*:
        <input
          name="camera"
          value={mobileData.camera}
          onChange={handleChange}
          placeholder="Camera"
          required
        />
      </label>

      {/* ✅ Processor (String)* */}
      <label>
        Processor (String)*:
        <input
          name="processor"
          value={mobileData.processor}
          onChange={handleChange}
          placeholder="Processor"
          required
        />
      </label>

      {/* ✅ Price (Number)* */}
      <label>
        Price (Number)*:
        <input
          name="price"
          type="number"
          value={mobileData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
      </label>

      {/* ✅ Image URL (String)* */}
      <label>
        Image URL (String)*:
        <input
          name="image_url"
          value={mobileData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
      </label>

      {/* ✅ Submit Button */}
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : existingData ? "Update" : "Add"} Mobile
      </button>

      {/* ✅ Error Message */}
      {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}
    </form>

    {/* ===== 📱 Mobile Form With Labels End ===== */}

  </>
  );
};

export default MobileForm;
