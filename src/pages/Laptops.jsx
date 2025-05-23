import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductList from "../components/reUseComp/ProductList";
import { toast } from 'react-hot-toast';

const Laptops = () => {
  const { fetchProducts } = useContext(ProductContext); // Fetch function from context
  const { brand } = useParams(); // Brand from URL params
  const navigate = useNavigate();
  const [laptopData, setLaptopData] = useState([]); // Laptop data state

  // 🧠 Static content for laptops
  const heading = "Available Laptops";
  const ParagraphTitle = "Laptop Prices In Pakistan";
  const paragraph1 = "Browse a wide selection of high-performance laptops for gaming, business, and education. Choose from latest models of Dell, HP, Lenovo, and Apple. Order online at competitive prices.";
  const paragraph2 = "Dell, HP, Lenovo, Asus, Acer, Apple, Microsoft Surface";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts("laptops") // Fetch laptop data when the component mounts
      .then((data) => {
        setLaptopData(data); // Update laptop data state
      })
      .catch((error) => {
        toast.error("Failed to load laptop data."); // Show error toast 
      });
  }, [fetchProducts]); // Re-fetch if `fetchProducts` changes

  // 🔗 Navigate to product detail
  const handleProductClick = (brandname, productTitle, productID, type = "laptops") => {
    navigate(`/${type}/laptopdetails/${encodeURIComponent(brandname)}/${encodeURIComponent(productTitle)}/${productID}`);
  };

  return (
    <ProductList
      heading={heading}
      paragraphTitle={ParagraphTitle}
      paragraph1={paragraph1}
      paragraph2={paragraph2}
      rawData={laptopData}
      brand={brand}
      handleProductClick={handleProductClick}
      dataType="laptops"
    />
  );
};

export default Laptops;
