import { useNavigate, useSearchParams } from "react-router-dom";
import "./verify.css";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();  // Don't need to call setSearchParams
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Convert success to boolean for backend
  const isSuccess = success === "true";  

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success: isSuccess,
        orderId,
      });
      console.log("Verification response:", response.data);  // Debugging response

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/");  // Redirect to homepage on error
    }
  };

  useEffect(() => {
    console.log("Success:", success);  // Debugging query params
    console.log("Order ID:", orderId);
    verifyPayment();
  }, []);  // Empty dependency array to run on component mount

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
