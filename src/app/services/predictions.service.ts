import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  PredictionResults,
  PredictionForm,
  RegressionForm,
  InverseRegForm,
} from '../models/predictions.model';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError, first } from 'rxjs/operators';
import { ApiResponse } from '../models/response.model';
import { AlertService } from './alerts/alert.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Loading } from './loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  APIurl: string = environment.apiURL;
  constructor(
    private _fs: AngularFirestore,
    private _http: HttpClient,
    private _alert: AlertService,
    private _loading: Loading
  ) {}

  async getLastPrediction(
    table: string,
    product: string,
    type: 'estimated' | 'arima'
  ): Promise<PredictionResults | false> {
    const docRef = this._fs.doc(
      `tables/${table}/products/${product}/predictions/${type}`
    ).ref;
    const document = await docRef.get();
    if (document.exists) {
      return document.data() as PredictionResults;
    } else {
      return false;
    }
  }

  async cantSalesProjection(requestForm: RegressionForm): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({
      ContentType: 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Origin', 'localhost:4200');

    console.log(headers);

    this._loading.toggleWaitingSpinner( true );
    return this._http
      .get(
        `${this.APIurl}/predictions/sales-cant?table=${requestForm.table}&product=${requestForm.product}&months=${requestForm.months}`,
        { headers: headers }
      )
      .pipe(
        first(),
        map( response =>  this._handelResponse(response) ),
        catchError( error =>  this._handleError(error) ),
      ).toPromise()
  }

  async monthSalesProjection(requestForm: InverseRegForm): Promise<any> {
    this._loading.toggleWaitingSpinner(true);
    return this._http
      .get(
        `${this.APIurl}/predictions/sales-months?table=${requestForm.table}&product=${requestForm.product}&cant=${requestForm.cant}`
      )
      .pipe(
        first(),
        map( response =>  this._handelResponse(response) ),
        catchError( error =>  this._handleError(error) ),
      ).toPromise()
  }

  async projectionByStats( requestForm: PredictionForm ): Promise<any> {
    this._loading.toggleWaitingSpinner(true);
    console.log(requestForm);
    let body = {
      table: requestForm.table,
      product: requestForm.product,
      test_size: requestForm.test_size,
      window_size: requestForm.window_size,
    };

    return this._http.post(`${this.APIurl}/predictions/sales-stats`, body).pipe(
      first(),
      map( response =>  this._handelResponse(response) ),
        catchError( error =>  this._handleError(error) ),
    ).toPromise()
  }

  async makeARIMAPrediction(requestForm: PredictionForm): Promise<any> {
    this._loading.toggleWaitingSpinner(true);
    console.log(requestForm);

    return this._http
      .get(
        `${this.APIurl}/predictions/sales-seasonal?table=${requestForm.table}&product=${requestForm.product}&test_size=${requestForm.test_size}`
      )
      .pipe(
        first(),
        map( response =>  this._handelResponse(response) ),
        catchError( error =>  this._handleError(error) ),
      ).toPromise()
  }

  private _handelResponse(response) {
    this._loading.toggleWaitingSpinner( false )
    console.log( response )
    return response
  }

  private _handleError(error: any) {
    this._loading.toggleWaitingSpinner(false);
    console.error( error );
    let title = 'Disculpa. Hubo un error al hacer los cálculos';
    if ( error.status === 404 ) title = 'La solicitud realizada no se reconoce en el servidor'

    Swal.fire({
      icon: 'error', title,
      text: error.error?.message || error.message || JSON.stringify(error),
    } );
    return throwError(error);
  }
}
