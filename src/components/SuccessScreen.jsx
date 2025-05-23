import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../stylecss/success.module.css"; // ✅ Import CSS as a module

const SuccessScreen = () => {
  const location = useLocation();
  const orderId = location.state?.orderId; // ✅ Extract Order ID

  return (
    <div className={styles.successContainer}>
      <div className={styles.successCard}>
        <h2 className={styles.successTitle}>🎉 Order Placed Successfully! 🎉</h2>
        <p className={styles.successText}>Thank you for shopping with us. Your order has been confirmed.</p>
        
        {orderId ? (
          <p className={styles.orderId}>
            Your Order ID: <strong>{orderId}</strong> 📦
          </p>
        ) : (
          <p className={styles.orderId}>Order ID not available.</p>
        )}

        <Link to="/" className={styles.homeBtn}>🏠 Back to Home</Link>
      </div>
    </div>
  );
};

export default SuccessScreen;
