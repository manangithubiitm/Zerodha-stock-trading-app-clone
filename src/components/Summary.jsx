import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Summary = () => {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get("http://localhost:3002/portfolio", {
        withCredentials: true,
      });
      setPortfolio(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{totalCurrentValue.toFixed(2)}</h3>
            <p>Portfolio Value</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Holdings <span>{portfolio.length}</span>
            </p>
            <p>
              Investment <span>₹{totalInvestment.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
      <div className="section">
        <span>
          <p>Holdings ({portfolio.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPnL >= 0 ? "profit" : "loss"}>
              ₹{totalPnL.toFixed(2)}
              <small> {pnlPercentage.toFixed(2)}%</small>
            </h3>

            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value
              <span>₹{totalCurrentValue.toFixed(2)}</span>
            </p>
            <p>
              Investment
              <span>
                ₹{totalInvestment.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
