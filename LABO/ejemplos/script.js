import { crearTabla } from './tablaDinamica.js'
import { Anuncio } from './anuncio.js';

const $divTabla=document.getElementById("divTabla");
const anuncios=JSON.parse(localStorage.getItem("anuncios")) || [];
actualizarTabla();

window.addEventListener("click",(e)=>{
    if(e.target.matches("td")){
        console.log(e.target.parentElement.dataset.id);
        let id=e.target.parentElement.dataset.id;

        cargarFormulario(anuncios.find((anuncio)=>anuncio.id==id));
    } 
    else if(e.target.matches("#btnEliminar")){
        handlerDelete(parseInt($formulario.txtId.value));
        $formulario.reset();
    }  
});

function cargarFormulario(anuncio){
    const {txtId,txtTitulo,rbtTransaccion,txtDescripcion,txtPrecio,txtCantBanios,txtCantAutos,txtCantDormitorios} = $formulario;
    
    txtId.value=anuncio.id;
    txtTitulo.value=anuncio.titulo;
    rbtTransaccion.value=anuncio.transaccion;
    txtDescripcion.value=anuncio.descripcion;
    txtPrecio.value=anuncio.precio;
    txtCantBanios.value=anuncio.banios;
    txtCantAutos.value=anuncio.autos;
    txtCantDormitorios.value=anuncio.dormitorios;
}

const $formulario=document.forms[0];

$formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
     
    console.log("Enviando...");

    const {txtId,txtTitulo,rbtTransaccion,txtDescripcion,txtPrecio,txtCantBanios,txtCantAutos,txtCantDormitorios} = $formulario;

    const formAnuncio =new Anuncio(txtId.value,txtTitulo.value,rbtTransaccion.value,txtDescripcion.value,
                       txtPrecio.value,txtCantBanios.value,txtCantAutos.value,txtCantDormitorios.value);

    if(txtId.value === ''){
        formAnuncio.id=Date.now();
        handlerCreate(formAnuncio);
    }
    else{
        handlerUpdate(formAnuncio);
    }
    $formulario.reset();
})

const handlerCreate = (nuevoAnuncio)=>{
    anuncios.push(nuevoAnuncio);
    
    actualizarStorage(anuncios);
    actualizarTabla(); 
}

const handlerUpdate = (anuncioEditado) =>{

    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id==anuncioEditado.id;
    })
    anuncios.splice(indice,1);
    anuncios.push(anuncioEditado);

    actualizarStorage(anuncios);
    actualizarTabla();
}

const handlerDelete = (id)=>{
    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id==id;
    })
    anuncios.splice(indice,1);

    actualizarStorage(anuncios);
    actualizarTabla();
}

function actualizarTabla(){
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild);
    }
    const data =JSON.parse(localStorage.getItem("anuncios"));
    if(data){
        $divTabla.appendChild(crearTabla(anuncios));
    }
};

const actualizarStorage=(data)=>{
    localStorage.setItem("anuncios",JSON.stringify(data));
}