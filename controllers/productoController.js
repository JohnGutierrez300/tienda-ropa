const Producto = require("../models/Producto");

// Obtener todos
exports.obtenerProductos = async (req, res) => {

    try {

        const productos = await Producto.find();

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener productos"
        });

    }

};

// Crear
exports.crearProducto = async (req, res) => {

    try {

        const producto = new Producto({

    nombre: req.body.nombre,

    descripcion: req.body.descripcion,

    precio: req.body.precio,

    categoria: req.body.categoria,

    stock: req.body.stock,

    imagen: req.file
        ? "/uploads/" + req.file.filename
        : ""

});

        await producto.save();

        res.json({

            mensaje: "Producto creado"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: "Error"

        });

    }

};

// Actualizar
exports.actualizarProducto = async (req, res) => {

    try {

        await Producto.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            mensaje: "Producto actualizado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al actualizar"
        });

    }

};

// Eliminar
exports.eliminarProducto = async (req, res) => {

    try {

        await Producto.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Producto eliminado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar"
        });

    }

};