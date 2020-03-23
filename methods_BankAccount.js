// -------------- CREATE ACCOUNT -------------- //
// Per donar d’alta un compte, el client ha d’omplir les següents dades: nom, cognom i nombre de
// compte. Quan es crea un compte, la qüantitat sempre és 50€ i el nombre de transaccions és 0.
// Abans de crear el compte, hem d’estar segurs que no hi ha cap compte que tingui el mateix titular i
// el mateix nombre de compte. Si un titular ja té aquest nombre de compte, hem d’informar a l’usuari
// dient-li que el compte no es crearà perquè ja té un compte amb aquest nombre i li mostrarem totes
// les dades d’aquest compte.
let arrBankAccounts = new Array();
function checkFields(name, surname, iban) {
    if (name == '' || name.length < 2 || surname == '' || surname.length < 2 || iban == '') {
        alert('Error! A field is missing or mistyped.');
        return false;
    }else{
        return true;
    }
}
function createBankAccount() {
    document.getElementById('resultCreateID').innerHTML = '';
    let name = document.getElementById('nameID').value;
    let surname = document.getElementById('surnameID').value;
    let iban = document.getElementById('ibanID').value;
    if (checkFields(name, surname, iban) == true){
        name = name[0].toUpperCase() + name.substring(1);
        surname = surname[0].toUpperCase() + surname.substring(1);
        iban = iban.replace(/\s/g,'');
        let balance = 50;
        let movements = 0;
        let found = false;
        let ibanRegEx = /([A-Z]{2})\s*\t*(\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d)\s*\t*(\d\d\d\d\d\d\d\d\d\d)/g
        // ES IBAN REGEX //
        for (var i = 0; i < arrBankAccounts.length; i++) {
            if (name === arrBankAccounts[i].name && iban === arrBankAccounts[i].iban) {
                let j = document.getElementById('resultCreateID');
                j.innerHTML = `This account already found. <br>${arrBankAccounts[i].getHolder()}<br>
                ${arrBankAccounts[i].iban}<br>${arrBankAccounts[i].balance}<br>${arrBankAccounts[i].movements}`;
                found = true;
            }
        }
        if (found == false && ibanRegEx.test(iban) == true) {
            let bankAccount = new BankAccount(name, surname, balance, iban, movements);
            arrBankAccounts.push(bankAccount);
            let k = document.getElementById('resultCreateID');
            k.innerHTML = 'Account created succesfully.'
        }
    } 
}
// -------------- CREATE 5 ACCOUNTS (for debbuging) -------------- //
function create5Accounts(){
    let BankAccount1 = new BankAccount('M.','Rajoy', 50, 'ES7921000813610123456781',0);
    let BankAccount2 = new BankAccount('Julio','Iglesias', 50, 'ES7921000813610123456782',0);
    let BankAccount3 = new BankAccount('Ana','Obregon', 50, 'ES7921000813610123456783',0);
    let BankAccount4 = new BankAccount('Jordi','Evole', 50, 'ES7921000813610123456784',0);
    let BankAccount5 = new BankAccount('Jesulin','Deubrique', 50, 'ES7921000813610123456785',0);
    arrBankAccounts.push(BankAccount1);
    arrBankAccounts.push(BankAccount2);
    arrBankAccounts.push(BankAccount3);
    arrBankAccounts.push(BankAccount4);
    arrBankAccounts.push(BankAccount5);
    let bankAccountsHolders = 
    BankAccount1.getHolder() + ' - IBAN ' + BankAccount1.iban + '<br>' +
    BankAccount2.getHolder() + ' - IBAN ' + BankAccount2.iban + '<br>' +
    BankAccount3.getHolder() + ' - IBAN ' + BankAccount3.iban + '<br>' +
    BankAccount4.getHolder() + ' - IBAN ' + BankAccount4.iban + '<br>' +
    BankAccount5.getHolder() + ' - IBAN ' + BankAccount5.iban;
    let x = document.getElementById('txtResultCreate5AccountsID');
    x.innerHTML = `Succesfully created accounts holded by; <br> ${bankAccountsHolders}`;
}

// -------------- CHECK ACCOUNT -------------- //
// Per veure un compte, li demanarem a l’usuari que introdueixi nom, cognom i nombre de compte. Si
// el compte existeix, li mostrarem a l’usuari tota la informació del compte. Si el compte no existeix,
// informarem a l’usuari que el compte no existeix i li mostrarem tots els seus comptes.
function checkAccount(){
    document.getElementById('resultCheckID').innerHTML = '';
    let name = document.getElementById('nameCheckID').value;
    let surname = document.getElementById('surnameCheckID').value;
    let iban = document.getElementById('ibanCheckID').value;
    let found = false;
    if (checkFields(name, surname, iban) == true){
        name = name[0].toUpperCase() + name.substring(1);
        surname = surname[0].toUpperCase() + surname.substring(1);
        iban = iban.replace(/\s/g,'');
        for (var i = 0; i < arrBankAccounts.length; i++){
            if (name === arrBankAccounts[i].name && surname === arrBankAccounts[i].surname && iban === arrBankAccounts[i].iban) {
                let j = document.getElementById('resultCheckID');
                j.innerHTML = arrBankAccounts[i].getFullDetails();
                found = true;
            }
            if (found == false && (arrBankAccounts[i].getHolder() == (name + ' ' + surname))){
                let k = document.getElementById('resultCheckID');
                k.innerHTML = `Account not found. These are the accounts owned by holder 
                ${arrBankAccounts[i].getHolder()} : <br>${arrBankAccounts[i].iban}`;
            }
            if (found == false && i == (arrBankAccounts.length - 1)){
                document.getElementById('resultCheckID').innerHTML = `Holder "${name} ${surname}" not found.`
            }
        }
    } 
}

