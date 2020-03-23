// // classe Compte que tindrà el camp Titular (nom + cognom), saldo, nombre de
// // compte i el nombre de transaccions realitzades. Els mètodes de la classe 
// // són: ingresar euros, retirar
// // euros, retornar saldo, veure transaccions, veure compte.

// ● El mètode ingresar euros permet fer un ingrés al saldo del compte.
// ● El mètode retirar saldo permet treure euros del saldo del compte
// ● El mètode retornar saldo, retorna el saldo total del compte
// ● El mètode veure transaccions, retorna el nombre de transaccions que s’han fet amb el
// compte
// ● El mètode veure compte mostra per pantalla totes les dades del compte

class BankAccount{
    constructor(name, surname, balance, iban, movements){
        this.name = name;
        this.surname = surname;
        this.balance = balance;
        this.iban = iban;
        this.movements = movements;
    }
    get getName(){
        return this.name;
    }
    get getSurname(){
        return this.surname;
    }
    getHolder(){
        return this.name + ' ' + this.surname;
    }
    get getBalance(){
        return this.balance;
    }
    get getIban(){
        return + this.iban;
    }
    get getMovements(){
        return this.movements;
    }
    getFullDetails(){
        return `Holder: ${this.getHolder()}<br>IBAN: ${this.iban}<br>Balance: ${this.balance}€<br>Movements: ${this.movements}`;
    }
    set setName(name){
        this.name = name;
    }
    set setSurname(surname){
        this.surname = surname;
    }
    set setBalance(balance){
        this.balance = balance;
    }
    set setIban(iban){
        this.iban = iban;
    }
    set setMovements(movements){
        this.movements = movements;
    }
}
// var person = {
//     surname: "John",
//     lastname: "Doe",
//     get fullname() {
//       return this.surname + " " + this.lastname;
//     },
//     set fullname(fullname) {
//       fullname = fullname.split(' ');
//       this.surname = fullname[0];
//       this.lastname = fullname[1];
//     }
//   };
  
//   console.log(person.fullname); // "John Doe"
//   person.fullname = "Jane Roe";
//   console.log(person.surname); // "Jane"
//   console.log(person.lastname); // "Roe"