import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PredictionResults, PredictionForm } from '../models/predictions.model';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ApiResponse } from '../models/response.model';
import { AlertService } from './alerts/alert.service';

@Injectable({
    providedIn: 'root',
})
export class PredictionsService {
    
    constructor (
        private _fs: AngularFirestore,
        private _http: HttpClient,
        private _alert: AlertService
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


    makeEstimatedPrediction( requestForm: PredictionForm ): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders( {
            'ContentType': 'application/json',
            'Access-Control-Allow-Origin': '*',
        } );
        console.log(requestForm);
        
        return this._http.post( 'api/predictions/estimated', requestForm, { headers } )
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
        } );
        console.log(requestForm);
        
        return this._http.post( 'api/predictions/arima', requestForm, { headers } )
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
