import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://zerodha-stock-trading-app-backend.onrender.com/orders", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order Type</th>
              <th>Instrument</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const orderClass =
                order.mode === "BUY" ? "buy-order" : "sell-order";

              return (
                <tr key={order._id}>
                  <td className={orderClass}>{order.mode}</td>

                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{order.price.toFixed(2)}</td>
                  <td>₹{(order.qty * order.price).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="order-summary">
        <div className="summary-card">
          <h4>{orders.length}</h4>
          <p>Total Orders</p>
        </div>

        <div className="summary-card buy-summary">
          <h4>{orders.filter((o) => o.mode === "BUY").length}</h4>
          <p>Buy Orders</p>
        </div>
        <div className="summary-card sell-summary">
          <h4>{orders.filter((o) => o.mode === "SELL").length}</h4>
          <p>Sell Orders</p>
        </div>
      </div>
    </>
  );
};

export default Orders;
