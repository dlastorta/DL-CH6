const fs = require('fs')

class Archivo {
    constructor(ruta, cantProductos = 1) {
        this.ruta = ruta;
        this.cantProductos = cantProductos
        this.productos = [];
    }

    leer() {
        return fs.promises.readFile(this.ruta, 'utf-8')
            .then(contenido => {
                if(contenido) {
                    console.log("contenido:\n");
                    console.log(JSON.parse(contenido));
                }
                else{
                    console.log("archivo vacio");                
                }
                
            })
            .catch(err => {
                console.log(err);
            })
    }
    guardar(item) {
        try {
            let nItem = {
                id: this.cantProductos,
                title: item.title,
                price: item.price,
                thumbnail: item.thumbnail
            }
            this.productos.push(nItem);
            this.cantProductos++
            fs.promises.writeFile(this.ruta, JSON.stringify(this.productos,null,'\t'));
            console.log("agregado");
            
        } catch (err) {
            console.log("there was an error: " + err);
        }
    }

    borrar() {
        try {
            this.productos = [];
            fs.promises.truncate(this.ruta,0, ()=>console.log("borrado"));            
        } catch (err) {
            console.log("there was an error: " + err);
        }
    }
}

let archivo = new Archivo("file.json")
archivo.guardar({title:"Item1",price:100,thumbnail:"1"});
archivo.guardar({title:"Item2",price:200,thumbnail:"2"});
archivo.guardar({title:"Item3",price:300,thumbnail:"3"});
archivo.guardar({title:"Item4",price:400,thumbnail:"4"});
archivo.guardar({title:"Item5",price:500,thumbnail:"5"});
archivo.guardar({title:"Item6",price:533,thumbnail:"5"});
archivo.guardar({title:"Item7",price:644,thumbnail:"6"});
archivo.guardar({title:"Item8",price:332,thumbnail:"7"});
archivo.guardar({title:"Item9",price:221,thumbnail:"8"});
archivo.guardar({title:"Item10",price:1621,thumbnail:"9"});
archivo.leer();
archivo.borrar();
archivo.leer();

