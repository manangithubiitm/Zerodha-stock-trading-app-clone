import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [username, setUsername] = useState("USERID");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("https://zerodha-stock-trading-app-backend.onrender.com/auth/check", {
                    withCredentials: true,
                });
                setUsername(response.data.user.username);
            } catch(err) {
                console.log(err);
            }
        };
        fetchUser();
    }, []);
    const initials = username.split(" ").map(word => word[0]).join("").toUpperCase();
    const avatarText = initials.length >= 2 ? initials.slice(0,2) : username.slice(0,2).toUpperCase();

    const handleMenuClick = (index) => {
        setSelectedMenu(index);
    };

    
    const handleLogout = async () => {
        try {
            await axios.post("https://zerodha-stock-trading-app-backend.onrender.com/logout", {}, {
                withCredentials: true,
            });
            window.location.href = "https://frontend.d2zwelb89uhnl.amplifyapp.com/login";
        } catch (err) {
            console.log(err);
        }
    };
    const menuClass = "menu";
    const activeMenuClass = "menu selected";
    return (
        <div className="menu-container">
            <img src="logo.png" style={{width: "50px"}}/>
            <div className="menus">
                <ul>
                    <li>
                        <Link style={{textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
                            <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
                            <p className={selectedMenu === 1 ? activeMenuClass:menuClass}>Orders</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
                            <p className={selectedMenu === 2 ? activeMenuClass:menuClass}>Holdings</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
                            <p className={selectedMenu === 3 ? activeMenuClass:menuClass}>Positions</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
                            <p className={selectedMenu === 4 ? activeMenuClass:menuClass}>Funds</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
                            <p className={selectedMenu === 6 ? activeMenuClass:menuClass}>Apps</p>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="profile">
                    <div className="avatar">{avatarText}</div>
                    <p className="username">{username}</p>
                    <button className='logout-btn' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Menu;