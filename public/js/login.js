const formulario = document.getElementById("loginForm");
const mensaje = document.getElementById("mensajeLogin");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    mensaje.style.display = "none";
    mensaje.className = "mensaje-login";

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    const respuesta = await fetch("/api/usuarios/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            correo,
            password
        })

    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {

    console.log(datos);

    mensaje.style.display = "block";
    mensaje.className = "mensaje-login mensaje-error";
    mensaje.textContent = datos.mensaje;

    return;
}

    mensaje.style.display = "block";
mensaje.className = "mensaje-login mensaje-exito";
    mensaje.innerText = "✅ Bienvenido " + datos.nombre;
    
    localStorage.setItem("rol", datos.rol);
localStorage.setItem("nombre", datos.nombre);

    setTimeout(() => {

    window.location.href = "/";

}, 1200);

});