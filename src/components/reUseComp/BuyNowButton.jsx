import React, {  useState, useEffect } from "react";


const BuyNowButton = ({
  data,

  setToastMsg,
  setIsBuyNowDisabled,
  navigate,
  isDisabled,
  category,

}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
setQuantity(1)  
 
  }, [])
  
  const handleBuyNow = () => {
    if (!data) return;

    const item = {
      id: data._id,
      title: data.title,
      price: data.price,
      image: data.image_url,
      quantity: quantity,
      category: category, // ✅ category from props
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

    setIsBuyNowDisabled(true);
    setToastMsg("Redirecting to cart...");

    setTimeout(() => {
      setIsBuyNowDisabled(false);
      setToastMsg("");
      navigate("/cart");
    }, 2000);
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={isDisabled}
      style={{
        backgroundColor: "#CE2B2B",
        color: "#fff",
        padding: "10px 15px",
        fontSize: "16px",
        border: "none",
        borderRadius: "10px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        marginLeft: "10px",
      }}
    >
      Buy Now
    </button>
  );
};

export default BuyNowButton;
