import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, setPromoCode, promoUsed, setPromoUsed } = useContext(StoreContext);
    const [promoInput, setPromoInput] = useState(""); // Local state for input
    const navigate = useNavigate();

    const handlePromoCodeSubmit = () => {
        if (promoInput === "michaelscott" && !promoUsed) {
            setPromoCode(promoInput); // Set promo code in context
            setPromoUsed(true); // Mark promo code as used
            alert("Promo code applied! You will receive a 10% discount.");
        } else if (promoUsed) {
            alert("This promo code has already been used.");
        } else {
            alert("Invalid promo code.");
        }
        setPromoInput(""); // Clear input after submission
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>Rs{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>Rs{item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className="cross">
                                        x
                                    </p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                })}
            </div>

            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div className="cart-bottom-details">
                        <p>Subtotal:</p>
                        <p>Rs {getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-bottom-details">
                        <p>Delivery:</p>
                        <p>Rs {getTotalCartAmount() === 0 ? 0 : 100}</p>
                    </div>
                    <hr />
                    <div className="cart-bottom-details">
                        <b>Total</b>
                        <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100}</b>
                    </div>
                    <button onClick={() => navigate('/order')}>Proceed to checkout</button>
                </div>

                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className="cart-promocode-input">
                            <input
                                type="text"
                                placeholder="promo code"
                                value={promoInput}
                                onChange={(e) => setPromoInput(e.target.value)} // Handle input change
                            />
                            <button onClick={handlePromoCodeSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
