// 📦 Reusable product list component
import React, { useEffect, useRef, useCallback, useState } from "react";
import ProductCard from "../reUseComp/ProductCard";
import styles from "../../stylecss/ProductList.module.css"; // Importing the CSS module

const ProductList = ({
  heading,
  paragraphTitle,
  paragraph1,
  paragraph2,
  rawData,
  brand,
  handleProductClick,
  dataType, // 🔁 default "mobiles"
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("none"); // Default to "none"
  const observer = useRef();

  // 🔄 Brand filter + Sort logic
  useEffect(() => {
    const tempData = rawData.filter((item) =>
      !brand || item.brand?.toLowerCase() === brand.toLowerCase()
    );

    const sortedData = [...tempData];

    // Apply sorting based on sortOrder
    if (sortOrder === "lowToHigh") {
      sortedData.sort((a, b) => a.price - b.price); // Sort by price: Low to High
    } else if (sortOrder === "highToLow") {
      sortedData.sort((a, b) => b.price - a.price); // Sort by price: High to Low
    }
    // If "none" selected, leave data unsorted (default behavior)

    setFilteredData(sortedData); // Update the filteredData state
  }, [brand, rawData, sortOrder]); // Dependencies: selectedBrand, rawData, and sortOrder

  // ⬇️ Load More functionality
  const loadMore = useCallback(() => {
    if (visibleItems < filteredData.length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleItems((prev) => prev + 8);
        setLoading(false);
      }, 1000);
    }
  }, [visibleItems, filteredData]);

  // 🔍 Intersection observer
  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore]
  );
     
  return (
    <div className={styles.productListContainer}>
      {/* 🔹 Header section */}
      <div className={styles.productHeader}>
        <h1>{heading}</h1>
        <h1 className={styles.filterLabel}>Sort By Price</h1>
        <select
          onChange={(e) => setSortOrder(e.target.value)} // Change sort order locally
          value={sortOrder}
        >
          <option value="none">None</option> {/* No sorting applied */}
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* 🔹 Paragraph / Description */}
      <div className={styles.productInfo}>
        <h2>{paragraphTitle}</h2>
        <p>{paragraph1}</p>
        <p>{paragraph2}</p>
      </div>

      {/* 🔹 Product Cards List */}
      <div className={styles.productList}>
        {filteredData.length > 0 ? (
          filteredData.slice(0, visibleItems).map((item, index) => (
            <ProductCard
              key={item._id}
              product={item}
              onClick={handleProductClick}
              refProp={index === visibleItems - 1 ? lastItemRef : null}
            />
          ))
        ) : (
          <p>No {dataType} available .</p>
        )}
      </div>

      {/* 🔹 Loading State */}
      {loading && <p className={styles.loadingText}>Loading More...</p>}
    </div>
  );
};

export default ProductList;
