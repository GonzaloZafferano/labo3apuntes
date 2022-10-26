import { crearTabla } from "./tablaDinamica.js";
import { Anuncio_Mascota } from "./clase.js";
import { actualizarItem, borrarItem, insertarItem, listado } from "./localStorage.js";


import { cargarValidacionesEnFormulario, validarLongitudMaxima,limpiarFormularioDeErroresDeValidacion, existenInputsInvalidos } from "./validaciones.js";

let hayModificacion = false;

const $spinner = document.getElementById("spinner");

const $tabla = document.getElementById("tablaDinamica");

$tabla.appendChild(crearTabla(listado));

const $formulario = document.forms[0];

const { id, agregar, limpiar, eliminar, titulo, descripcion, gato, perro, precio, raza, fecha, inyeccion } = $formulario;

actualizarTabla();


titulo.addEventListener("change", ()=>{hayModificacion = true;});
descripcion.addEventListener("change", ()=>{hayModificacion = true;});
precio.addEventListener("change", ()=>{hayModificacion = true;});
gato.addEventListener("change", ()=>{hayModificacion = true;});
perro.addEventListener("change", ()=>{hayModificacion = true;});
raza.addEventListener("change", ()=>{hayModificacion = true;});
fecha.addEventListener("change", ()=>{hayModificacion = true;});
inyeccion.addEventListener("change", ()=>{hayModificacion = true;});



const tituloForm = document.getElementById("tituloForm");

cargarValidacionesEnFormulario($formulario);

descripcion.addEventListener("blur", (e)=>{validarLongitudMaxima(e.target, 25);});
titulo.addEventListener("blur",  (e)=>{validarLongitudMaxima(e.target, 25);});

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if(hayModificacion){

 
        if(!existenInputsInvalidos(e.target.elements) && inyeccion.value && (gato.checked || perro.checked)){
            
            let idItem = id.dataset.id || 0;
            let animal = perro.checked ? "perro" : "gato";

            let item = new Anuncio_Mascota(idItem, titulo.value, descripcion.value, animal, precio.value, raza.value, fecha.value, inyeccion.value);
        
            if (!idItem) {
                insertarItem(item);
                actualizarTablaConSpinner();
            } else {

                if(confirm("Realmente desea modificar la mascota?")){
                    actualizarItem(item);
                    actualizarTablaConSpinner();
                }
            }
            limpiarFormulario();
        }else{
            alert("Faltan completar campos o hay datos invalidos.");
        }
    }else{
        alert("No se han realizado modificaciones para guardar.");
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

    const i = document.createElement("i");
    i.setAttribute("class", "fa-solid fa-floppy-disk");  
    agregar.innerHTML = "";
    agregar.appendChild(i);
    agregar.appendChild(document.createTextNode("Guardar"));

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
    i.setAttribute("class", "fas fa-paw fa-spin");
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
    fecha.value = item.fecha;
    raza.value = item.raza;
    gato.checked = item.animal.toLowerCase() == "gato";
    perro.checked = item.animal.toLowerCase() == "perro";
    inyeccion.value = item.vacuna;
}
