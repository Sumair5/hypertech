import React, { useState, useEffect } from "react";
import styles from "../stylecss/checkout_styles.module.css"; // Import CSS module
import { useNavigate, useLocation } from "react-router-dom";
import apiRoutes from '../utils/apiRoutes';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [placeOrderBtnDisable, setPlaceOrderBtnDisable] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize total price state

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    country: "Pakistan",
    address: "",
    city: "",
    region: "",
    totalPrice: location.state?.total,
    paymentMethod: "Cash on Delivery",
    additionalDetails: "",
  });

  useEffect(() => {
    setTotalPrice(location.state?.total); // Get total price from location state
    const storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(storedProducts);
  }, [location.state?.total]);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlaceOrderBtnDisable(true); // Disable the button when submitting
    if (products.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const checkoutData = {
      ...formData,
      orders: products.map((product) => ({
        productid: product.id,
        category: product.category,
        productname: product.title,
        productprice: product.price,
        productsubtotal: product.subTotal,
        productquantity: product.quantity,
      })),
    };
    try {
      const response = await fetch(apiRoutes.createOrder(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });
              const data = await response.json(); // Get response data

      if (response.ok) {
        localStorage.removeItem("cart");
        setProducts([]);
        const orderId = data?.order?._id;
        navigate("/order-success", { state: { orderId } }); // Pass order ID
      } else {
        console.error("Error1 placing order",data);
      }
    } catch (error) {
      console.error("Error2 placing order", error);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.checkoutHeading}>Checkout</h2>
      <form className={styles.formbox} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <h4>Country: {formData.country}</h4>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City Name & Postal code Example: Shah Faisal Colony – 75230"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={formData.region}
          onChange={handleChange}
          required
        />
        <h4>Total Amount: RS. {totalPrice}</h4>
        <h4>Payment Method: {formData.paymentMethod}</h4>

        <textarea
          name="additionalDetails"
          placeholder="Additional Details"
          value={formData.additionalDetails}
          onChange={handleChange}
        />
        <button
          disabled={placeOrderBtnDisable}
          type="submit"
          className={styles.checkoutBtn}
        >
          Place Order
        </button>
      </form>
      <div className={styles.orderSummary}>
        <h3>Your order</h3>
        {products.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className={styles.cartItems}>
            <ul>
              {products.map((product, index) => (
                <li key={index}>
                  <span>{product.title}</span> <span>RS. {product.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
