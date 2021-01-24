import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { LoginButtonComponent, LoginButtonDialog } from './components/login-button/login-button.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { ColorThemeModule } from '../color/color-theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';



@NgModule({
  declarations: [
    LoginButtonComponent,
    LoginButtonDialog,
    LoginCardComponent,
    RestorePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ColorThemeModule,
  ],
  exports: [
    LoginButtonComponent,
    LoginCardComponent,
  ],
  entryComponents: [
    LoginButtonDialog
  ]
})
export class GdevLoginModule { }
