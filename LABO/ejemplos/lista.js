import { crearTabla } from "./tablaDinamica.js";
import { Anuncio_Alta } from "./clase.js";
import { actualizarItem, borrarItem, insertarItem, listado } from "./localStorage.js";


import { cargarValidacionesEnFormulario, limpiarFormulario } from "./validaciones.js";


const $tabla = document.getElementById("tablaDinamica");

$tabla.appendChild(crearTabla(listado));

const $formulario = document.forms[0];

const { id, agregar, limpiar, eliminar, titulo, descripcion, precio, puertas, kms, potencia } = $formulario;

cargarValidacionesEnFormulario($formulario);

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const controles = e.target.elements;
    for (const control of controles) {
        if (control.classList.contains("inputError")) {
            return;
        }
    }

    let idItem = id.dataset.id || 0;
    let item = new Anuncio_Alta(idItem, titulo.value, descripcion.value, precio.value, puertas.value, kms.value, potencia.value);

    if (!idItem) {
        insertarItem(item);
    } else {
        actualizarItem(item);
    }
    actualizarTabla();
});




eliminar.addEventListener("click", (e)=>{
    let idItem = id.dataset.id;

    borrarItem(listado.find(x=> x.id == idItem));

    actualizarTabla();

    $formulario.reset();
});

limpiar.addEventListener("click", (e)=>{
    agregar.innerHTML = "Agregar";

    eliminar.classList.remove("mostrar");
    eliminar.classList.add("ocultar");

    limpiarFormulario($formulario);
});


function actualizarTabla() {
    while ($tabla.hasChildNodes()) {
        $tabla.removeChild($tabla.firstElementChild);
    }
    $tabla.appendChild(crearTabla(listado));
};


$tabla.addEventListener("click", (e) => {

    const elemento = e.target;

    if (elemento.matches("td")) {
        let itemId = elemento.parentElement.dataset.id;

        cargarFormulario(listado.find((x) => x.id == itemId));
        agregar.innerHTML = "actualizar";

        eliminar.classList.remove("ocultar");
        eliminar.classList.add("mostrar");
    }

    console.log(elemento);

})

/*
window.addEventListener("click", (e) => {
    if (e.target.matches("td")) {
        console.log(e.target.parentElement.dataset.id);
        let id = e.target.parentElement.dataset.id;

        cargarFormulario(anuncios.find((anuncio) => anuncio.id == id));
    }
    else if (e.target.matches("#btnEliminar")) {
        handlerDelete(parseInt($formulario.txtId.value));
        $formulario.reset();
    }
});

*/

function cargarFormulario(item) {
    id.dataset.id = item.id;
    titulo.value = item.titulo;
    descripcion.value = item.descripcion;
    precio.value = item.precio;
    puertas.value = item.puertas;
    kms.value = item.kms;
    potencia.value = item.potencia;
}
