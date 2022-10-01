const assert = require('assert')
const obj = {}
const arr = []
const fn = () => {}

// Internamente, objetos literais viram funções explicitas
console.log('new Object() is {}?', new Object().__proto__ === obj.__proto__) // true
assert.deepEqual(new Object().__proto__, obj.__proto__)

// __proto__ é a referencia do objeto que possui as propriedades dele
console.log(
  'obj.__proto__ === Object.prototype',
  obj.__proto__ === Object.prototype
) // true
assert.deepEqual(obj.__proto__, Object.prototype)

console.log(
  'arr.__proto__ === Array.prototype',
  arr.__proto__ === Array.prototype
) // true
assert.deepEqual(arr.__proto__, Array.prototype)

console.log(
  'fn.__proto__ === Function.prototype',
  fn.__proto__ === Function.prototype
) // true
assert.deepEqual(fn.__proto__, Function.prototype)

// o __proto__ de Object.prototype é null
console.log(
  'obj.__proto__.__proto__ === null',
  obj.__proto__.__proto__ === null
) // true
assert.deepEqual(obj.__proto__.__proto__, null)

console.log('---------')

function Employee() {}
Employee.prototype.salary = () => 'salary'

console.log(Employee.prototype.salary()) // salary;

function Supervisor() {}
// herda a instancia do Employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => 'profitShare'

function Manager() {}
// herda a instancia do Supervisor, logo, herda a instancia do Employee também
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses'

// podemos chamar via prototype, mas se tentar chamar direto dá erro!
console.log('Manager.prototype.salary()', Manager.prototype.salary()) // salary

// Se tentarmos chamar direto, tipo Manager.salary(), dá erro!
// Isso acontece pois se não chamarmos o new, o primeiro __proto__ vai ser sempre a instância de Function, sem herdar as classes
//console.log('Manager.salary()', Manager.salary()) -> TypeError: Manager.salary is not a function

// Para acessar as classes sem o new, podemos acessar direto via prototype
console.log(
  'Manager.prototype.__proto__ === Supervisor.prototype',
  Manager.prototype.__proto__ === Supervisor.prototype
) // true');
assert.deepEqual(Manager.prototype.__proto__, Supervisor.prototype)

console.log('--------')

// Quando chamamos com o 'new' o __proto__ recebe o prototype
const manager = new Manager()
console.log(
  'manager.__proto__: %s, manager.salary(): %s',
  manager.__proto__,
  manager.salary()
)
console.log(
  'Supervisor.prototype === manager.__proto__.__proto__',
  Supervisor.prototype === manager.__proto__.__proto__
) // true
assert.deepEqual(Supervisor.prototype, manager.__proto__.__proto__)

console.log('--------')
console.log('manager.salary()', manager.salary()) // salary);
console.log('manager.profitShare()', manager.profitShare()) // profitShare);
console.log('manager.monthlyBonuses()', manager.monthlyBonuses()) // monthlyBonuses);

console.log(
  'manager.__proto__ === Manager.prototype: ',
  manager.__proto__ === Manager.prototype
) // true
assert.deepEqual(manager.__proto__, Manager.prototype)
console.log(
  'manager.__proto__.__proto__ === Supervisor.prototype: ',
  manager.__proto__.__proto__ === Supervisor.prototype
) // true
assert.deepEqual(manager.__proto__.__proto__, Supervisor.prototype)
console.log(
  'manager.__proto__.__proto__.__proto__ === Employee.prototype: ',
  manager.__proto__.__proto__.__proto__ === Employee.prototype
) // true
assert.deepEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
console.log(
  'manager.__proto__.__proto__.__proto__.__proto__ === Object.prototype: ',
  manager.__proto__.__proto__.__proto__.__proto__ === Object.prototype
) // true
assert.deepEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
)
console.log(
  'manager.__proto__.__proto__.__proto__.__proto__.__proto__ === null: ',
  manager.__proto__.__proto__.__proto__.__proto__.__proto__ === null
) // true
assert.deepEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
)

console.log('--------')

class T1 {
  ping() {
    return 'ping'
  }
}

class T2 extends T1 {
  pong() {
    return 'pong'
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot'
  }
}

const t3 = new T3()
console.log('t3.ping()', t3.ping()) // ping');
console.log('t3.pong()', t3.pong()) // pong');
console.log('t3.shoot()', t3.shoot()) // shoot');

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null) // true);
console.log('t3.__proto__:', t3.__proto__ )
console.log('t3.__proto__.__proto__:', t3.__proto__.__proto__ )
console.log('t3.__proto__.__proto__.__proto__:', t3.__proto__.__proto__.__proto__ )
console.log('t3.__proto__.__proto__.__proto__.__proto__:', t3.__proto__.__proto__.__proto__.__proto__ )
console.log('t3.__proto__.__proto__.__proto__.__proto__.__proto__:', t3.__proto__.__proto__.__proto__.__proto__.__proto__ )

assert.deepEqual(t3.__proto__, T3.prototype)
assert.deepEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)