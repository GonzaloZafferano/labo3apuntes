
class Anuncio{
    
    constructor(id,titulo, descripcion, transaccion, precio){

        if(!id){
            id = Date.now();
        }

        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.transaccion = transaccion;
        this.precio = `$${new Intl.NumberFormat('de-DE').format(precio)}`;
    }
}

class Anuncio_Alta extends Anuncio{

    constructor(id,titulo, descripcion, transaccion, precio,puertas, kms, potencia){
        super(id, titulo, descripcion, transaccion, precio);
       
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    }
}

export {Anuncio_Alta};