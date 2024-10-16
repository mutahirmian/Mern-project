import { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      console.log("API Response:", response); // Log the full response
      if (response.data.success) {
        console.log("Fetched Orders:", response.data.data); // Log the fetched orders
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error("Error fetching orders");
    }
  };

  // Function to handle status change
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    console.log("Order ID:", orderId); // Log the order ID
    console.log("New Status:", newStatus); // Log the new status

    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });

      console.log(response); // Log the entire response to check what's returned

      if (response.data.success) {
        fetchAllOrders(); // Fetch orders again to reflect the updated status
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders(); // Fetch all orders on component mount
  }, [url]); // Include url in dependency array

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? ( // Check if there are orders to display
          orders.map((order, index) => (
            <div
              key={index}
              className={`order-item ${
                order.status === "Food delivered"
                  ? "delivered"
                  : order.status === "Out for delivery"
                  ? "out-for-delivery"
                  : "food-processing"
              }`}
            >
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country},{" "}
                    {order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
                <p className="order-item-date">
                Order Date: {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs {order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Food processing">Food processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Food delivered">Food delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders available.</p> // Message when no orders are found
        )}
      </div>
    </div>
  );
};

export default Orders;
