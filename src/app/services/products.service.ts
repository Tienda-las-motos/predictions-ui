import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { ApiResponse } from '../models/response.model';
import { AlertService } from './alerts/alert.service';
import { CacheService } from './cache.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductModel } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {

    productsFS$: Observable<ProductModel[]>

    constructor (
        private _http: HttpClient,
        private _cache: CacheService,
        private _alert: AlertService,
        private _fs: AngularFirestore
    ) {
        this.getProducts()
    }


    filterProduct(table: string, product: string): Observable<any> {
        return this._http.get( `api/product/filter?table=${ table }&product=${ product }` )
            .pipe(
                tap( (response)=> console.log(response)),
                map( ( response: ApiResponse ) => {
                    if ( response.status === 200 ) {
                        this._cache.updateData( 'currentProduct', response.result )
                    } else {
                        this._alert.sendMessageAlert(response.message)
                    }
                    return response.result
                }),
                catchError(error => throwError(error))
        )
    }


    getMonthDetails( table: string, product: string ): Observable<any> {
        return this._http.get( `api/product/month-details?table=${ table }&product=${ product }` )
            .pipe(
                tap( (response)=> console.log(response)),
                map( ( response: ApiResponse ) => {
                    if ( response.status !== 200 ) {
                        this._alert.sendMessageAlert(response.message)
                        // this._cache.updateData( 'currentProduct', response.result )
                    }
                    return response.result
                }),
                catchError(error => throwError(error))
        )
    }


    getProducts() {
        let currentTable = this._cache.getDataKey( 'currentTable' )
        let tableId = currentTable['data'].doc_id

        this.productsFS$ = this._fs
            .collection<ProductModel>( `tables/${ tableId }/products` )
            .valueChanges()
            .pipe( switchMap( list => list.length > 0
                ? of(list) : of([])
            ) )
    }


    async getProduct(productId) {
        const currentTable = this._cache.getDataKey( 'currentTable' )
        const tableId = currentTable[ 'data' ].doc_id


        let productDoc = await this._fs.doc( `tables/${ tableId }/products/${ productId }` ).ref.get()
        console.log(productDoc.data())
        let product: ProductModel = productDoc.data() as ProductModel
        return product
    }
}