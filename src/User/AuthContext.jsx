import React, { createContext, useState, useEffect, useCallback } from "react";
import apiRoutes from '../utils/apiRoutes';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  // 🔹 States
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchId, setSearchId] = useState("");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  

  // 🔐 Dynamic headers with token
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  });

  // ✅ Fetch Orders
  const fetchOrders = useCallback(async (status) => {
    try {
      const response = await fetch(apiRoutes.getOrders(status), {
        method: "GET",
        headers: getHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } else {
        console.error("❌ Failed to fetch orders:", response.statusText);
      }
    } catch (error) {
      console.error("⚠️ Error fetching orders:", error);
    }
  }, []);

  // 🗑️ Delete Order
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(apiRoutes.deleteOrder(orderId), {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (response.ok) {
        alert("✅ Order deleted successfully!");
        fetchOrders(statusFilter);
      } else {
        alert("❌ Failed to delete order!");
      }
    } catch (error) {
      console.error("⚠️ Error deleting order:", error);
    }
  };

  // 🔄 Update Order Status
  const updateOrderStatus = async (orderId, newStatus,shipmentId) => {
    try {
      const response = await fetch(apiRoutes.updateOrderStatus(orderId), {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus, shipmentId: shipmentId }),
      });

      if (response.ok) {
        alert("✅ Order status updated successfully!");
        fetchOrders(statusFilter);
      } else {
        alert("❌ Failed to update order status!");
      }
    } catch (error) {
      console.error("⚠️ Error updating order status:", error);
    }
  };

  // 🔍 Filter Orders
  useEffect(() => {
    let result = [...orders];
    if (searchId) result = result.filter((order) => order._id.includes(searchId));
    if (statusFilter !== "All") result = result.filter((order) => order.orderStatus === statusFilter);

    setFilteredOrders(result);
  }, [searchId, statusFilter, orders]);

  // 👤 Fetch User Data
  const fetchUserData = useCallback(async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
      } else {
        console.error("❌ User fetch failed:", data);
        logout();
      }
    } catch (error) {
      console.error("⚠️ Error fetching user data", error);
      logout();
    }
  }, [BASE_URL]);

  // 🔄 Check Token on Refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      fetchUserData(storedToken);
    }
    else{
              localStorage.setItem("isAdmin", JSON.stringify(false));

    }
  }, [fetchUserData]);

  // 🔐 Login Function
  const login = async (email, password) => {
    try {
      const response = await fetch(apiRoutes.loginUser(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        setUser(data.user);
        fetchUserData(data.token);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("⚠️ Login Error:", error);
    }
  };

  // 🆕 Signup Function
  const signup = async (name, email, password) => {
    try {
      const response = await fetch(apiRoutes.registerUser(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Signup Successful! Please Login.");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("⚠️ Signup Error:", error);
    }
  };

  // 🚪 Logout Function
  const logout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("authToken");
    localStorage.setItem("isAdmin", JSON.stringify(false));
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        orders,
        filteredOrders,
        fetchOrders,
        handleDelete,
        statusFilter,
        setStatusFilter,
        searchId,
        setSearchId,
        updateOrderStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
