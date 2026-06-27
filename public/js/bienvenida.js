const bienvenida = document.getElementById("bienvenida");

document.getElementById("btnHombre").onclick = () => {

    bienvenida.classList.add("ocultar");

    setTimeout(() => {

        window.location.href = "/hombres";

    }, 600);

};

document.getElementById("btnMujer").onclick = () => {

    bienvenida.classList.add("ocultar");

    setTimeout(() => {

        window.location.href = "/mujeres";

    }, 600);

};