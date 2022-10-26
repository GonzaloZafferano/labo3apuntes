
class Anuncio{
    
    constructor(id,titulo, descripcion, precio){

        if(!id){
            id = Date.now();
        }

        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

class Anuncio_Alta extends Anuncio{

    constructor(id,titulo, descripcion, precio,puertas, kms, potencia){
        super(id, titulo, descripcion, precio);
       
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    }
}

export {Anuncio_Alta};