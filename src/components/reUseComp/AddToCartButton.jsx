// 📍 Component: AddToCartButton.jsx

import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const AddToCartButton = ({ data, setToastMsg, category }) => {
  // 📌 Quantity state internal kar di gayi
  const [quantity, setQuantity] = useState(1);

  // 📌 Add to cart handler
  const handleAddToCart = () => {
    if (!data) return;

    const item = {
      id: data._id,
      title: data.title,
      price: data.price,
      image: data.image_url,
      quantity,
      category,
      subTotal: data.price * quantity,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find((p) => p.id === item.id);

    if (found) {
      found.quantity += quantity;
      found.subTotal = found.quantity * found.price;
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setToastMsg("Item added to cart!");

    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent :"center",
        gap: "10px",
       
      }}
    >
      {/* 📍 Quantity Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid #ccc",
          padding: "5px 10px",
          borderRadius: "10px",
        }}
      >
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          style={{
            padding: "4px 10px",
            fontSize: "18px",
            border: "none",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          -
        </button>
        <span style={{ fontSize: "16px", minWidth: "20px", textAlign: "center" }}>
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          style={{
            padding: "4px 10px",
            fontSize: "18px",
            border: "none",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          +
        </button>
      </div>

      {/* 📍 Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        style={{
          backgroundColor: "#0b61ae",
          color: "#fff",
          padding: "10px 15px",
          fontSize: "16px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
