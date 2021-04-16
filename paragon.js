/*
@todo LIST
  - wprowadzanie nowych pozycji paragonu (+1),
  - edycję istniejących pozycji (+1),
  [done] - usuwanie ich (+1),
  - zmianę kolejności (+1).
  [done] - local storage - Zawartość listy przechowuj (+1) 
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
let productList = [];

class Product {
  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }
}

const table = document.getElementById("billTable");

//dodawanie elementu do html
const addBill = (id, val) => {
  let row = table.insertRow();
  let lp = row.insertCell(0);
  let nazwa = row.insertCell(1);
  let ilosc = row.insertCell(2);
  let cena = row.insertCell(3);
  let suma = row.insertCell(4);
  let usun = row.insertCell(5);
  lp.id = "id";
  lp.innerHTML = id + 1;
  nazwa.innerHTML = val.name;
  ilosc.innerHTML = val.quantity;
  cena.innerHTML = val.price;
  suma.innerHTML = val.quantity * val.price;
  usun.innerHTML = "<button onclick='deleteProduct(this)'>Usuń</button>";
  // console.log(table.rows.length);
};



function deleteProduct(x){
  var i = x.parentNode.parentNode.rowIndex;
  document.getElementById("billTable").deleteRow(i);
  productList.splice(i-1,1);
  localStorage.billList=JSON.stringify(productList);
  numerize();
}

//dodawanie nowego rachunku
const addForm = document.getElementById("addForm");
addForm.onsubmit = (event) => {
  let name = addForm.name.value;
  let quantity = addForm.quantity.value;
  let cost = addForm.cost.value;
  let prod = new Product(name, quantity, cost);
  productList.push(prod);
  addBill(productList.length - 1, prod);

  localStorage.billList = JSON.stringify(productList);
  event.preventDefault();
};

// wczytywanie elementów przy uruchomieniu
document.body.onload = function () {
  if (localStorage.billList ) 
  {
    productList = JSON.parse(localStorage.billList);
    console.log(productList);
    console.log(JSON.parse(localStorage.billList));
    productList.forEach((val, id) => addBill(id, val));    
  }
  numerize()
  
};

//sortowanie tablicy g4g
function sortTableASC() {
  var rows, switching, i, x, y, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (let i = 1; i < rows.length - 1; i++) {
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
// console.log(document.getElementById("billTable"));
// console.log(document.getElementById("billTable").rows[1].cells.length);
console.log(table.rows[0].cells.length);

function numerize(){
  for(let rowId=1;rowId<=table.rows.length;rowId++)
  console.log(rowId);
  console.log(table.rows[rowId].cells.length);

}
