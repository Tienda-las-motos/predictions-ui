import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PredictionResults, PredictionForm, RegressionForm, InverseRegForm } from '../models/predictions.model';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ApiResponse } from '../models/response.model';
import { AlertService } from './alerts/alert.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PredictionsService {
    
    APIurl: string = environment.apiURL
    constructor (
        private _fs: AngularFirestore,
        private _http: HttpClient,
        private _alert: AlertService,
    ) { }

    async getLastPrediction(
        table: string,
        product: string,
        type: 'estimated' | 'arima'
    ): Promise<PredictionResults | false> {

        const docRef = this._fs.doc( `tables/${ table }/products/${ product }/predictions/${ type }` ).ref
        const document = await docRef.get()
        if ( document.exists ) {
            return document.data() as PredictionResults
        } else {
            return false
        }

    }


    cantSalesProjection( requestForm: RegressionForm ): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders( {
            'ContentType': 'application/json',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": '*',
        } );

        headers.set( 'Content-Type', 'application/json' )
        headers.set( 'Accept', 'application/json' )
        headers.set( 'Access-Control-Allow-Origin', 'localhost:4200' )
        
        console.log( headers)

        this
        return this._http.get(`${this.APIurl}/predictions/sales-cant?table=${requestForm.table}&product=${requestForm.product}&months=${requestForm.months}`, {headers: headers}).pipe(
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

    monthSalesProjection( requestForm: InverseRegForm ): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders( {
            'ContentType': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        } );

        return this._http.get(`${this.APIurl}/api/predictions/sales-month?table=${requestForm.table}&product=${requestForm.product}&cant=${requestForm.cant}`).pipe(
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


    projectionByStats( requestForm: PredictionForm ): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders( {
            'ContentType': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        } );
        console.log( requestForm );
        let body = {
            "table":requestForm.table,
            "product":requestForm.product,
            "test_size":requestForm.test_size,
            "window_size":requestForm.window_size
        }
        
        return this._http.post(`${this.APIurl}/predictions/sales-stats`, body )
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


    makeARIMAPrediction( requestForm: PredictionForm ): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders( {
            'ContentType': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        } );
        console.log(requestForm);
        
        return this._http.get(`${this.APIurl}/predictions/sales-seasonal?table=${requestForm.table}&product=${requestForm.product}&test_size=${requestForm.test_size}` )
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
}
