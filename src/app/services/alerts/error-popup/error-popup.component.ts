import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorAlertModel } from '../alerts.model';

@Component({
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: ErrorAlertModel,
    public dialog: MatDialogRef<ErrorPopupComponent>
  ) { }

  ngOnInit(): void {
  }

}
