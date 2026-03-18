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
  const [cart, setCart] = useState(location.state.items || []);
  const from = location.state.from;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isCorrectName, setIsCorrectName] = useState("empty");
  const [isCorrectPhone, setIsCorrectPhone] = useState("empty");
  const [isCorrectAddress, setIsCorrectAddress] = useState("empty");

  const placeOrder = () => {
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
  };
  console.log(location.state);
  return (
    <div className="checkout-wrapper">
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Item Total</span>
          <span>LKR: {from === "productOverview" ? cart[0].labeledPrice.toFixed(2) : getTikedItemLabeledTotal()}</span>
        </div>
        <div className="summary-row discount">
          <span>Discount</span>
          <span>
            LKR: {from === "productOverview" ? cart[0].discount.toFixed(2) : getTikedItemDiscount()} ({ from === "productOverview" ? cart[0].discountPercentage.toFixed(2) : getTikedItemDiscountPercentage()}%)
          </span>
        </div>
        <div className="summary-row total">
          <span>Net Total</span>
          <span>LKR: { from === "productOverview" ? cart[0].price * cart[0].quantity : getTikedItemTotal()}</span>
        </div>
        <div>
          {cart.filter((item) => item.tikIndex.isTiked).length === 0 && (
            <p className="empty-cart-msg">No items selected for checkout</p>
          )}
          <div className={`checkout-items ${cart.filter((item) => item.tikIndex.isTiked).length > 0 ? "" : "hidden"}`}>
            {cart
              .filter((item) => item.tikIndex.isTiked)
              .map((item) => (
                <div className="checkout-item" key={item.productId}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <span>{item.name}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price LKR: {item.price}</span>
                    <span>Total LKR: {item.price * item.quantity}</span>
                  </div>

                </div>
              ))}

          </div>

        </div>
      </div>

      <div className="checkout-form">
        <h2>Delivery Details</h2>

        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsCorrectName(e.target.value ? "true" : "empty");
            }}
            required
          />
          <label className={name ? "filled" : ""}>Full Name</label>
        </div>

        <div className="form-group">
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => {
              const val = e.target.value;
              setPhone(val);
              if (val.length === 10) setIsCorrectPhone("true");
              else if (val.length < 10 || val.length > 10) setIsCorrectPhone("false");
              else setIsCorrectPhone("empty");
            }}
            className={isCorrectPhone === "false" ? "invalid" : ""}
            required
          />
          <label className={phone ? "filled" : ""}>Phone Number</label>
          {isCorrectPhone === "false" && (
            <span className="error-msg">Enter a valid 10-digit phone number</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setIsCorrectAddress(e.target.value ? "true" : "empty");
            }}
            required
          />
          <label className={address ? "filled" : ""}>Address</label>
        </div>

        <button
          className={`place-order-btn ${isCorrectName !== "true" ||
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