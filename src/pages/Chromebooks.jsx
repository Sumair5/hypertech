// ✅ Start of Chromebooks Page Component

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductList from "../components/reUseComp/ProductList";
import { toast } from 'react-hot-toast';

const Chromebooks = () => {
  const { fetchProducts } = useContext(ProductContext); // 🔁 Context se data fetch karne wala function
  const { brand } = useParams(); // 🔤 URL se brand get karna
  const navigate = useNavigate();
  const [chromebookData, setChromebookData] = useState([]); // 🧠 Chromebooks data state

  // 🧾 Static content for Chromebooks page
  const heading = "Available Chromebooks";
  const ParagraphTitle = "Chromebook Prices In Pakistan";
  const paragraph1 = "Explore lightweight and affordable Chromebooks perfect for web browsing, school, and work. Top brands like Acer, ASUS, HP and Samsung. Long battery life and fast boot times included.";
  const paragraph2 = "Acer, ASUS, HP, Samsung, Lenovo, Google Pixelbook";

  // ⏳ Data fetch on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts("chromebooks") // 📥 Fetch only chromebook data
      .then((data) => {
        setChromebookData(data);
      })
      .catch(() => {
        toast.error("Failed to load chromebook data.");
      });
  }, [fetchProducts]);

  // 🔗 Navigate to chromebook detail page
 const handleProductClick = (brandname, productTitle, productID, type = "chromebooks") => {
  const path = `/${type}/chromebookdetails/${encodeURIComponent(brandname)}/${encodeURIComponent(productTitle)}/${productID}`;
  navigate(path);
};


  return (
    <ProductList
      heading={heading}
      paragraphTitle={ParagraphTitle}
      paragraph1={paragraph1}
      paragraph2={paragraph2}
      rawData={chromebookData}
      brand={brand}
      handleProductClick={handleProductClick}
      dataType="chromebooks"
    />
  );
};

export default Chromebooks;

// ✅ End of Chromebooks Page Component