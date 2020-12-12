import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { ErrorAlertModel, MessageAlertModel, PreguntaAlertaModel } from './alerts.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertaPopupComponent } from './alerta-popup/alerta-popup.component';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { config } from 'process';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class AlertService {
    
    messageAlert$ = new Subject<MessageAlertModel>()
    requestAlert$ = new Subject<MessageAlertModel>()
    errorAlert$ = new Subject<ErrorAlertModel>()
    responseAlert$ = new Subject<boolean>()

    

    constructor (
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private fs: AngularFirestore
    ) { }

    // Función que envía un mensaje de alerta
    // y espera la confirmación de la lectura del usuario
    sendMessageAlert(message: MessageAlertModel | string): Observable<any> {
        var msgModel: MessageAlertModel =
            typeof message != 'string' ?  message :
                new MessageAlertModel( message, 'mensaje' )
        
        if (!msgModel.trueMsg) msgModel.trueMsg = 'aceptar'

        this.dialog.open( AlertaPopupComponent, {
            minWidth: '450px',
            data: msgModel,
            role:'alertdialog'
        })
        
        return this.responseAlert$
    }


    // Función que envía una pregunta como alerta
    // y espera la respuesta true o false del usuario
    sendRequestAlert( request: MessageAlertModel | string ): MatDialogRef<AlertaPopupComponent> {
        
        var preguntaModel: MessageAlertModel = 
            typeof request != 'string' ? request :
                new MessageAlertModel(request, 'pregunta')

        if (!preguntaModel.trueMsg) preguntaModel.trueMsg = 'aceptar'
        if ( !preguntaModel.falseMsg ) preguntaModel.falseMsg = 'cancelar'
        
        var dialog = this.dialog.open( AlertaPopupComponent, {
            minWidth: '450px',
            data: preguntaModel,
            role: 'alertdialog',
            disableClose: true
        } )
        
        // this.requestAlert$.next(preguntaModel)

        return dialog
    }

    


    sendFloatNotification(
        notification: string,
        confirmText?: string,
        duration?: number,
        vPosition?: 'top' | 'bottom' ,
        hPosition?: 'start' | 'center' | 'end' | 'left' | 'right' 
    ) {

        confirmText = confirmText ? confirmText : 'ok';
        let config: MatSnackBarConfig = {
            duration: duration ? duration : 30000,
            verticalPosition: vPosition ? vPosition : 'bottom',
            horizontalPosition: hPosition ? hPosition : 'right',
            panelClass:['snackBar']
        }

        this.snack.open( notification, confirmText, config)
    }


    sendError( mensaje: string, error: string ) {
        const alert = new ErrorAlertModel(mensaje, error)
        this.dialog.open( ErrorPopupComponent, {
            width: '400px',
            data: alert
        } )
    }
    
    

    
}