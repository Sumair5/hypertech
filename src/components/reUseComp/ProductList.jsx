// 📦 Reusable product list component
import React, { useEffect, useRef, useCallback, useState } from "react";
import ProductCard from "../reUseComp/ProductCard";
import styles from "../../stylecss/ProductList.module.css"; // Import CSS module

const ProductList = ({
  heading,
  paragraphTitle,
  paragraph1,
  paragraph2,
  rawData,
  brand,
  handleProductClick,
  dataType = "mobiles", // Default value for dataType
}) => {
  // State to hold filtered and sorted data
  const [filteredData, setFilteredData] = useState([]);
  // Number of visible items (for "Load More" functionality)
  const [visibleItems, setVisibleItems] = useState(8);
  // Loading state when fetching more items
  const [loading, setLoading] = useState(false);
  // Sort order state, default is "none"
  const [sortOrder, setSortOrder] = useState("none");
  // Ref for intersection observer
  const observer = useRef();

  // Effect: Filter data by brand and apply sorting when brand, rawData, or sortOrder changes
  useEffect(() => {
    // Filter by brand if brand is provided
    const tempData = rawData.filter((item) =>
      !brand || item.brand?.toLowerCase() === brand.toLowerCase()
    );

    // Copy filtered data to sort
    const sortedData = [...tempData];

    // Sort based on sortOrder
    if (sortOrder === "lowToHigh") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      sortedData.sort((a, b) => b.price - a.price);
    }

    setFilteredData(sortedData); // Update state with filtered & sorted data
  }, [brand, rawData, sortOrder]);

  // Load more items when user scrolls to the bottom (intersection observer triggers this)
  const loadMore = useCallback(() => {
    if (visibleItems < filteredData.length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleItems((prev) => prev + 8);
        setLoading(false);
      }, 1000);
    }
  }, [visibleItems, filteredData]);

  // Intersection Observer callback for last visible item
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
      {/* Header Section */}
      <div className={styles.productHeader}>
        <h1>{heading}</h1>
        <h1 className={styles.filterLabel}>Sort By Price</h1>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          aria-label="Sort products by price"
        >
          <option value="none">None</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Info/Description Section */}
      <div className={styles.productInfo}>
        <h2>{paragraphTitle}</h2>
        <p>{paragraph1}</p>
        <p>{paragraph2}</p>
      </div>

      {/* Product Cards List */}
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
          <p>No {dataType} available.</p>
        )}
      </div>

      {/* Loading State */}
      {loading && <p className={styles.loadingText}>Loading More...</p>}
    </div>
  );
};

export default ProductList;
