import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from 'src/app/models/response.model';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { CacheService } from 'src/app/services/cache.service';
import { TablesService } from 'src/app/services/tables.service';
import { Loading } from '../../../../services/loading/loading.service';
import Swal from "sweetalert2";
import { MatHorizontalStepper } from '@angular/material/stepper';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-table',
  templateUrl: './upload-table.component.html',
  styleUrls: ['./upload-table.component.scss'],
})
export class UploadTableComponent implements OnInit {
  loadedFile: File;

  @ViewChild( 'stepper' ) stepper!: MatHorizontalStepper
  firstStepCtrl: FormControl = new FormControl( null, [ Validators.required])

  constructor(
    private _loading: Loading,
    private _cache: CacheService,
    private _alert: AlertService,
    public tables: TablesService,
    public dialog_: MatDialogRef<UploadTableComponent>
  ) {
    this.tables.requiredColumns = [
      "Fecha",
      "Codigo",
      "Descripcion",
      "Unidades",
      "Unitario Venta",
      "Ventas",
      "Unitario Costo", // Unitario Costo
      "Costos", // Costos
    ]
  }

  ngOnInit(): void {}

  async catchFile( event ) {
    try {
      await this.tables.validateColumns( event.target.files[ 0 ] )
      this.firstStepCtrl.patchValue(true)
      this.stepper.next()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        html: error.message
      } )
    }
  }

  async createFile() {
    this._loading.toggleWaitingSpinner(true);
    this.tables.prepareDoc().then(
      (result) => {
        this.dialog_.close(result.data);
        this._loading.toggleWaitingSpinner(false);
      } )
    // this.stepper.selected.a
  }

  upload() {
    this._loading.toggleWaitingSpinner(true);
    this.tables.uploadTable(this.loadedFile).subscribe(
      (result) => {
        this.dialog_.close(result.data);
        this._loading.toggleWaitingSpinner(false);
      }
      // error => {
      //     console.log( error )
      //     this._alert.sendError( 'Error al cargar el archivo: ', error )
      //     this._loading.toggleWaitingSpinner(false)
      // }
    );
  }
}
