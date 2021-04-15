
/*
@TODO LIST
  - wprowadzanie nowych pozycji paragonu (+1),
  - edycję istniejących pozycji (+1),
  - usuwanie ich (+1),
  - zmianę kolejności (+1).
  - local storage - Zawartość listy przechowuj (+1)
*/
/*
Zalecane podejście: 
przechowujcie reprezentację paragonu w postaci tablicy obiektów, 
a dopiero na tej podstawie budujcie dokument. 

Manipulacja pozycjami powoduje 
zarówno aktualizację przechowywanego w pamięci modelu, 
jak i modyfikację widoku (fragmentu dokumentu).*/

///*@TODO 
// 1.Ogarnąć dodawanie elementów przez formularz
// 2.dodawanie elementów na localStorage


class Product {
  constructor(name, quantity, price) {
    this.name= name;
    this.quantity=quantity;
    this.price=price;
  }

}

class Bills{
    constructor(){
        this.productList  =[];
    }
}

console.log("działam");
///*@TODO ogarnięcie formularza

// const addForm = document.getElementById("addform");
// addform.onsubmit = (event) => 
// {
//  const nowy = document.createElement("input");
//  nowy.type = "button";
//  nowy.value = myform.kolor.value;
//  buttons.append(nowy);
//  event.preventDefault();
// }

let testBill = new Bills();
let testProduct1 = new Product("Mango",2,10);
let testProduct2 = new Product("Jabłko",3,8);
let testProduct3 = new Product("Xiaomi Lepsze",2,3000);
testBill.productList.push(testProduct1);
testBill.productList.push(testProduct2);
testBill.productList.push(testProduct3);
testBill.productList.push(testProduct3);
testBill.productList.push(testProduct3);
testBill.productList.push(testProduct3);
testBill.productList.push(testProduct3);
testBill.productList.push(testProduct3);
console.log(testBill.productList);


const table = document.getElementById("billTable");

//dodawanie elementu do rachunku 
const addBill = (id,val) =>{
  let row = table.insertRow();
  let lp = row.insertCell(0);
  let nazwa = row.insertCell(1);
  let ilosc = row.insertCell(2);
  let cena = row.insertCell(3);
  let suma = row.insertCell(4);
  lp.id="id";
  lp.innerHTML = id+1;
  nazwa.innerHTML =val.name;
  ilosc.innerHTML =val.quantity;
  cena.innerHTML =val.price;
  suma.innerHTML = val.quantity * val.price;
}

testBill.productList.forEach((val,id)=>
 addBill(id,val)
);



// console.log(table.rows);
// console.log(table.rows[0].cells.length);

//sortowanie tablicy z geeks4geeks xd
function sortTableASC(){
  var rows, switching, i, x, y, shouldSwitch;
  switching = true;
  while (switching) 
  {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];

      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }  
}
sortTableASC();