import { Injectable } from '@angular/core';
import { ProveedorModel, ProvRequest, ProvResult } from '../models/proveedores.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap, map, catchError, startWith, switchMap } from 'rxjs/operators';
import { AlertService } from './alerts/alert.service';
import { ApiResponse } from '../models/response.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CacheService } from './cache.service';
import { Loading } from './loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  APIurl: string = environment.apiURL

  constructor (
    private _http: HttpClient,
    private _alert: AlertService,
    private _fs: AngularFirestore,
    private _cache: CacheService,
    private _loading: Loading
  ) { }
  
  evaluateProveedor(request: ProvRequest): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders( {
      'ContentType': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'
    } );
  
    

    return this._http.post(`${this.APIurl}/analyze/provider-offering`, request )
        .pipe(
            tap( ( response ) => console.log( response ) ),
            map( ( response: ApiResponse ) => {
                if ( response.status !== 200 ) {
                    this._alert.sendMessageAlert( response.message )
                    // this._cache.updateData( 'currentProduct', response.result )
                }
                return response.result
            } ),
            catchError( error => throwError( error ) )
        )
  }

  getProveedoresList(): Observable<ProveedorModel[]> {
    return this._loading.colectRouteData()
      .pipe(
        map( data => {
          let product = data.params[ 'product' ]
          let table = data.params[ 'table' ]
          return `tables/${ table }/products/${ product }/providers_offers`
        } ),
        tap(console.log),
        switchMap( ( path: string ) => path
          ? this._fs.collection<ProveedorModel>( path )
            .valueChanges()
          : of( [] ) )
      )
  }


  getCurrent( providerPath: string ): Observable<ProveedorModel> {
    return this._fs.doc<ProveedorModel>( providerPath ).valueChanges()
      .pipe( startWith( {
        result: this.result,
        query: this.provider
      } ) )
  }

  provider: ProvRequest = {
    table: '',
    product: '',
    provider: '',
    desc: 0,
    stock: 0,
    condition: 0,
    buy_price: 0,
    sale_price:0
  }

  result: ProvResult = {
    invested_capital: 0,
    suggest_sale_price: 0,
    suggest_buy_price: 0,
    saving: 0,
    desc_price: 0,
    invest: 0,
    total_saving: 0,
    total_invest: 0,
    profits: 0,
    utilities: 0,
    percent_utilities: 0,
  }


}
