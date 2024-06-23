"use strict";
const nombre = "Mariano";
console.log(nombre);
const num1 = 2;
const num2 = 4;
const suma = (a, b) => a + b;
console.log(suma(num1, num2));
console.log(suma(65, 17));
var EUser;
(function (EUser) {
    EUser["ADMIN"] = "admin";
    EUser["USER"] = "user";
})(EUser || (EUser = {}));
const user1 = {
    name: 'Mariano',
    surname: 'Hilario',
    age: 42,
    isActive: true,
    typeUser: EUser.ADMIN,
    address: {
        street: 'Calle Falsa 123',
        city: 'Banfield'
    }
};
console.log(user1);
function controlStock(talle) {
    if (talle === 'M' || talle === 'L')
        return 'Sin Stock';
    return 'En stock';
}
let talle = 'XL';
console.log(`${controlStock(talle)} para el talle seleccionado (${talle})`);
talle = 'XL';
console.log(`${controlStock(talle)} para el talle seleccionado (${talle})`);
