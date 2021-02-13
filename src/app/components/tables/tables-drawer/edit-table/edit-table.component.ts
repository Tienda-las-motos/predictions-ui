import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableData } from 'src/app/models/table.model';
import { AlertService } from 'src/app/services/alerts/alert.service';

@Component( {
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: [ './edit-table.component.scss' ]
} )
export class EditTableComponent implements OnInit {

  nameControl: FormControl = new FormControl('', [Validators.required])

  constructor (
    public dialog_: MatDialogRef<EditTableComponent>,
    @Inject( MAT_DIALOG_DATA ) public tableData: TableData,
    private fs: AngularFirestore,
    private _alert: AlertService
  ) {
    this.nameControl.setValue(tableData.file_name)
   }

  ngOnInit(): void {
  }

  saveName() {
    this.fs.doc( `tables/${ this.tableData.doc_id }/` ).update( {
      file_name: this.nameControl.value
    } ).then( () => this.dialog_.close() )
      .catch( error => {
        this.dialog_.close()
        this._alert.sendError( 'No se pudo guardar el nombre de la tabla', error )
      } )
  }

}
