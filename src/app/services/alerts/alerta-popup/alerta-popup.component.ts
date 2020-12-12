import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageAlertModel, PreguntaAlertaModel } from '../alerts.model';

@Component({
  selector: 'gdev-alerta-popup',
  templateUrl: './alerta-popup.component.html',
  styleUrls: ['./alerta-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertaPopupComponent implements OnInit {

  constructor (
    public dialog: MatDialogRef<AlertaPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public alerta: MessageAlertModel
  ) {
   }

  ngOnInit(): void {  
  }

}
