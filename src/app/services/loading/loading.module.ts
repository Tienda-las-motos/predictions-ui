import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { WaitingBarComponent } from './components/waiting-bar/waiting-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [
    LoadingComponent,
    WaitingBarComponent,
    LoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], exports: [
    LoadingComponent,
    WaitingBarComponent,
    LoadingOverlayComponent
  ]
})
export class LoadingModule { }
