import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  getTikedItemDiscount,
  getTikedItemDiscountPercentage,
  getTikedItemLabeledTotal,
  getTikedItemTotal,
} from "../../utils/cart";
import "./css/checkout.css";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state.items);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isCorrectName, setIsCorrectName] = useState("empty");
  const [isCorrectPhone, setIsCorrectPhone] = useState("empty");
  const [isCorrectAddress, setIsCorrectAddress] = useState("empty");

  function placeOrder() {
	
    const orderData = {
      name,
      address,
      phoneNumber: phone,
      billItems: cart
        .filter((item) => item.tikIndex.isTiked)
        .map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
    };

    const token = localStorage.getItem("token");
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/order`, orderData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("Order placed successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error placing order");
      });
  }
console.log(cart);
  return (
    <div className="checkout-container">
      {/* Order Summary */}
      <div className="checkout-summary">
        <h1>Order Summary</h1>
        <div className="summary-row">
          <span>Item Total</span>
          <span>LKR: {getTikedItemLabeledTotal()}</span>
        </div>
        <div className="summary-row discount">
          <span>Discount</span>
          <span>
            LKR: {getTikedItemDiscount()} ({getTikedItemDiscountPercentage()}%)
          </span>
        </div>
        <div className="summary-row total">
          <span>Net Total</span>
          <span>LKR: {getTikedItemTotal()}</span>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="checkout-form">
        <div className="form-group">
          <input
            type="text"
            value={name}
            placeholder="Full Name"
            className="input-field"
            onChange={(e) => {
              setName(e.target.value);
              setIsCorrectName(e.target.value ? "true" : "empty");
            }}
          />
          <label>Full Name</label>
        </div>

        <div className="form-group">
          <input
            type="tel"
            maxLength={10}
            value={phone}
            placeholder="Phone"
            className={`input-field ${
              isCorrectPhone === "true"
                ? "valid"
                : isCorrectPhone === "false"
                ? "invalid"
                : ""
            }`}
            onChange={(e) => {
              const val = e.target.value;
              setPhone(val);
              if (val.length === 10) setIsCorrectPhone("true");
              else if (val.length < 10 || val.length > 10) setIsCorrectPhone("false");
              else setIsCorrectPhone("empty");
            }}
          />
          <label>Phone</label>
          {isCorrectPhone === "false" && (
            <span className="error-msg">Please enter a valid phone number</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={address}
            placeholder="Address"
            className="input-field"
            onChange={(e) => {
              setAddress(e.target.value);
              setIsCorrectAddress(e.target.value ? "true" : "empty");
            }}
          />
          <label>Address</label>
        </div>

        <button
          className={`place-order-btn ${
            isCorrectName !== "true" ||
            isCorrectPhone !== "true" ||
            isCorrectAddress !== "true"
              ? "disabled"
              : ""
          }`}
          onClick={placeOrder}
          disabled={
            isCorrectName !== "true" ||
            isCorrectPhone !== "true" ||
            isCorrectAddress !== "true"
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
}