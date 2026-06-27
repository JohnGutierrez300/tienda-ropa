console.log("adminSesion cargado");

const barra = document.getElementById("adminBarra");
const btnLogin = document.getElementById("btnLogin");

const rol = localStorage.getItem("rol");
const nombre = localStorage.getItem("nombre");

// Si hay una sesión iniciada ocultamos Login
if (rol && btnLogin) {
    btnLogin.style.display = "none";
}

// Mostrar barra del administrador
if (barra && rol === "admin") {

    barra.innerHTML = `
        <span>👑 Administrador: ${nombre}</span>
        <button id="cerrarSesion">Cerrar sesión</button>
    `;

    document.getElementById("cerrarSesion").onclick = () => {

        localStorage.removeItem("rol");
        localStorage.removeItem("nombre");

        window.location.href = "/";
    };
}