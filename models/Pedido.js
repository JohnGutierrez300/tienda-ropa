const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
    cliente: String,
    total: Number,
    estado: String
});

module.exports = mongoose.model("Pedido", PedidoSchema);