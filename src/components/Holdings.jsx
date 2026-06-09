import React, { useState, useEffect } from "react";
// import { holdings } from '../data/data';

import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  const fetchHoldings = async () => {
    try {
      const [holdingRes, portfolioRes] = await Promise.all([
        axios.get("http://localhost:3002/allHoldings", {
          withCredentials: true,
        }),
        axios.get("http://localhost:3002/portfolio", {
          withCredentials: true,
        }),
      ]);
      
      setHoldings(holdingRes.data);
      setPortfolio(portfolioRes.data);
    } catch(err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchHoldings();
  }, []);

  const labels = portfolio.map((subArray) => subArray["name"]);
  const totalInvestment = portfolio.reduce(
    (sum, stock) => sum + stock.totalInvestment,
    0,
  );
  const totalCurrentValue = portfolio.reduce(
    (sum, stock) => sum + stock.currentValue,
    0,
  );
  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercentage =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: portfolio.map((stock) => stock.ltp),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Buy Price</th>
              <th>Investment</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((stock, index) => {
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{(stock.qty * stock.avg).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h3 className="title portfolio-title">Portfolio Summary</h3>
      <div className="order-table portfolio-table">
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Total Quantity</th>
              <th>Avg Cost</th>
              <th>LTP</th>
              <th>Current Value</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((stock) => {
              const profClass = stock.pnl >= 0 ? "profit" : "loss";
              return (
                <tr key={stock.name}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avgCost}</td>
                  <td>₹{stock.ltp}</td>
                  <td>₹{stock.currentValue}</td>
                  <td className={profClass}>₹{stock.pnl.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col">
          <h5>₹{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>₹{totalCurrentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            ₹{totalPnL.toFixed(2)} ({pnlPercentage.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
