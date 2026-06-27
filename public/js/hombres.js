

//==============================
// TOAST MENSAJES
//==============================

const toast = document.getElementById("toast");

function mostrarMensaje(texto, tipo = "ok") {

    if (!toast) return;

    toast.innerText = texto;

    toast.className = "toast";

    if (tipo === "error") {
        toast.classList.add("error");
    }

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 2500);

}

//==============================
// PANEL ADMIN
//==============================

const panel = document.getElementById("panelAdminProductos");

const esAdmin = localStorage.getItem("rol") === "admin";

if (panel && esAdmin) {

    panel.style.display = "block";

}

//==============================
// PREVISUALIZAR IMAGEN
//==============================

const imagen = document.getElementById("imagen");
const preview = document.getElementById("preview");

if (imagen) {

    imagen.onchange = () => {

        const archivo = imagen.files[0];

        if (!archivo) return;

        preview.src = URL.createObjectURL(archivo);

        preview.style.display = "block";

    };

}

//==============================
// LISTA PRODUCTOS
//==============================

const lista = document.getElementById("listaProductos");

let productoEditar = null;
let productoEliminar = null;

//==============================
// CARGAR PRODUCTOS
//==============================

async function cargarProductos() {

    const respuesta = await fetch("/api/productos");

    const productos = await respuesta.json();

    lista.innerHTML = "";

    productos
        .filter(p => p.categoria === "hombre")
        .forEach(producto => {

            lista.innerHTML += `

            <div class="card">

                <img src="${producto.imagen}" alt="">

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <h2>$${producto.precio}</h2>

                ${esAdmin ? `

                <div class="admin-botones">

                    <button
                        class="editar"
                        onclick="editarProducto('${producto._id}')">

                        ✏ Editar

                    </button>

                    <button
                        class="eliminar"
                        onclick="eliminarProducto('${producto._id}')">

                        🗑 Eliminar

                    </button>

                </div>

                ` : ""}

            </div>

            `;

        });

}

//==============================
// EDITAR
//==============================

async function editarProducto(id) {

    const respuesta = await fetch("/api/productos");

    const productos = await respuesta.json();

    productoEditar = productos.find(p => p._id === id);

    document.getElementById("editNombre").value = productoEditar.nombre;
    document.getElementById("editDescripcion").value = productoEditar.descripcion;
    document.getElementById("editPrecio").value = productoEditar.precio;
    document.getElementById("editStock").value = productoEditar.stock;

    document.getElementById("modalEditar").style.display = "flex";

}


function cerrarModalEditar(){

    document.getElementById("modalEditar").style.display="none";

}


async function guardarEdicion(){

    await fetch("/api/productos/"+productoEditar._id,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            nombre:document.getElementById("editNombre").value,

            descripcion:document.getElementById("editDescripcion").value,

            precio:document.getElementById("editPrecio").value,

            stock:document.getElementById("editStock").value,

            imagen:productoEditar.imagen,

            categoria:"hombre"

        })

    });

    cerrarModalEditar();

    mostrarMensaje("✅ Producto editado correctamente");

    cargarProductos();

}

//==============================
// ELIMINAR
//==============================

function eliminarProducto(id){

    productoEliminar=id;

    document.getElementById("modalEliminar").style.display="flex";

}

function cerrarEliminar(){

    document.getElementById("modalEliminar").style.display="none";

}


async function confirmarEliminar(){

    await fetch("/api/productos/"+productoEliminar,{

        method:"DELETE"

    });

    cerrarEliminar();

    mostrarMensaje("🗑 Producto eliminado correctamente");

    cargarProductos();

}

//==============================
// AGREGAR PRODUCTO
//==============================

const formulario = document.getElementById("formProducto");

if (formulario) {

    formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    console.log("1. Entró al submit");

    const datos = new FormData();

    datos.append("nombre", document.getElementById("nombre").value);
    datos.append("descripcion", document.getElementById("descripcion").value);
    datos.append("precio", document.getElementById("precio").value);
    datos.append("stock", document.getElementById("stock").value);
    datos.append("categoria", "hombre");

    const archivo = document.getElementById("imagen").files[0];

    if (archivo) {
        datos.append("imagen", archivo);
    }

    console.log("2. Enviando al servidor");

    const respuesta = await fetch("/api/productos", {
        method: "POST",
        body: datos
    });

    console.log("3. Respuesta recibida");

    const resultado = await respuesta.json();

    console.log("4. Resultado:", resultado);

    mostrarMensaje("✅ Producto agregado correctamente");

    console.log("5. Mensaje mostrado");

    formulario.reset();

    preview.style.display = "none";

    cargarProductos();

});

}

//==============================
// INICIAR
//==============================

cargarProductos();