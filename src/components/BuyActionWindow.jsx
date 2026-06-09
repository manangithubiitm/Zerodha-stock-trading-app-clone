import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ stock }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const buyPrice = stock?.watchlistPrice * (1 - 0.02 + 0.003 + 0.002);
  const [stockPrice, setStockPrice] = useState(Number(buyPrice?.toFixed(2)));
  const context = useContext(GeneralContext);
  
  const handleBuyClick = () => {
    axios.post("http://localhost:3002/newOrder", {
        name: stock.symbol,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
    },
    {
      withCredentials: true,
    })
    .then(() => {
      context.closeBuyWindow();
      window.location.reload();
      // window.location.href = "/holdings";
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleCancelClick = () => {
    context.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h4>{stock.symbol}</h4>
        <div className="charges">
          <p>Watchlist Price: ₹{stock.watchlistPrice.toFixed(2)}</p>
          <p>Brokerage: 0.3%</p>
          <p>Other Levies: 0.2%</p>
          <p>Buy Price: <strong>₹{stockPrice}</strong></p>
        </div>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input 
                type="number" 
                name="price" 
                id="price" 
                step="0.05" 
                onChange={(e) => setStockPrice(e.target.value)}
                value={stockPrice}
            />
          </fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>Margin required ₹
          {(stockPrice * stockQuantity).toFixed(2)}
        </span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>Buy</Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
