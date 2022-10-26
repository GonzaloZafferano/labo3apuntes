import { crearTabla } from "./tablaDinamica.js";
import { Anuncio_Alta } from "./clase.js";
import { actualizarItem, borrarItem, insertarItem, listado } from "./localStorage.js";


import { cargarValidacionesEnFormulario, limpiarFormularioDeErroresDeValidacion, existenInputsInvalidos } from "./validaciones.js";

let hayModificacion = false;

const $spinner = document.getElementById("spinner");

const $tabla = document.getElementById("tablaDinamica");

$tabla.appendChild(crearTabla(listado));

const $formulario = document.forms[0];

const { id, agregar, limpiar, eliminar, titulo, descripcion, venta, alquiler, precio, puertas, kms, potencia } = $formulario;

actualizarTabla();


titulo.addEventListener("change", ()=>{hayModificacion = true;});
descripcion.addEventListener("change", ()=>{hayModificacion = true;});
precio.addEventListener("change", ()=>{hayModificacion = true;});
puertas.addEventListener("change", ()=>{hayModificacion = true;});
kms.addEventListener("change", ()=>{hayModificacion = true;});
potencia.addEventListener("change", ()=>{hayModificacion = true;});
venta.addEventListener("change", ()=>{hayModificacion = true;});
alquiler.addEventListener("change", ()=>{hayModificacion = true;});

const tituloForm = document.getElementById("tituloForm");

cargarValidacionesEnFormulario($formulario);

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if(hayModificacion){

 
        if(!existenInputsInvalidos(e.target.elements) && (venta.checked || alquiler.checked)){
            
            let idItem = id.dataset.id || 0;
            let transaccion = venta.checked ? "venta" : "alquiler";

            let item = new Anuncio_Alta(idItem, titulo.value, descripcion.value, transaccion, precio.value, puertas.value, kms.value, potencia.value);
        
            if (!idItem) {
                insertarItem(item);
            } else {
                actualizarItem(item);
            }
            actualizarTablaConSpinner();
            limpiarFormulario();
        }
    }
});




eliminar.addEventListener("click", (e)=>{
    let idItem = id.dataset.id;

    borrarItem(listado.find(x=> x.id == idItem));

    actualizarTablaConSpinner();

   limpiarFormulario();
});

limpiar.addEventListener("click", (e)=>{
    limpiarFormulario();
});

function limpiarFormulario(){
    hayModificacion = false;
    $formulario.reset();
    agregar.innerHTML = "Agregar";
    limpiar.innerHTML = "Limpiar";
    tituloForm.innerHTML = "Formulario de Alta";
    eliminar.classList.remove("mostrar");
    eliminar.classList.add("ocultar");
    id.dataset.id = "";
    limpiarFormularioDeErroresDeValidacion($formulario);
}

function actualizarTabla() {
    limpiarTabla();
    $tabla.appendChild(crearTabla(listado));
};

function limpiarTabla(){
    while ($tabla.hasChildNodes()) {
        $tabla.removeChild($tabla.firstElementChild);
    }
}

function actualizarTablaConSpinner(){

    limpiarTabla();
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-car fa-spin");
    $spinner.appendChild(i);

    setTimeout(()=>{
        $spinner.removeChild(i);
        actualizarTabla();
    }, 1500);
}

$tabla.addEventListener("click", (e) => {

    const elemento = e.target;

    if (elemento.matches("td")) {

        limpiarFormularioDeErroresDeValidacion($formulario);

        let itemId = elemento.parentElement.dataset.id;

        cargarFormulario(listado.find((x) => x.id == itemId));
        agregar.innerHTML = "Actualizar";
        limpiar.innerHTML = "Cancelar";
        tituloForm.innerHTML = "Formulario de Modificacion";
        eliminar.classList.remove("ocultar");
        eliminar.classList.add("mostrar");
    }

})


function cargarFormulario(item) {
    id.dataset.id = item.id;
    titulo.value = item.titulo;
    descripcion.value = item.descripcion;
    precio.value = item.precio.replace("$","").replaceAll(".", "");
    puertas.value = item.puertas;
    kms.value = item.kms;
    venta.checked = item.transaccion.toLowerCase() == "venta";
    alquiler.checked = item.transaccion.toLowerCase() == "alquiler";
    potencia.value = item.potencia;
}
