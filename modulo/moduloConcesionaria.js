let fs = require("fs")
let autosDB = JSON.parse(fs.readFileSync("./data/autos.json", "utf-8"));
//aca  me dara erro xq esta dentro de otra carpeta
let personasDB = JSON.parse(fs.readFileSync("./data/personas.json", "utf-8"));

let escribirJSON = (array) => {
    fs.writeFileSync("./data/autos.json", JSON.stringify(array), "utf-8")
    // si no pongo un array donde sobreescribir me lo crea
    //tmb sirve para los txt
}

let concesionaria = {
    autos : autosDB,
    personas : personasDB,
    buscarAuto : function (patente) {
        let autoEncontrado = autosDB.find(auto => auto.patente == patente);
        if(autoEncontrado){
            return autoEncontrado
        } else {
            return null;
        }
    },
    verderAuto : function(patente) {
        let auto = this.buscarAuto(patente);
        if (auto != null) {
            if (auto.vendido == false) {
                auto.vendido = true;
                escribirJSON(this.autos);
                return auto;
            } else if (auto.vendido == true) {
                return "Este auto ya fue vendido";
            } 
        } else {
            return "No se encuentra el auto"

        }
    },
    autosParaLaVenta : function () {
        return this.autos.filter(auto => auto.vendido == false)  
    },
    autosNuevos : function () {
        //let autitosNuevos = this.autosParaLaVenta();
        //return autitosNuevos.filter(auto => auto.km < 100);  
        return this.autosParaLaVenta().filter(auto => auto.km < 100);
    },
    listaDeVentas : function() {
        let autosVendidos = this.autos.filter(auto => auto.vendido == true);
        return autosVendidos.map(auto => auto.precio)
    },
    totalDeVentas : function() {
        let vendidos = this.listaDeVentas();
        let total = vendidos.length !== 0 ? vendidos.reduce((acum, item) => acum + item) : 0;
        return total;
    },
    puedeComprar: function (auto, persona) {
        let cuota = auto.precio / auto.cuotas;
        return auto.precio <= persona.capacidadDePagoTotal && persona.capacidadDePagoEnCuotas >= cuota    
    },
    autosQuePuedeComprar : function (persona) {
        return this.autosParaLaVenta().filter(auto => this.puedeComprar(auto,persona));   
    }
}

module.exports = concesionaria;

