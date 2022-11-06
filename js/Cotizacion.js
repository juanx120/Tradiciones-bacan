var db = firebase.firestore();
const FormCotizacion = document.querySelector("#FormularioCotizacion");
var ProductosTotal = [];
var CantidadProductos = [];

document.addEventListener("DOMContentLoaded", mostrarCotizacion());

function mostrarCotizacion() {
  document.querySelector("#CotizacionCarro").style.display = "initial";
}

function productoCotizacion() {
  let ArrayCantidad = document.querySelectorAll(".ItemCantidad2");
  let ArrayProductos = document.querySelectorAll(".borrar-producto2");
  for (i = 0; i < ArrayCantidad.length; i++) {
    ProductosTotal[i] = ArrayProductos[i].dataset.id;
    CantidadProductos[i] = ArrayCantidad[i].value;
  }
}
FormCotizacion.addEventListener("submit", (e) => {
  e.preventDefault();
  productoCotizacion();
  console.log(ProductosTotal);
  console.log(CantidadProductos);
  var newCotizacion = {
    nombre: document.querySelector(".Nombre").value,
    apellido: document.querySelector(".Apellido").value,
    telefono: document.querySelector(".Telefono").value,
    email: document.querySelector(".Email").value,
    fecha: firebase.firestore.FieldValue.serverTimestamp(),
    ProductosTotal,
    CantidadProductos,
    precio: document
      .querySelector(".total-carrito-cotizacion")
      .textContent.replace("Precio: $", ""),
  };
  console.log(newCotizacion);
  FormCotizacion.reset();
  db.collection("Cotizaciones")
    .doc()
    .set(newCotizacion)
    .then(() => {
      console.log(newCotizacion);
    })
    .catch((err) => {
      console.log("error");
    });
});
let cerrar = document.querySelectorAll(".Cerrar")[0];
let abrir = document.querySelectorAll("#Enviar")[0];
let modal = document.querySelectorAll(".ModalEnviado")[0];
let modalC = document.querySelectorAll(".ContenedorModal")[0];

abrir.addEventListener("click", function (e) {
  e.preventDefault();
  modalC.style.opacity = "1";
  modalC.style.visibility = "visible";
  modal.classList.toggle("Modal-Cerrado");
});

cerrar.addEventListener("click", function () {
  modal.classList.toggle("Modal-Cerrado");
  setTimeout(function () {
    modalC.style.visibility = "hidden";
    modalC.style.opacity = "0";
  }, 700);
});
window.addEventListener("click", function (e) {
  if (e.target == modalC) {
    modal.classList.toggle("Modal-Cerrado");
    setTimeout(function () {
      modalC.style.visibility = "hidden";
      modalC.style.opacity = "0";
    }, 700);
  }
});

