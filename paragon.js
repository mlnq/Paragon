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


//starczy dodawac na stringa

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

const addForm = document.getElementById("addForm");
console.log(addForm.name);
addForm.onsubmit = (event) => 
{
  let name= addForm.name.value;
  let quantity= addForm.quantity.value;
  let cost= addForm.cost.value;
  let prod=new Product(name,quantity,cost);
  testBill.productList.push(prod);
  addBill(testBill.productList.length-1,prod);
  event.preventDefault();
}

// let produkty = [];

// localStorage.produkty = testBill.productList;
// console.log(produkty);

// testBill.productList = localStorage.produkty;


//sortowanie tablicy g4g
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



// console.log(table.rows);
// console.log(table.rows[0].cells.length);