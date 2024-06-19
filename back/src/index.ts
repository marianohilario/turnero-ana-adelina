const nombre: string = "Mariano";
console.log(nombre);

const num1 = 2;
const num2 = 4;
const suma = (a: number, b: number): number => a + b;
console.log(suma(num1,num2));
console.log(suma(65,17));

interface IAddress {
  street: string,
  city: string
}

interface IUser {
  name: string,
  surname: string,
  age: number,
  isActive: boolean,
  typeUser: EUser,
  address: IAddress
}

enum EUser {
  ADMIN = 'admin',
  USER = 'user'
}

const user1: IUser = {
  name: 'Mariano',
  surname: 'Hilario',
  age: 42,
  isActive: true,
  typeUser: EUser.ADMIN,
  address: {
    street: 'Calle Falsa 123',
    city: 'Banfield'
  }
}

console.log(user1);

type size = 'XS' | 'S' | 'M' | 'L' | 'XL'

function controlStock(talle: size) {
  if(talle === 'M' || talle === 'L') return 'Sin Stock'
  return 'En stock'
}

let talle: size = 'XL'
console.log(`${controlStock(talle)} para el talle seleccionado (${talle})`);
talle = 'XL'
console.log(`${controlStock(talle)} para el talle seleccionado (${talle})`);