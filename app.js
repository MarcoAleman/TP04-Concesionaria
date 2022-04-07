let concesionaria = require("./modulo/moduloConcesionaria");
let fs = require("fs")
let personasDB = JSON.parse(fs.readFileSync("./data/personas.json", "utf-8"));
let autosDB = JSON.parse(fs.readFileSync("./data/autos.json", "utf-8"));

//console.log(concesionaria.autos)
//console.log(concesionaria.buscarAuto("ZPO158"))
//console.log(concesionaria.verderAuto("ZPO157"))
//console.log(concesionaria.buscarAuto("ZPO158"))
//console.log(concesionaria.totalDeVentas())
//console.log(concesionaria.autosNuevos())
//console.log(concesionaria.listaDeVentas())
//console.log(concesionaria.autos)
console.log(concesionaria.autosQuePuedeComprar(personasDB[1]))
//console.log(concesionaria.puedeComprar(autosDB[1], personasDB[1]))