require("dotenv").config();

const conectarDB = require("./config/database");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

conectarDB();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

const productoRoutes = require("./routes/productoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Inicio
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});



app.get("/hombres", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "hombres.html"));
});

app.get("/mujeres", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "mujeres.html"));
});

app.get("/ofertas", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "ofertas.html"));
});

app.get("/contacto", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "contacto.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});



