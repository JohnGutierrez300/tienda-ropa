const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    imagen: {
        type: String,
        required: true
    },

    categoria: {
        type: String,
        enum: ["hombre", "mujer", "oferta"],
        required: true
    },

    stock: {
        type: Number,
        default: 0
    },

    activo: {
        type: Boolean,
        default: true
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Producto", ProductoSchema);