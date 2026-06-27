const router = require("express").Router();

const upload = require("../middlewares/upload");

const productoController = require("../controllers/productoController");

router.get("/", productoController.obtenerProductos);

router.post(
    "/",
    upload.single("imagen"),
    productoController.crearProducto
);

router.put("/:id", productoController.actualizarProducto);

router.delete("/:id", productoController.eliminarProducto);

module.exports = router;