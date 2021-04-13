class Product {
  constructor(nazwa, ilosc, cena, suma) {
    this.nazwa= nazwa;
    this.ilosc=ilosc;
    this.cena=cena;
    this.suma=suma;
  }

}

class Bill{
    constructor(){
        this.productList  =[];
    }
}