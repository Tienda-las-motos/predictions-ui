import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ApiResponse } from '../models/response.model';
import { Loading } from './loading/loading.service';
import { CacheService } from './cache.service';
import { AlertService } from './alerts/alert.service';
import { ProductItemList } from '../models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { TableData } from '../models/table.model';


@Injectable({
    providedIn: 'root',
})
export class TablesService {

    APIurl: string = 'http://127.0.0.1:8000/api/'
    tables$: Observable<TableData[]>
    tableList$: Observable<ProductItemList[]>

    constructor (
        private _http: HttpClient,
        private _loading: Loading,
        private _cache: CacheService,
        private _alert: AlertService,
        private _fs: AngularFirestore
    ) {
        this.loadCurrentTableList()
        this.getTables()
     }


    uploadTable( file ): Observable<any> {

        let formData = new FormData()
        formData.append('dataset', file)

        var headers: HttpHeaders = new HttpHeaders( {
            'ContentType': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        } );

        return this._http.post( 'api/load-file', formData, { headers } )
            .pipe(
                map( ( response: ApiResponse ) => {
                    if ( response.status === 200 ) {
                        this._cache.updateData( 'currentTable', response.result )
                    } else {
                        this._alert.sendMessageAlert(response.message)
                    }
                    return response.result
                }),
                catchError(error => throwError(error))
        )
    }


    loadCurrentTableList() {
        this.tableList$ =  this._cache.listenForChanges( 'currentTable' )
            .pipe(switchMap(result => {return result
                ? of( result[ 'product_list' ].data )
                : of([])
            } ) )
    }

    getTables() {
        this.tables$ = this._fs.collection<TableData>( 'tables' )
            .valueChanges().pipe( switchMap( list => list.length > 0
                ? of(list) : of([])) )
    }

    getTable( tableId ): Observable<any> {
        console.log(tableId)
        return this._http.get( `api/table?table=${tableId}` ).pipe(
            tap( (response)=> console.log(response)),
            map( ( response: ApiResponse ) => {
                if ( response.status === 200 ) {
                    this._cache.updateData( 'currentTable', response.result )
                } else {
                    this._alert.sendMessageAlert(response.message)
                }
                return response.result
            }),
            catchError(error => throwError(error))
        )
    }


    deleteTable( tableId: string ) {

    }
}