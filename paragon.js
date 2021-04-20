/*
@todo LIST
  [done] - wprowadzanie nowych pozycji paragonu (+1),
  [done] - edycję istniejących pozycji (+1),
  [done] - usuwanie ich (+1),
  - zmianę kolejności (+1).
  [done] - local storage - Zawartość listy przechowuj (+1) 
  [done] - suma.
  - walidacja
  - zmiennoprzecinkowe wartości.
*/
/*
Manipulacja pozycjami powoduje 
zarówno aktualizację przechowywanego w pamięci modelu, 
jak i modyfikację widoku (fragmentu dokumentu).*/

let productList = [];

class Product {
  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }
}

const table = document.getElementById("billTable");
let id;
//dodawanie elementu do html
const addBill = (id, val) => {
  let row = table.insertRow();
  row.className = "product";

  // row.addEventListener('mousedown', function (event)
  // {
  //   if(selected!==this.rowIndex){
  //     event.target.parentNode.style.backgroundColor = "orange";
  //     selected=this.rowIndex;
  //   }
  // });

  let lp = row.insertCell(0);
  let nazwa = row.insertCell(1);
  let ilosc = row.insertCell(2);
  let cena = row.insertCell(3);
  let suma = row.insertCell(4);
  let usun = row.insertCell(5);
  let edytuj = row.insertCell(6);
  let arrows = row.insertCell(7);
  // let upArrow = row.insertCell(7);
  // let downArrow = row.insertCell(7);
  lp.id = "id";
  lp.innerHTML = id + 1;
  nazwa.innerHTML = val.name;
  ilosc.innerHTML = val.quantity;
  cena.innerHTML = val.price;
  suma.innerHTML = Math.round(val.quantity * val.price * 100) / 100;
  usun.innerHTML = "<button onclick='deleteProduct(this)'>Usuń</button>";
  edytuj.innerHTML = "<button onclick='editProduct(this)'>Edytuj</button>";

  let upArrow = document.createElement("DIV");
  upArrow.className = "material-icons arrow";
  upArrow.innerText = "arrow_upward";
  upArrow.style["height"] = "10px";
  

  let downArrow = document.createElement("DIV");
  downArrow.className = "material-icons arrow";
  downArrow.innerText = "arrow_downward";

  let allinone = document.createElement("DIV");
  allinone.appendChild(upArrow);
  allinone.appendChild(downArrow);
  arrows.appendChild(allinone);

  upArrow.addEventListener(
    "mousedown",
     (event)=>
     {
       let currRow=event.target.parentNode.parentNode.parentNode.rowIndex;
      console.log(currRow);
      let id=currRow;
      if (id > 1) {
        table.rows[id].parentNode.insertBefore(table.rows[id], table.rows[id - 1]);
      }
     } 
  );
  downArrow.addEventListener(
    "mousedown",
     (event)=>
     {
       let currRow=event.target.parentNode.parentNode.parentNode.rowIndex;
      console.log(currRow);
      let id=currRow;
      console.log(table.rows.length);
      if (id < table.rows.length - 1) {
        table.rows[id].parentNode.insertBefore(table.rows[id + 1], table.rows[id]);
      }
     } 
  );
};

function deleteProduct(x) {
  var i = x.parentNode.parentNode.rowIndex;
  document.getElementById("billTable").deleteRow(i);
  productList.splice(i - 1, 1);
  numerize(productList.length);
  localStorage.billList = JSON.stringify(productList);
  suma();
}

function editProduct(x) {
  var i = x.parentNode.parentNode.rowIndex;
  var obiekt = productList[i - 1];
  var editQuantity = prompt("Ile chcesz mieć powtórzeń tego produktu?");
  if (editQuantity > 0 && !isNaN(editQuantity)) {
    obiekt.quantity = editQuantity;
    var table = document.getElementById("billTable");
    table.rows[i].cells[2].innerHTML = obiekt.quantity;
    var suma = obiekt.quantity * obiekt.price;
    table.rows[i].cells[4].innerHTML = suma;
    localStorage.billList = JSON.stringify(productList);
  } else {
    alert("Podana przez ciebie liczba jest niewłaściwa!");
  }
  this.suma();
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
  suma();
};

// wczytywanie elementów przy uruchomieniu
document.body.onload = function () {
  if (localStorage.billList) {
    productList = JSON.parse(localStorage.billList);
    console.log(productList);
    console.log(JSON.parse(localStorage.billList));
    productList.forEach((val, id) => addBill(id, val));
    suma();
  }
};

// console.log(document.getElementById("billTable"));
// console.log(document.getElementById("billTable").rows[1].cells.length);
// console.log(table.rows[0].cells.length);

function suma() {
  productList = JSON.parse(localStorage.billList);
  var suma = 0;
  console.log(`Dlugosc listy: ${productList.length}`);
  if (productList.length == 0) {
    suma = 0;
  } else {
    for (let j = 0; j < productList.length; j++) {
      suma += productList[j].price * productList[j].quantity;
    }
  }
  let total = document.getElementById("total");
  total.style.margin = "0 auto";
  total.innerHTML = `Łącznie: ${suma}`;
  total.style.fontSize = "1.5em";
  total.style.marginBottom = "20px";

  console.log(suma);
}

function numerize(tableLength) {
  for (let j = 1; j <= tableLength; j++) {
    table.rows[j].cells[0].innerHTML = j;
  }
}



function upDown(dir) {
  let rows = table.rows;

  if (dir === "up") {
    if (id > 1) {
      table.insertBefore(rows[id], rows[id - 1]);
      id--;
    }
  }

  if (dir === "down") {
    if (id < rows.length - 1) {
      table.insertBefore(rows[id + 1], rows[id]);
      // when the row go down the id will be equal to id + 1
      id++;
    }
  }
}
