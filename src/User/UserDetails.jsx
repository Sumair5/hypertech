// === UserDetails Component ===
import React, { useState, useContext } from "react";
import styles from "../stylecss/UserDetails.module.css"; // Importing CSS module
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const UserDetails = () => {
  const navigate = useNavigate();
  const { user, login, signup, logout } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // 🔄 Input Fields Handle کرنے کے لیے
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📝 Form Submit Handle کرنا
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(formData.email, formData.password);
         // 2 second wait before reload
    setTimeout(() => {
      window.location.reload();
    }, 1000); // 2000 milliseconds = 2 seconds


    } else {
      await signup(formData.name, formData.email, formData.password);
      setIsLogin(true); // Signup کے بعد Login Form کھولیں
    }
  };


  return (
    <div>
      <div className={styles.userContainer}> {/* Using styles from CSS module */}
        {user ? (
          <div className={styles.userInfo}>
            <h2>👋 Welcome, {user.name}!</h2>
            <p>📧 Email: {user.email}</p>
            <p>🎭 Role: {user.isAdmin ? "Admin" : "User"}</p>
            <button className={styles.logoutBtn} onClick={logout}>🚪 Logout</button>
          </div>
        ) : (
          <div className={styles.authForm}>
            <h2>{isLogin ? "🔐 Login" : "🆕 Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="👤 Name"
                  onChange={handleChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="📧 Email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="🔑 Password"
                onChange={handleChange}
                required
              />
              <button type="submit">{isLogin ? "➡️ Login" : "✅ Sign Up"}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "🆕 Don't have an account? Sign Up"
                : "🔐 Already have an account? Login"}
            </p>
          </div>
        )}
      </div>

      {user && user.isAdmin && (
        <div className={styles.actionsBtns}>
          <h2>👋 Welcome, {user.name} Perform some actions!</h2>
          <button onClick={() => navigate("/viewproductlist", { state: { category: "mobiles" } })}>
            Mobile Phones Pannel
          </button>
          <button onClick={() => navigate("/viewproductlist", { state: { category: "laptops" } })}>
            Laptop Panel
          </button>
          <button onClick={() => navigate("/viewproductlist", { state: { category: "chromebooks" } })}>
            Chromebook Panel
          </button>
          <button onClick={() => navigate("/viewproductlist", { state: { category: "smartwatches" } })}>
            Smartwatch Panel
          </button>
          <button onClick={() => navigate("/viewproductlist", { state: { category: "accessories" } })}>
            Accessory Panel
          </button>

          <button onClick={() => navigate("/order-list")}>Orders Panel</button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
