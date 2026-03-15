import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbTrash } from "react-icons/tb";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  getCart,
  addToCart,
  getTikedItemDiscount,
  getTikedItemDiscountPercentage,
  getTikedItemImages,
  getTikedItemLabeledTotal,
  getTikedItemTotal,
  isTiked,
  removeFromCart,
  tikedAll,
} from "../../utils/cart";
import "./css/cartPage.css";

export default function CartPage() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const [tikItemImages, setTikItemImages] = useState([]);
  const [prices, setPrices] = useState(0);
  const [tikAll, setTikAll] = useState(false);
  const [tikItemLabeledTotal, setTikItemLabeledTotal] = useState(0);
  const [tikItemDiscount, setTikItemDiscount] = useState(0);
  const [tikItemPercentage, setTikItemPercentage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cartLoaded) {
      const c = getCart();
      setCart(c);
      setPrices(getTikedItemTotal());
      setTikItemLabeledTotal(getTikedItemLabeledTotal());
      setTikItemDiscount(getTikedItemDiscount());
      setTikItemPercentage(getTikedItemDiscountPercentage());
      setTikItemImages(getTikedItemImages());
      setCartLoaded(true);
      if (tikItemImages.length === c.length) setTikAll(true);
    }
  }, [cartLoaded]);

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <h1>Cart ({cart.length})</h1>
        <button
          onClick={() => {
            setTikAll(!tikAll);
            tikedAll(tikAll);
            setCartLoaded(false);
          }}
          className="select-all-btn"
        >
          Select All Items
        </button>
      </div>

      {/* Cart Items */}
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-select">
              <div
                className={`select-circle ${item.tikIndex.isTiked ? "selected" : ""}`}
                onClick={() => {
                  item.tikIndex.isTiked = !item.tikIndex.isTiked;
                  isTiked(item.tikIndex.index, item.tikIndex.isTiked);
                  setCartLoaded(false);
                }}
              >
                {item.tikIndex.isTiked && <span>✔</span>}
              </div>
              <img src={item.image} alt={item.name} className="item-img" />
            </div>
            <div className="item-info">
              <h2>{item.name}</h2>
              <p>LKR: {item.price.toFixed(2)}</p>
            </div>
            <div className="item-quantity">
              <button
                onClick={() => {
                  addToCart(item, -1);
                  setCartLoaded(false);
                }}
              >
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => {
                  addToCart(item, 1);
                  setCartLoaded(false);
                }}
              >
                <FaPlus />
              </button>
            </div>
            <div className="item-total">
              <p>LKR {(item.price * item.quantity).toFixed(2)}</p>
              <button
                className="remove-btn"
                onClick={() => {
                  removeFromCart(item.productId);
                  setCartLoaded(false);
                }}
              >
                <TbTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="cart-summary">
        <h2>Summary</h2>
        <div className="summary-images">
          {tikItemImages.map((img, i) => (
            <img key={i} src={img} alt={`item-${i}`} />
          ))}
        </div>
        <div className="summary-details">
          <p>
            Item Total: <span>LKR {tikItemLabeledTotal}</span>
          </p>
          <p className="discount">
            Discount: <span>{tikItemPercentage || 0}%</span> - LKR{" "}
            {tikItemDiscount || 0}
          </p>
          <p className="subtotal">
            Sub Total: <span>LKR {prices}</span>
          </p>
        </div>
        {prices > 0 && (
          <button
            className="checkout-btn"
            onClick={() =>
              navigate("/checkout", { state: { items: cart } })
            }
          >
            Checkout ({tikItemImages.length})
          </button>
        )}
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <span>Pay With</span>
        <div className="payment-logos">
          <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images/new/visa-3.svg" alt="VISA" />
          <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images/new/MasterCard-Logo.svg.png" alt="Mastercard" />
          <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images/new/images.jpeg" alt="JCB" />
          <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images/new/amex-card1708.jpg" alt="Amex" />
        </div>
        <div className="payment-note">
          Please proceed to make the above payment.
        </div>
      </div>
    </div>
  );
}