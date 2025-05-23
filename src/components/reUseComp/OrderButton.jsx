import React from 'react';
import { FaWhatsapp, } from "react-icons/fa";
// Order whatsapp button
const OrderButton = ({ title, productId }) => {
    const handleOrder = () => {
        const phoneNumber = '+923416039467'; // Replace with the desired phone number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=Order%20Details:%0A- Title: ${encodeURIComponent(title)}%0A- Product ID: ${encodeURIComponent(productId)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
    <button
  style={{
    backgroundColor: "#25D366", // WhatsApp green
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  }}
  onClick={handleOrder}
>
  <FaWhatsapp /> Order via WhatsApp
</button>


    );
};

export default OrderButton;