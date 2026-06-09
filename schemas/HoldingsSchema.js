const {Schema} = require('mongoose');

const HoldingsSchema = new Schema({
    userId: String,
    name: String,
    qty: Number,
    avg: Number,
});

module.exports = {HoldingsSchema};