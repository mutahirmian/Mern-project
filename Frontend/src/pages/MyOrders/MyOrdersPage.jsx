import { useContext, useEffect, useState } from "react";
import "./myOrders.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Function to fetch user orders
  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        setData(response.data.data);
      } else {
        Swal.fire('Error!', 'Could not fetch orders.', 'error');
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire('Error!', 'Could not fetch orders.', 'error');
    }
  };

  // Function to confirm order delivery
  const confirmDelivery = async (orderId) => {
    const result = await Swal.fire({
      title: 'Order Delivered',
      text: 'Are you sure you want to mark this order as delivered?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      // Update order status to "Food delivered"
      try {
        const response = await axios.post(url + "/api/order/status", {
          orderId,
          status: "Food delivered"
        }, { headers: { token } });

        if (response.data.success) {
          // Fetch updated orders
          fetchOrders(); // Re-fetch the orders after updating
        } else {
          Swal.fire('Error!', 'Could not update order status.', 'error');
        }
      } catch (error) {
        console.error("Error updating order status:", error);
        Swal.fire('Error!', 'Could not update order status.', 'error');
      }
    }
  };

  // Function to remove order
  const removeOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Remove Order',
      text: 'Are you sure you want to remove this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(url + `/api/order/${orderId}`, { headers: { token } });
        if (response.data.success) {
          fetchOrders(); // Re-fetch the orders after removing
        } else {
          Swal.fire('Error!', 'Could not delete the order.', 'error');
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        Swal.fire('Error!', 'Could not delete the order.', 'error');
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders(); // Fetch orders when the component mounts or token changes
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className={`my-orders-order ${order.status.replace(/\s/g, '-').toLowerCase()}`}>
            <img src={assets.parcel_icon} alt="" />
            <p>{order.items.map((item, index) => (
              <span key={index}>
                {item.name} x {item.quantity}
                {index === order.items.length - 1 ? "" : " , "}
              </span>
            ))}</p>
            <p>Rs {order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span><b>{order.status}</b></p>
            {/* Show a single button that changes based on the order status */}
            {order.status === "Food delivered" ? (
              <button onClick={() => removeOrder(order._id)}>
                <b>REMOVE</b>
              </button>
            ) : (
              <button onClick={() => confirmDelivery(order._id)}>
                <b>MARK AS DELIVERED</b>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
