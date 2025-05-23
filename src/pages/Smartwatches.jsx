// 📦 Smart Watches Page
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductList from "../components/reUseComp/ProductList";
import { toast } from 'react-hot-toast';

const Smartwatches = () => {
  const { fetchProducts } = useContext(ProductContext); // 📡 Context se fetchProducts function le rahe hain
  const { brand } = useParams(); // 🔠 URL se brand nikal rahe hain
  const navigate = useNavigate();
  const [smartwatchData, setSmartwatchData] = useState([]); // 📊 Smart Watch data state

  // 📘 Static Content
  const heading = "Smart Watches in Pakistan";
  const ParagraphTitle = "Latest Smart Watches";
  const paragraph1 = "Explore the latest collection of smart watches from Apple, Samsung, Huawei, and more. Stylish and feature-rich Smartwatches for health, fitness, and everyday use.";
  const paragraph2 = "Apple Watch, Samsung Galaxy Watch, Huawei Watch GT, Fitbit & more";

  // 🧠 Component mount hone par data fetch karna
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts("smartwatches")
      .then((data) => {
        setSmartwatchData(data); // 💾 State update
      })
      .catch((error) => {
        toast.error("Failed to load smart watches data."); // ❌ Error toast
      });
  }, [fetchProducts]);

  // 🔗 Detail page navigate function
  const handleProductClick = (brandname, productTitle, productID, type = "Smartwatches") => {
    navigate(`/${type}/smartwatchedetails/${encodeURIComponent(brandname)}/${encodeURIComponent(productTitle)}/${productID}`);
  };

  return (
    <ProductList
      heading={heading}
      paragraphTitle={ParagraphTitle}
      paragraph1={paragraph1}
      paragraph2={paragraph2}
      rawData={smartwatchData}
      brand={brand}
      handleProductClick={handleProductClick}
      dataType="Smartwatches"
    />
  );
};

export default Smartwatches;
