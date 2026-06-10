// MongoDB database is connected with backend on express
require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StocksModel } = require("./model/StocksModel");
const {HoldingsModel} = require('./model/HoldingsModel');
const {PositionsModel} = require('./model/PositionsModel');
const {OrdersModel} = require("./model/OrdersModel");
const {UserModel} = require("./model/UserModel");
const authMiddleware = require("./Middleware/authMiddleware");
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",

        "https://frontend.d2zwelb89uhnl.amplifyapp.com",
        "https://dashboard-development.d2b3b6bi15f1oq.amplifyapp.com"
    ],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());


app.post("/register", async(req, res) => {
    try {
        console.log("Register API Hit");
        const {username, email, password} = req.body;
        console.log("Incoming data:", {
            username,
            email
        });
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const normalizedEmail = email.toLowerCase();
        const existingUser = await UserModel.findOne({ 
            $or: [
                { email: normalizedEmail },
                { username }
            ]
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email or Username already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await UserModel.create({
            username, 
            email: normalizedEmail, 
            password: hashedPassword,
        });
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            success: true,
            message: "User signed up successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// Login Route
app.post('/login', async(req, res) => {
    try {
        console.log("Login API Hit");
        const { email, password } = req.body;
        console.log("Login Attempt:", email);
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }
        const normalizedEmail = email.toLowerCase();

        // Find user
        const user = await UserModel.findOne({
            email: normalizedEmail,
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }
        console.log("User found:", user.email);
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }
        // Generate JWT
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );
        console.log("JWT Generated Successfully");
        //Store JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});
app.get('/allHoldings', authMiddleware, async(req, res) => {
    try{
        const allHoldings = await HoldingsModel.find({
            userId: req.user.userId,
        });
        res.status(200).json(allHoldings);

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
app.get('/orders', authMiddleware, async(req, res) => {
    try {
        const orders = await OrdersModel.find({
            userId: req.user.userId,
        });
        res.status(200).json(orders);
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
app.get('/portfolio', authMiddleware, async(req, res) => {
    try {
        const holdings = await HoldingsModel.find({
            userId: req.user.userId,
        });
        const grouped = {};
        holdings.forEach((holding) => {
            const investment = holding.qty * holding.avg;

            if (!grouped[holding.name]) {
                grouped[holding.name] = {
                    name: holding.name,
                    qty: 0,
                    totalInvestment: 0,
                };
            }
            grouped[holding.name].qty += holding.qty;
            grouped[holding.name].totalInvestment += investment;
        });

        const portfolio = Object.values(grouped).map((stock) => {
            const avgCost = stock.totalInvestment / stock.qty;
            const ltpChangePercent = (Math.random() * 10) - 5;
            const ltp = Math.round(avgCost * (1 + ltpChangePercent / 100));
            const adjustedLtpPercent = (Math.random() * 1) - 0.25;
            const adjustedLtp = ltp * (1 + adjustedLtpPercent / 100);
            const currentValue = Math.round((adjustedLtp * stock.qty));
            const pnl = currentValue - stock.totalInvestment;
            return {
                name: stock.name,
                qty: stock.qty,
                avgCost: Number(avgCost.toFixed(2)),
                totalInvestment: Math.round(stock.totalInvestment),
                ltp,
                adjustedLtp: Number(adjustedLtp.toFixed(2)),
                currentValue,
                pnl,
            };
        });
        res.status(200).json(portfolio);
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
app.get('/watchlist', authMiddleware, async(req, res) => {
    try {
        const stocks = await StocksModel.find({});
        const watchlist = stocks.map((stock) => {
            // LTP = Base Price +/- 5%
            const ltpChangePercent = (Math.random() * 10) - 5;
            const ltp = stock.basePrice * (1 + ltpChangePercent / 100);
            // AdjustedLtp = LTP +/- 0.25%
            const adjustedLtpPercent = (Math.random() * 0.5) - 0.25;
            const adjustedLtp = ltp * (1 + adjustedLtpPercent / 100);
            // Watchlist price = Adjusted LTP +/- 5%
            const watchlistPricePercent = (Math.random() * 10) - 5;
            const watchlistPrice = adjustedLtp * ( 1 + watchlistPricePercent / 100);

            //Display percent change against the Base Price
            const percentChange = ((watchlistPrice - stock.basePrice) / stock.basePrice) * 100;
            
            return {
                symbol: stock.symbol,
                companyName: stock.companyName,
                basePrice: Number(stock.basePrice.toFixed(2)),
                ltp: Number(ltp.toFixed(2)),
                adjustedLtp: Number(adjustedLtp.toFixed(2)),
                watchlistPrice: Number(watchlistPrice.toFixed(2)),
                percent: `${percentChange.toFixed(2)}%`,
                isDown: percentChange < 0,
            };
        });
        res.status(200).json(watchlist);
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})
app.get('/allPositions', authMiddleware, async(req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});
app.get("/auth/check", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

app.post('/newOrder', authMiddleware, async(req, res) => {
    try {
        const {name, qty, price, mode} = req.body;
        const newOrder = new OrdersModel({
            userId: req.user.userId,
            name,
            qty,
            price,
            mode,
        });
        await newOrder.save();

        if (mode === "BUY") {
            await HoldingsModel.create({
                userId: req.user.userId,
                name,
                qty: Number(qty),
                avg: Number(price),
            });
        }
        res.status(200).json({
            success: true,
            message: "Order placed successfully",
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

app.post('/sellOrder', authMiddleware, async(req,res) => {
    try {
        const { name, qty, price, mode } = req.body;

        const userHoldings = await HoldingsModel.find({
            userId: req.user.userId,
            name,
        });

        const totalQty = userHoldings.reduce((sum, holding) => sum + holding.qty, 0);

        if (Number(qty) > totalQty) {
            return res.status(400).json({
                success: false,
                message: "Insufficient shares",
            });
        }

        const sellOrder = new OrdersModel({
            userId: req.user.userId,
            name,
            qty,
            price,
            mode: "SELL",
        });

        await sellOrder.save();
        let qtyToSell = Number(qty);

        const holdings = await HoldingsModel
        .find({
            userId: req.user.userId,
            name,
        })
        .sort({ _id: 1 });

        for (const holding of holdings) {
            if (qtyToSell <= 0) break;

            if (holding.qty <= qtyToSell) {
                qtyToSell -= holding.qty;
                await HoldingsModel.findByIdAndDelete(
                    holding._id
                );
            } else {
                holding.qty -= qtyToSell;
                await holding.save();
                qtyToSell = 0;
            }
        }
        res.status(200).json({
            success: true,
            message: "Stock sold successfully",
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
app.get('/holding/:symbol', authMiddleware, async(req, res) => {
    try {
        const holding = await HoldingsModel.findOne({
            userId: req.user.userId,
            name: req.params.symbol,
        });

        if (!holding) {
            return res.status(404).json({
                success: false,
                message: "You don't own this stock",
            });
        }
        res.status(200).json(holding);
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log("App started");
    mongoose.connect(uri);
    console.log("DB connected");
});