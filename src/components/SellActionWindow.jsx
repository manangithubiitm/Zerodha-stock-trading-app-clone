import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ stock }) => {
  const [stockQuantity, setStockQuantity] = useState(1);

  // Sell price formula
  const sellPrice = stock?.avg * (1 + 0.05 - 0.003 - 0.002);

  const [stockPrice, setStockPrice] = useState(Number(sellPrice?.toFixed(2)));
  const context = useContext(GeneralContext);
  const handleSellClick = () => {
    axios
      .post(
        "http://localhost:3002/sellOrder",
        {
          name: stock.name,
          qty: stockQuantity,
          price: stockPrice,
          mode: "SELL",
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        context.closeSellWindow();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancelClick = () => {
    context.closeSellWindow();
  };
  return (
    <div className="container" id="sell-window">
      <div className="regular-order">
        <h4>{stock.name}</h4>
        <div className="charges">
          <p>Buy Price: ₹{stock.avg.toFixed(2)}</p>
          <p>Available Quantity: {stock.qty}</p>
          <p>Brokerage 0.3%</p>
          <p>Other Levies 0.2%</p>
          <p>
            Sell Price:
            <strong> ₹{stockPrice} </strong>
          </p>
        </div>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              max={stock.qty}
              value={stockQuantity}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= stock.qty) {
                    setStockQuantity(value);
                }
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>
            Amount Received ₹
            {(stockQuantity * stockPrice).toFixed(2)}
        </span>
        <div>
            <Link className="btn btn-red" onClick={handleSellClick}>
                Sell
            </Link>
            <Link className="btn btn-grey" onClick={handleCancelClick}>
                Cancel
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;