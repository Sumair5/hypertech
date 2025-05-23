// === CartScreen Component ===
// Display cart items in grid layout with responsive design
import React, { useState, useEffect } from "react";
import styles from "../stylecss/CartScreen.module.css"; // Importing CSS module
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const navigate = useNavigate();

  // === States for cart, subtotal, total ===
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [subtotal, setSubtotal] = useState(0);
  const [shipping] = useState(499); // Fixed shipping
  const [total, setTotal] = useState(0);

  // === Recalculate total whenever cart changes ===
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const subtotalValue = cart.reduce((acc, item) => acc + item.subTotal, 0);
    setSubtotal(subtotalValue);
    setTotal(subtotalValue + shipping);
  }, [cart, shipping]);

  // === Update item quantity ===
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity, subTotal: item.price * quantity }
          : item
      )
    );
  };

  // === Remove item from cart ===
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // === Optional: Navigate to product detail (future enhancement) ===
  const handleProductClick = (product) => {
    console.log(product);
    // navigate(`/product/${product.id}`);
  };

  return (
    <div className={styles.cartContainer}> {/* Using styles from CSS module */}
      <h2>Shopping Cart</h2>

      <div className={styles.cartItems}>
        {cart.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.productImage} // Applying class from CSS module
            />

            <div
              className={styles.productDetails}
              onClick={() => handleProductClick(item)}
            >
              <h3>{item.title}</h3>
              <p>Price: Rs. {item.price}</p>
              <div className={styles.quantityControl}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <p>Subtotal: Rs. {item.subTotal}</p>
            </div>

            <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
              X
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className={styles.productPriceTotal}>
          <h3>Subtotal: Rs. {subtotal}</h3>
          <h4>Shipping: Rs. {shipping}</h4>
          <h2>Total: Rs. {total}</h2>
          <button
            className={styles.checkoutBtn}
            onClick={() => navigate("/checkout", { state: { total } })}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
