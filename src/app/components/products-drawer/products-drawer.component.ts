import { Component, OnInit } from '@angular/core';
import { ProductItemList } from 'src/app/models/product.model';


@Component({
  selector: 'app-products-drawer',
  templateUrl: './products-drawer.component.html',
  styleUrls: ['./products-drawer.component.scss']
})
export class ProductsDrawerComponent implements OnInit {

    productList: ProductItemList[] = []
    productSelected: ProductItemList

    constructor () {
        this.productList = [
          {name:'Balatas', code:'1231231'},
          {name:'Freno de disco', code:'1231231'},
      ];
   }

  ngOnInit(): void {
  }

}
