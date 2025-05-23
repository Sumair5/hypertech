import React, { createContext } from "react";
import apiRoutes from '../utils/apiRoutes';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken")}` // Security verification
  };

  // 📌 fetch all Products function
  const fetchProducts = async (category) => {
    try {
      const response = await fetch(apiRoutes.productsURL(category));
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return [];  // Return empty array or default value in case of error
    }
  };

  // 📌 fetch Single Product function
  const fetchSingleProduct = async (id, category) => {
    try {
      const response = await fetch(apiRoutes.ProductByIdURL(category, id));

      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} data`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching product data:", error);
      alert("❌ Error fetching product data");
      return null;
    }
  };

// 📌 Add Product Function
const addProduct = async (category, productData) => {
  try {
    const response = await fetch(apiRoutes.productsURL(category), {
      method: "POST",
      headers,
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      console.error("Failed to add product: "+{category}, response.statusText);
      throw new Error("Failed to add product");
    }
    alert("✅ Product added successfully");
    // const data = await response.json();
    return "ok";
  } catch (error) {
    // console.error("Error adding product:", error.message);
    alert("❌ Error adding product");
    return null;
  }
};

// 📌 Update Product Function
const updateProduct = async (category, id, productData) => {
  try {
    const response = await fetch(apiRoutes.ProductByIdURL(category, id), {
      method: "PUT",
      headers,
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");

    }
    alert("✅ Product updated successfully");
    // console.log("Product updated successfully:", data);

    const data = await response.json();
    return data;
  } catch (error) {
    alert("❌ Error updating product");
    // console.error("Error updating product:", error.message);
    return null;
  }
};

  // 📌 delete a Product function
  const deleteProduct = async (cateG, id) => {
    try {
      const response = await fetch(apiRoutes.ProductByIdURL(cateG, id), {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      alert("✅ Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ Error deleting product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        deleteProduct,
        fetchSingleProduct,
        addProduct,
        updateProduct,
        fetchProducts,
        isadmin: JSON.parse(localStorage.getItem("isAdmin")),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
