const { model } = require("mongoose");

const { StocksSchema } = require("../schemas/StocksSchema");

const StocksModel = model("stock", StocksSchema);

module.exports = { StocksModel };