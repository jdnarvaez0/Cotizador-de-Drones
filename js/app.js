$(function () {
  // Variables
  const contenedorCarrito = document.querySelector("#lista-carrito tbody");
  let articulosCarrito = [];
  let total = 0;
  let subTotal = 0;

  // Listeners
  cargarEventListeners();

  function cargarEventListeners() {
    // Cuando se elimina un producto del carrito
    $("#carrito").click(eliminarProducto);

    document.addEventListener("DOMContentLoaded", () => {
      articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

      carritoHTML();
    });

    $("#vaciar-carrito").click(function () {
      articulosCarrito = []; //resetea el arreglo
      total = 0;
      
      limpiarHTML(); //Se elimina todo el HTML
    });
  }

  $("#lista-productos").click(function (e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains("agregar-carrito")) {
      const producto =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement;
      // Enviamos el producto seleccionado para tomar sus datos
      leerDatosproducto(producto);
    }
  });

  // Lee los datos del producto
  function leerDatosproducto(producto) {
    const infoproducto = {
      imagen: producto.querySelector('img').src,
      titulo: producto.querySelector("h5").textContent,
      precio: producto.querySelector(".precio span").textContent,
      id: producto.querySelector("a").getAttribute("data-id"),
      cantidad: 1,
    };

    if (articulosCarrito.some((producto) => producto.id === infoproducto.id)) {
      const productos = articulosCarrito.map((producto) => {
        if (producto.id === infoproducto.id) {
          producto.cantidad++;
          return producto;
        } else {
          return producto;
        }

      });
      articulosCarrito = [...productos];
    } else {
      articulosCarrito = [...articulosCarrito, infoproducto];
    }
    
    console.log(articulosCarrito);

    carritoHTML();

  }

  // Elimina el producto del carrito en el DOM
  function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-producto")) {
      const productoId = e.target.getAttribute("data-id");

      // Eliminar del arreglo del carrito
      articulosCarrito = articulosCarrito.filter(
        (producto) => producto.id !== productoId
      );
      carritoHTML();
    }
  }

  // Muestra el producto seleccionado en el Carrito
  function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach((producto) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>  
                         <img src="${producto.imagen}" width=100>
                    </td>
                    <td>${producto.titulo}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.cantidad} </td>
                   <td>
                         <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
                    </td>                    
               `;

      contenedorCarrito.appendChild(row);
      precioParse =  parseFloat ( producto.precio);
      subTotal = ((precioParse * producto.cantidad));
      total = total + subTotal;
    }); 
    // console.log(total);
    document.querySelector('#total span').innerHTML = total.toFixed(2);
  }
  
  // Elimina los productos del carrito en el DOM
  function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      $('#total span').remove(total);
    }
  }

});
