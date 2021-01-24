import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaPopupComponent } from './alerta-popup/alerta-popup.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [
    AlertaPopupComponent,
    ErrorPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    AlertaPopupComponent
  ]
})
export class GdevAlertModule { }
