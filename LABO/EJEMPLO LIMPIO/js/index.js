import {listado} from "./localStorage.js";


const $contenidoDinamico =document.getElementById("contenidoDinamico");
crearArticulos();

function crearArticulo(item){
    const articulo = document.createElement("article");
    const titulo = document.createElement("h3");
    const precio = document.createElement("p");
    const descripcion = document.createElement("p");
    const puertas = document.createElement("p");
    const potencia = document.createElement("p");
    const kms = document.createElement("p");
    const boton = document.createElement("button");

    const imgPuertas = document.createElement("img");
    const imgKms = document.createElement("img");
    const imgPotencia = document.createElement("img");

    const divPuertas = document.createElement("div");
    const divKms = document.createElement("div");
    const divPotencia = document.createElement("div");
    const divCaracteristicas = document.createElement("div");

    divKms.appendChild(kms);
    divKms.appendChild(imgKms);
    divPotencia.appendChild(potencia);
    divPotencia.appendChild(imgPotencia);
    divPuertas.appendChild(puertas);
    divPuertas.appendChild(imgPuertas);
    divCaracteristicas.appendChild(divPuertas);
    divCaracteristicas.appendChild(divPotencia);
    divCaracteristicas.appendChild(divKms);

    imgPotencia.setAttribute("src", "./icons/iconmonstr-car-3.png");
    imgKms.setAttribute("src", "./icons/iconmonstr-car-3.png");
    imgPuertas.setAttribute("src", "./icons/iconmonstr-car-3.png");

    articulo.appendChild(titulo);
    articulo.appendChild(descripcion);
    articulo.appendChild(precio);
    articulo.appendChild(divCaracteristicas);
    articulo.appendChild(boton);
    
    titulo.appendChild(document.createTextNode(item.titulo));
    kms.appendChild(document.createTextNode(item.kms));
    precio.appendChild(document.createTextNode(item.precio));
    puertas.appendChild(document.createTextNode(item.puertas));
    potencia.appendChild(document.createTextNode(item.potencia));
    descripcion.appendChild(document.createTextNode(item.descripcion));
    boton.innerHTML = "Ver vehiculo";

    articulo.classList.add("estiloParaArticulo");

    return articulo;
}

function crearArticulos(){

    const fragmento = document.createDocumentFragment();

    listado.forEach(item => {

        fragmento.appendChild(crearArticulo(item));
    });

    $contenidoDinamico.appendChild(fragmento);
}