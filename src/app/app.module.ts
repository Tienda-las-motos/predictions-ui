import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './shared/firebase.module';
import { ComunesModule } from './shared/comunes.module';
import { MaterialModule } from './shared/material.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TablesDrawerComponent } from './components/tables-drawer/tables-drawer.component';
import { ProductsDrawerComponent } from './components/products-drawer/products-drawer.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductDetailsComponent } from './components/product-view/product-details/product-details.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { EstimatedComponent } from './components/predictions/estimated/estimated.component';
import { ArimaComponent } from './components/predictions/arima/arima.component';

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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