// -------------- UPDATE ACCOUNT -------------- //
// Si l’usuari vol fer operacions amb el compte corrent, primer ha d’introduir el compte amb el que vol
// operar i llavors ha de poder ingresar, retirar, veure transaccions i veure compte. Si el compte no
// existeix, s’ha d’informar a l’usuari de que el compte amb el que vol operar no existeix i se li han de
// mostrar tots els seus comptes.
function updateAccount(){
    document.getElementById('resultUpdateID').innerHTML = '';
    let name = document.getElementById('nameUpdateID').value;
    let surname = document.getElementById('surnameUpdateID').value;
    let iban = document.getElementById('ibanUpdateID').value;
    let found = false;
    let updated = false;
    if (checkFields(name, surname, iban) == true){
        name = name[0].toUpperCase() + name.substring(1);
        surname = surname[0].toUpperCase() + surname.substring(1);
        iban = iban.replace(/\s/g,'');
        for (var i = 0; i < arrBankAccounts.length; i++){
            if (name === arrBankAccounts[i].name && surname === arrBankAccounts[i].surname && iban === arrBankAccounts[i].iban){
                found = true;
                do {
                    let operation = prompt('Please choose operation; MONEY IN - MONEY OUT - MOVEMENTS - IBAN');
                    operation = operation.replace(/\s/g,'');
                    operation = operation.toLocaleLowerCase();
                    switch(operation){
                        case 'moneyin':
                            let moneyIn = parseInt(prompt('Insert amount.'));
                            arrBankAccounts[i].balance += moneyIn;
                            arrBankAccounts[i].movements += 1;
                            updated = true;
                            break;
                        case 'moneyout':
                            let moneyOut = parseInt(prompt('Insert amount.'));
                            arrBankAccounts[i].balance -= moneyOut;
                            arrBankAccounts[i].movements += 1;
                            updated = true;
                            break;
                        case 'movements':
                            alert(arrBankAccounts[i].movements + ' movements.');
                            updated = true;
                            break;
                        case 'iban':
                            updated = true;
                            break;
                        default:
                            alert('Error! Insert operation: MONEY IN - MONEY OUT - MOVEMENTS - IBAN');
                            updated = false;
                    }
                }
                while(updated == false);
                if (updated == true){
                    let j = document.getElementById('resultUpdateID');
                    j.innerHTML = `Account succesfully updated.<br>${arrBankAccounts[i].getFullDetails()}`;
                }
            }
            if (found == false && name == arrBankAccounts[i].name && surname == arrBankAccounts[i].surname){
                let k = document.getElementById('resultUpdateID');
                k.innerHTML = `Account not found. <br> These are the accounts owned by holder 
                ${arrBankAccounts[i].getHolder()}:<br>IBAN : ${arrBankAccounts[i].iban}`;
            }
            if (found == false && i == (arrBankAccounts.length - 1)){
                document.getElementById('resultUpdateID').innerHTML = `Holder "${name} ${surname}" not found.`;
            }
        }
    }
}

// -------------- DELETE ACCOUNT -------------- //
// per donar de baixa un compte, li demanarem a l’usuari que introdueixi nom, cognom i nombre de
// compte. Si el compte existeix, l’eliminarem i informarem a l’usuari que el compte ha estat eliminat. Si
// el compte no existeix, informarem a l’usuari que el compte no existeix i mostrarem a l’usuari tots els
// comptes que té.
function deleteAccount(){
    document.getElementById('resultDeleteID').innerHTML = '';
    let name = document.getElementById('deleteNameID').value;
    let surname = document.getElementById('deleteSurnameID').value;
    let iban = document.getElementById('deleteIbanID').value;
    let found = false;
    let deleted = false;
    if (checkFields(name, surname, iban) == true){
        name = name[0].toUpperCase() + name.substring(1);
        surname = surname[0].toUpperCase() + surname.substring(1);
        iban = iban.replace(/\s/g,'');
        for (var i = 0; i < arrBankAccounts.length; i++){
            if (name == arrBankAccounts[i].name && surname == arrBankAccounts[i].surname && iban == arrBankAccounts[i].iban){
                found = true;
                arrBankAccounts[i].iban = '';
                deleted = true;
            }
            if (name == arrBankAccounts[i].name && surname == arrBankAccounts[i].surname && found == false ){
                document.getElementById('resultDeleteID').innerHTML = 'Account not found.<br> These are the accounts owned by holder ' + 
                arrBankAccounts[i].getHolder() + ':<br>' + 'IBAN: ' + arrBankAccounts[i].iban;
            }
            if (found == false && i == (arrBankAccounts.length - 1)){
                document.getElementById('resultDeleteID').innerHTML = `Holder "${name} ${surname}" not found.`;
            }
        }
        if (deleted == true && found == true){
            document.getElementById('resultDeleteID').innerHTML = 'Account succefully deleted.'
        }
    }
}
