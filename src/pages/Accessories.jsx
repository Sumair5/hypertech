// 📦 Import necessary dependencies
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductList from "../components/reUseComp/ProductList";
import { toast } from 'react-hot-toast';

const Accessories = () => {
  // 📤 Use context to fetch products
  const { fetchProducts } = useContext(ProductContext);

  // 📥 Get brand from URL parameters (optional)
  const { brand, category, sub_category } = useParams();

  // 🧭 For navigating to detail pages
  const navigate = useNavigate();

  // 🗃️ Local state to store accessory data
  const [accessoryData, setAccessoryData] = useState([]);
  // 🧠 Static content for Accessories page
  const heading = "Available Accessories";
  const ParagraphTitle = "Buy Accessories in Pakistan";
  const paragraph1 = "Discover a wide range of computer and mobile accessories including chargers, cables, mouse, keyboards, and more.";
  const paragraph2 = "Best brands like Logitech, HP, Dell, Lenovo and more.";

  // 🔃 Fetch data on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts("accessories")
      .then((data) => {
        // ✅ Data filter karte hain URL params ki base par
        const filtered = data.filter((item) => {
          if (category && sub_category) {
            return (
              item.category === category &&
              item.accessoryType === sub_category
            );
          } else if (category && !sub_category) {
            return item.category === category;
          }
          return true; // koi filter nahi to sab return
        });

        // ✅ Filtered data directly state mein
        setAccessoryData(filtered);
      })
      .catch((err) => toast.error("Failed to load accessories."));
  }, [fetchProducts, category, sub_category]);

  // 🔗 Handle product click to navigate to details
  const handleProductClick = (brandname, productTitle, productID, type = "accessories") => {
    navigate(`/${type}/accessorydetails/${encodeURIComponent(brandname)}/${encodeURIComponent(productTitle)}/${productID}`);
  }

  // 🖥️ Render reusable ProductList component
  return (
    <ProductList
      heading={heading}
      paragraphTitle={ParagraphTitle}
      paragraph1={paragraph1}
      paragraph2={paragraph2}
      rawData={accessoryData}
      brand={brand}
      handleProductClick={handleProductClick}
      dataType="accessories"
    />
  );
};

export default Accessories;
