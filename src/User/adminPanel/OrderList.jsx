import React, { useEffect, useContext } from "react";
import { FaTrash, FaPrint } from "react-icons/fa";
import styles from '../../stylecss/OrderList.module.css'; // Importing CSS module
import AuthContext from "../../User/AuthContext"; // Correct import for the context

const OrderList = () => {
  const {
    orders,
    filteredOrders,
    fetchOrders,
    handleDelete,
    statusFilter,
    setStatusFilter,
    searchId,
    setSearchId,
    updateOrderStatus, // Assuming you have this function in context
  } = useContext(AuthContext);

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders(statusFilter);
  }, [fetchOrders, statusFilter]);

  // Handle search by order ID
  const handleSearch = (e) => {
    setSearchId(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle print order details
  const handlePrint = (orderId) => {
    const order = orders.find(order => order._id === orderId);
    if (order) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head><title>Order Details</title></head><body>');
      printWindow.document.write('<h2>Order Details</h2>');
      printWindow.document.write(`<p><strong>User:</strong> ${order.fullName}</p>`);
      printWindow.document.write(`<p><strong>Email:</strong> ${order.email}</p>`);
      printWindow.document.write(`<p><strong>Phone:</strong> ${order.phone}</p>`);
      printWindow.document.write(`<p><strong>Address:</strong> ${order.address}, ${order.city}, ${order.region}</p>`);
      printWindow.document.write(`<p><strong>Payment Method:</strong> ${order.paymentMethod}</p>`);
      printWindow.document.write(`<p><strong>Total Price: RS : </strong>${order.totalPrice}</p>`);
      printWindow.document.write('<h3>Products in Order:</h3>');
      printWindow.document.write('<ul>');
      order.orders.forEach(product => {
        printWindow.document.write(`<li><strong>${product.productname}</strong> (₨${product.productprice} x ${product.productquantity})</li>`);
      });
      printWindow.document.write('</ul>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Handle status update for a specific order
  const handleStatusUpdate = (orderId, newStatus, oldStatus) => {
    if (newStatus === "In-Transit" && oldStatus!=="Delivered") {
      const shipmentId = prompt("Please enter the Shipment ID:");
      if (shipmentId) {
        // Assuming `updateOrderStatus` is a function that updates the order status and shipment ID.
        console.log("Updating order status to In-Transit with Shipment ID:", shipmentId);
        updateOrderStatus(orderId, newStatus, shipmentId);
      } else {
        alert("Shipment ID is required when status is In-Transit.");
      }
    } else if (newStatus === "Delivered") {
      // If the status is not "In-Transit", simply update the order status
      if (oldStatus === "In-Transit")
        updateOrderStatus(orderId, newStatus);
      else
        alert("Invalid command")
    }
      else
        alert("Invalid command")
  };

  return (
    <div className={styles.orderListContainer}>
      <div className={styles.filterContainer}>
        <input
          type="text"
          value={searchId}
          onChange={handleSearch}
          placeholder="Search Order by ID"
        />
        <p>{statusFilter} Orders: {filteredOrders.length}</p>
        <select onChange={handleStatusFilter} value={statusFilter}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In-Transit">In-Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className={styles.ordersContainer}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <h3 className={styles.orderId}>Order ID: {order._id}</h3>
              <p><strong>User:</strong> {order.fullName}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              {order?.shipmentId && <p><strong>Shipment ID:</strong> {order.shipmentId}</p>}
              <p><strong>paymentMethod:</strong> {order.paymentMethod}</p>
              <p><strong>Total Amount RS:</strong> {order.totalPrice}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>

              {/* Dropdown for status update */}
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusUpdate(order._id, e.target.value, order.orderStatus)}
              >
                <option value="Pending">Pending</option>
                <option value="In-Transit">In-Transit</option>
                <option value="Delivered">Delivered</option>
              </select>

              <div className={styles.orderDetails}>
                <h4>Products in Order:</h4>
                {order.orders.map((product, index) => (
                  <div key={index} className={styles.productDetails}>
                    <p><strong>Product ID:</strong> {product.productid}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>{product.productname}</strong></p>
                    <p>Quantity: {product.productquantity}</p>
                    <p>Price: ₨{product.productprice}</p>
                    <p>Subtotal: ₨{product.productsubtotal}</p>
                  </div>
                ))}
              </div>

              <div className={styles.orderActions}>
                <button onClick={() => handleDelete(order._id)}><FaTrash /> Delete</button>
                <button onClick={() => handlePrint(order._id)}><FaPrint /> Print Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
