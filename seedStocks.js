require("dotenv").config();

const mongoose = require("mongoose");
const { StocksModel } = require("./model/StocksModel");
const uri = process.env.MONGO_URL;

const stocks = [
    {
        symbol: "INFY",
        companyName: "Infosys",
        basePrice: 1555.45,
    },
    {
        symbol: "ONGC",
        companyName: "ONGC",
        basePrice: 116.80,
    },
    {
        symbol: "TCS",
        companyName: "TCS",
        basePrice: 3194.80,
    },
    {
        symbol: "KPITTECH",
        companyName: "KPIT Technologies",
        basePrice: 266.45,
    },
    {
        symbol: "QUICKHEAL",
        companyName: "Quick Heal",
        basePrice: 308.55,
    },
    {
        symbol: "WIPRO",
        companyName: "Wipro",
        basePrice: 577.75,
    },
    {
        symbol: "M&M",
        companyName: "Mahindra & Mahindra",
        basePrice: 779.80,
    },
    {
        symbol: "RELIANCE",
        companyName: "Reliance Industries",
        basePrice: 2112.40,
    },
    {
        symbol: "HUL",
        companyName: "Hindustan Unilever",
        basePrice: 512.40,
    },
    {
        symbol: "ITC",
        companyName: "ITC",
        basePrice: 207.90,
    },
    {
        symbol: "SBIN",
        companyName: "State Bank of India",
        basePrice: 430.20,
    },
    {
        symbol: "HDFCBANK",
        companyName: "HDFC Bank",
        basePrice: 1522.35,
    },
    {
        symbol: "BHARTIARTL",
        companyName: "Bharti Airtel",
        basePrice: 541.15,
    },
    {
        symbol: "TATAPOWER",
        companyName: "Tata Power",
        basePrice: 124.15,
    },
    {
        symbol: "SGBMAY29",
        companyName: "SGB May 2029",
        basePrice: 4719.00,
    },
    {
        symbol: "HINDUNILVR",
        companyName: "Hindustan Unilever",
        basePrice: 2417.40,
    },
    {
        symbol: "ADANIENT",
        companyName: "Adani Enterprises",
        basePrice: 2750.00,
    },
    {
        symbol: "ADANIPORTS",
        companyName: "Adani Ports",
        basePrice: 1450.00,
    },
    {
        symbol: "AXISBANK",
        companyName: "Axis Bank",
        basePrice: 1180.00,
    },
    {
        symbol: "ICICIBANK",
        companyName: "ICICI Bank",
        basePrice: 1250.00,
    },
    {
        symbol: "L&T",
        companyName: "Larsen & Toubro",
        basePrice: 3650.00,
    },
    {
        symbol: "MARUTI",
        companyName: "Maruti Suzuki",
        basePrice: 11800.00,
    },
    {
        symbol: "NESTLEIND",
        companyName: "Nestle India",
        basePrice: 2480.00,
    },
    {
        symbol: "SUNPHARMA",
        companyName: "Sun Pharma",
        basePrice: 1820.00,
    },
    {
        symbol: "ULTRACEMCO",
        companyName: "UltraTech Cement",
        basePrice: 10950.00,
    },
];

async function seedStocks() {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected");

        await StocksModel.deleteMany({});
        await StocksModel.insertMany(stocks);

        console.log("Stocks inserted successfully");
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

seedStocks();