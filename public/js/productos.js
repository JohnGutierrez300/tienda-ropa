fetch("http://localhost:3000/api/productos")
.then(res=>res.json())
.then(data=>{

    let contenedor = document.getElementById("productos");

    data.forEach(producto=>{

        contenedor.innerHTML += `
        
        <div class="card">

        <img src="${producto.imagen}">

        <h3>${producto.nombre}</h3>

        <p>${producto.descripcion}</p>

        <p>$ ${producto.precio}</p>

        <button>Comprar</button>

        </div>
        
        `;

    });

});

console.log("Productos cargados");