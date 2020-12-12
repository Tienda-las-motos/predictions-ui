import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductItemList, ProductModel } from 'src/app/models/product.model';
import { TablesService } from 'src/app/services/tables.service';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { ProductsService } from '../../services/products.service';
import { Loading } from 'src/app/services/loading/loading.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-drawer',
  templateUrl: './products-drawer.component.html',
  styleUrls: ['./products-drawer.component.scss']
})
export class ProductsDrawerComponent implements OnInit {
    listControl = new FormControl()
    productList: ProductItemList[] = []
    products: string[] = []
    productSelected: ProductItemList
    filteredProducts: Observable<ProductItemList[]>

    tableId: string
    selected: string
    constructor (
        public tables_: TablesService,
        private _cache: CacheService,
        public products_: ProductsService,
        private _loading: Loading,
        private _router: Router,
    ) {
        let table = this._cache.getDataKey( 'currentTable' )
        if ( table ) { this.tableId = table[ 'data' ].doc_id }
        this._loading.colectRouteData().subscribe( data => {
            this.selected = data.params[ 'product' ]
            // let product = this._cache.getDataKey( 'currentProduct' )
            // if ( product[ 'data' ].doc_id !== this.selected ) {
            //     if ( this.selected ) {
            //         console.log('getSelected')
            //         // this.tables_.getTable(this.selected).subscribe()
            //     }
            // }
        })
   }

    ngOnInit(): void {
        this.tables_.tableList$.subscribe( (data: ProductItemList[]) => {
            this.productList = data.map( p => { return {...p, descripcion: p.descripcion.toLowerCase()}})
        })
        this.filteredProducts = this.listControl.valueChanges
        .pipe(
            tap(value => console.log(value)),
            startWith(''),
            map( value => this._filter( value ) ),
        )


    }

    private _filter(value: string): ProductItemList[] {
        const filterValue = value.toLowerCase();
        return this.productList.filter(option => option.descripcion.toLowerCase().includes(filterValue));
    }

    selectProduct() {
        this._loading.toggleWaitingSpinner(true)
        this.products_.filterProduct( this.tableId, this.listControl.value )
            .subscribe( (result: ProductModel) => {
                this._loading.toggleWaitingSpinner(false)
                console.log( result )
                this._router.navigate([`/dashboard/table/${this.tableId}/product/${result.code}`])
        })
    }

    navigateProduct( productId: string ) {
        this.products_.loadProduct$.next(productId)
        this._router.navigate([`/dashboard/table/${this.tableId}/product/${productId}`])
    }


}
