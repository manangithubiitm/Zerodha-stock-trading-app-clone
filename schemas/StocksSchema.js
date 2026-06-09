const { Schema } = require("mongoose");

const StocksSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
    },
});

module.exports = { StocksSchema };