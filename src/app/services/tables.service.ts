import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, throwError, of, Subject } from 'rxjs';
import { map, catchError, switchMap, tap, first } from 'rxjs/operators';
import { ApiResponse } from '../models/response.model';
import { Loading } from './loading/loading.service';
import { CacheService } from './cache.service';
import { AlertService } from './alerts/alert.service';
import { ProductItemList } from '../models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { TableData } from '../models/table.model';
import { environment } from '../../environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  APIurl: string = environment.apiURL;
  tables$: Observable<TableData[]>;
  tableList$: Observable<ProductItemList[]>;
  tableLoaded$: Subject<any> = new Subject();

  public headerMap: Map<string, string> = new Map()
  public headerIndexMap: Map<string, number> = new Map()
  private csvRecordsArray: string[] = []
  public requiredColumns: string[] = []
  public fileHeaders: string[] = []
  public unknownHeaders: string[] = []

  constructor(
    private _http: HttpClient,
    private _loading: Loading,
    private _cache: CacheService,
    private _alert: AlertService,
    private _fs: AngularFirestore,
    private _storage: AngularFireStorage
  ) {
    this.loadCurrentTableList();
    this.getTables();
  }
  
  public async validateColumns( file: File ) {
    let reader = new FileReader();
    
    try {
      if ( !file.type.includes( 'csv' ) ) {
        throw {
          message: 'El archivo no tiene el formato CSV.'
        }
      } 
    
      return new Promise( ( resolve, reject ) => {
        reader.readAsText(file)
    
        reader.onload = async () => {
          let csvData = reader.result as string;
          this.csvRecordsArray = csvData.split( /\r\n|\n/ );
          
          this.fileHeaders = ( this.csvRecordsArray[ 0 ] ).split( ',' );
          if ( this.fileHeaders.length < this.requiredColumns.length ) {
            console.log( this.fileHeaders,  )
            reject( {
              message: `
                Número insuficiente de columnas <br>
                o el archivo no es un CSV separado por comas <br><br>
                <b>Primer fila del archivo</b> <br>
                <code>${JSON.stringify(this.fileHeaders)}</code>
              ` } )
          }

          if ( this.fileHeaders.filter( key => !key ).length > 2 )
            reject( {
              message: `
                Demasiadas columnas vacías <br>
                o el archivo no inicia la primera fila con los nombres de las columnas <br><br>
                <b>Primer fila del archivo</b> <br>
                <code>${JSON.stringify(this.fileHeaders)}</code>
              `} )
          
          this.unknownHeaders = [...this.fileHeaders]
          this.requiredColumns.forEach( header => {
            let fileIndex = this.fileHeaders.indexOf( header )
            
            if ( this.fileHeaders.includes( header ) ) {
              this.headerMap.set( header, header )
              this.headerIndexMap.set( header, fileIndex )
              this.unknownHeaders.splice(fileIndex, 1)
            } 
          })

          resolve(this.fileHeaders)
        };
  
        reader.onerror = () => {
          let message = 'Ocurrió un error mientras se leía el archivo'
          // console.error( message );
          reject({message})
        };
      })  
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.message
      } )
      // throw error
    }
  }

  get headerMapComplete() {
    return this.headerMap.size == this.requiredColumns.length
  }

  async prepareDoc() {
    try {
      this.csvRecordsArray.splice( 0, 1 )
      let columns = [...this.headerIndexMap.keys()]
      this.requiredColumns.forEach( header => { 
        if ( !columns.includes( header ) ) 
          throw {
            message: `
              Hace falta la columna ${header}. No se puede continuar
          `}
      })
      
      let registList: any[] = []
      await this._loading.asyncForEach( this.csvRecordsArray,
        async ( row: string, index: number ) => {
          let splitedRow = row.split( ',' );

          if ( splitedRow.length >= this.requiredColumns.length ) {
            let regist = {}
            this.requiredColumns.forEach( column => {
              let value = splitedRow[ this.headerIndexMap.get( column ) ]
              
              if ( !value ) {
                throw { message: `
                  No se encontró el valor de ${column} en la fila ${index + 2}. <br>
                  Esto podría ocasionar problemas. Por favor intente corregirlo
                `}
              } else {
                
                regist[ column ] = value
              }

            } )

            regist = await this.quarryMargin(splitedRow, regist, index)
            registList.push(regist)
          }
            
        } )
      
      const file = await this.createFile(registList)
      return await this.uploadTable( file ).pipe( first() ).toPromise()

    } catch ( error ) {
      console.error(error);
      
      throw error;
    }
  }

  private async quarryMargin(cells: string[], regist: any, rowIndex: number) {
    try {
      let cost = +cells[ this.headerIndexMap.get( 'Total Costo' ) ]
      let sale = +cells[ this.headerIndexMap.get( 'Ventas' ) ]
      let margin = sale - cost
      let percent = ( margin / cost )
    
      regist[ 'Margen Monto' ] = margin
      regist[ 'Margen Porcentaje' ] = parseFloat( percent.toFixed( 2 ) )
    
      return regist
    } catch (error) {
      throw {
        message: `Error al tratar de sacar el margen en la fila ${ rowIndex + 2} <br>
        ${error}
      `}
    }
  }

  private async createFile(list: any[]) {
    try {
      let moment = ( new Date() ).toLocaleDateString( 'es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      } )
      
      const ExportOptions = {
        fieldSeparator: ',',
        quoteStrings: '',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: false,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        filename: 'Data registrada: '+moment,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };
  
      const csvExporter = new ExportToCsv( ExportOptions );
    
      // csvExporter.generateCsv( registList )
    
      const csv = csvExporter.generateCsv( list, true )
      const blob = new Blob( [ csv ], { "type": "text/csv;charset=utf8;" } );
      const file = new File( [ blob ], 'Data registrada: ' + moment )
      return file
    } catch (error) {
      console.error(error);
      throw {
        message: `Error al crear el archivo <br>
        ${JSON.stringify(error)}
      `}
    }
  }

  uploadTable(file): Observable<any> {
    let formData = new FormData();
    formData.append('dataset', file);

    var headers: HttpHeaders = new HttpHeaders({
      ContentType: 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    });

    return this._http
      .post(this.APIurl + '/file', formData, { headers: headers })
      .pipe(
        map((response: ApiResponse) => {
          if (response.status === 201) {
            this._cache.updateData('currentTable', response.result);
          } else {
            this._alert.sendMessageAlert(response.message);
          }
          return response.result;
        })
      );
  }

  loadCurrentTableList() {
    this.tableList$ = this._cache.listenForChanges('currentTable').pipe(
      switchMap((result) => {
        return result ? of(result['product_list'].data) : of([]);
      })
    );
  }

  getTables() {
    this.tables$ = this._fs
      .collection<TableData>('tables')
      .valueChanges()
      .pipe(switchMap((list) => (list.length > 0 ? of(list) : of([]))));
  }

  getTable(tableId): Observable<any> {
    return this._http.get(`${this.APIurl}/table?id=${tableId}`).pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse) => {
        if (response.status === 200) {
          this._cache.updateData('currentTable', response.result);
        } else {
          this._alert.sendMessageAlert(response.message);
        }
        return response.result.data;
      }),
      catchError((error) => throwError(error))
    );
  }

  deleteTable(tableId: string) {
    console.log('deleting table ' + tableId);
    // this._storage.ref('').
    // this._storage.storage.ref().child(`tables/${ tableId }/`).delete()
    this._fs.doc(`tables/${tableId}`).delete();
  }
}
