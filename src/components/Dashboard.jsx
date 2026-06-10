import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import axios from "axios";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";


const Dashboard = () => {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    useEffect(() => {
        axios.get("https://zerodha-stock-trading-app-backend.onrender.com/auth/check",
            {
                withCredentials: true,
            }
        )
        .then(() => {
            setIsCheckingAuth(false);
        })
        .catch(() => {
            window.location.href = "http://localhost:3000/login";
        });
    }, []);
    if (isCheckingAuth){
        return (
            <div>Checking authentication...</div>
        );
    }
    return (
        <div className="dashboard-container">
            <GeneralContextProvider>
                <WatchList />
            </GeneralContextProvider>
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Summary />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/holdings" element={<Holdings />} />
                    <Route path="/positions" element={<Positions />} />
                    <Route path="/funds" element={<Funds />} />
                    <Route path="/apps" element={<Apps />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;