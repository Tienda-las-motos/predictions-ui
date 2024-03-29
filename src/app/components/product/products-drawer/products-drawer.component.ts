import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductItemList, ProductModel } from 'src/app/models/product.model';
import { TablesService } from 'src/app/services/tables.service';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { ProductsService } from '../../../services/products.service';
import { Loading } from 'src/app/services/loading/loading.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { TableData } from 'src/app/models/table.model';

@Component({
  selector: 'app-products-drawer',
  templateUrl: './products-drawer.component.html',
  styleUrls: ['./products-drawer.component.scss'],
})
export class ProductsDrawerComponent implements OnInit {
  listControl = new FormControl();
  productList: ProductItemList[] = [];
  products: string[] = [];
  productSelected: ProductItemList;
  filteredProducts: Observable<ProductItemList[]>;

  tableId: string;
  selected: string;
  constructor(
    public tables_: TablesService,
    private _cache: CacheService,
    public products_: ProductsService,
    private _loading: Loading,
    private _router: Router,
    private _alert: AlertService
  ) {
    let table = this._cache.getDataKey('currentTable');
    if (table) {
      this.tableId = table['data'].doc_id;
    } else {
      this._loading.toggleWaitingSpinner(true);
      this._loading.colectRouteData().subscribe((data) => {
        this.tableId = data.params['table'];
        this.tables_.getTable(this.tableId).subscribe(() => {
          this.tables_.tableLoaded$.next();
          this._loading.toggleWaitingSpinner(false);
        });
      });
    }
    this._loading.colectRouteData().subscribe((data) => {
      this.selected = data.params['product'];

      // let product = this._cache.getDataKey( 'currentProduct' )
      // if ( product[ 'data' ].doc_id !== this.selected ) {
      //     if ( this.selected ) {
      //         console.log('getSelected')
      //         // this.tables_.getTable(this.selected).subscribe()
      //     }
      // }
    });
  }

  ngOnInit(): void {
    this.tables_.tableList$.subscribe((data: ProductItemList[]) => {
      // console.log( data )
      this.productList = data.map((p) => {
        return { ...p, Descripcion: p.Descripcion.toLowerCase() };
      });
    });
    this.filteredProducts = this.listControl.valueChanges.pipe(
      startWith( '' ),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.productList.slice()),
      // tap( value => console.log( value))
    );

    this._cache.listenForChanges('currentTable').subscribe((table) => {
      this.tableId = table['data'].doc_id;
    });
  }

  private _filter(value: string): ProductItemList[] {
    const filterValue = value.toLowerCase();
    // console.log( this.productList )
    return this.productList.filter((option) =>
      option.Descripcion.toLowerCase().includes(filterValue)
    );
  }

  displayFn(item: ProductItemList): string {
    return item && item.Descripcion ? item.Descripcion : '';
  }

  selectProduct() {
    this._loading.toggleWaitingSpinner( true );
    let value = this.listControl.value
    let codigo = typeof value === 'string' ? value : value.Codigo
    this.products_
      .filterProduct(this.tableId, codigo)
      .subscribe(
        (result: ProductModel) => {
          this._loading.toggleWaitingSpinner(false);
          console.log(result);
          this._router.navigate([
            `/dashboard/table/${this.tableId}/product/${result.code}`,
          ]);
        },
        (error) => {
          this._loading.toggleWaitingSpinner(false);
          this._alert.sendError('Error del servidor', error.message);
          console.error(error.error);
        }
      );
  }

  navigateProduct(productId: string) {
    // let table = this._cache.getDataKey( 'currentTable' )
    // let tableId = table['data'].doc_id
    this.products_.loadProduct$.next(productId);
    this._router.navigate([
      `/dashboard/table/${this.tableId}/product/${productId}`,
    ]);
  }
}
