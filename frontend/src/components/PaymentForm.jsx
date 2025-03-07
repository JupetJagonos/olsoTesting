// eslint-disable-next-line no-unused-vars
import React from "react";
import '../styles/Footer.css'; // Optional: Move footer styles if needed

const PaymentForm = () => {
  return (
    <div className="container">
      <div className="card cart">
        <label className="title">CHECKOUT</label>
        <div className="steps">
          <div className="step">
            <div>
              <span>SHIPPING</span>
              <p>221B Baker Street, W1U 8ED</p>
              <p>London, United Kingdom</p>
            </div>
            <hr />
            <div>
              <span>PAYMENT METHOD</span>
              <p>Visa</p>
              <p>**** **** **** 4243</p>
            </div>
            <hr />
            <div className="promo">
              <span>HAVE A PROMO CODE?</span>
              <form className="form">
                <input
                  className="input_field"
                  placeholder="Enter a Promo Code"
                  type="text"
                />
                <button type="submit">Apply</button>
              </form>
            </div>
            <hr />
            <div className="payments">
              <span>PAYMENT</span>
              <div className="details">
                <span>Subtotal:</span>
                <span>$240.00</span>
                <span>Shipping:</span>
                <span>$10.00</span>
                <span>Tax:</span>
                <span>$30.40</span>
              </div>
            </div>
          </div>
        </div>
      </div>


    <div className="carc checkout">
        <div className="footer">
            <label className="price">$50.00</label>
            <button className="checkout-btn"></button>

        </div>

    </div>

    </div>
  );
};

export default PaymentForm;        

