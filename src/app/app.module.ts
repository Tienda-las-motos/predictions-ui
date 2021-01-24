import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoadingModule } from './services/loading/loading.module';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './shared/firebase.module';
import { ComunesModule } from './shared/comunes.module';
import { MaterialModule } from './shared/material.module';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TablesDrawerComponent } from './components/tables-drawer/tables-drawer.component';
import { ProductsDrawerComponent } from './components/products-drawer/products-drawer.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductDetailsComponent } from './components/product-view/product-details/product-details.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { EstimatedComponent } from './components/predictions/estimated/estimated.component';
import { ArimaComponent } from './components/predictions/arima/arima.component';
import { ProductBlankComponent } from './components/product-blank/product-blank.component';
import { UploadTableComponent } from './components/tables-drawer/upload-table/upload-table.component';
import { GdevAlertModule } from './services/alerts/gdev-alert.module';
import { TablesComponent } from './components/tables/tables.component';
import { GdevLoginModule } from './services/gdev-login/gdev-login.module';
import { LoginComponent } from './components/login/login.component';
import { SimplesComponent } from './components/predictions/simples/simples.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedorFormComponent } from './components/proveedores/proveedor-form/proveedor-form.component';
import { ProveedoresDrawerComponent } from './components/proveedores/proveedores-drawer/proveedores-drawer.component';

@NgModule({
    declarations: [
        AppComponent,
        TopbarComponent,
        DashboardComponent,
        TablesDrawerComponent,
        ProductsDrawerComponent,
        ProductViewComponent,
        ProductDetailsComponent,
        PredictionsComponent,
        EstimatedComponent,
        ArimaComponent,
        ProductBlankComponent,
        UploadTableComponent,
        TablesComponent,
        LoginComponent,
        SimplesComponent,
        ProveedoresComponent,
        ProveedorFormComponent,
        ProveedoresDrawerComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FirebaseModule,
        ComunesModule,
        MaterialModule,
        HttpClientModule,
        LoadingModule,
        GdevAlertModule,
        NgxMaskModule.forRoot(),
        GdevLoginModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
