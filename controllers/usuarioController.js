const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {

    try {

        const { correo, password } = req.body;

        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const coincide = await bcrypt.compare(password, usuario.password);

        if (!coincide) {
            return res.status(400).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        res.json({
    mensaje: "Inicio de sesión correcto",
    nombre: usuario.nombre,
    rol: usuario.rol
});

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error del servidor"
        });

    }

};