import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { ProductDetailsComponent } from './components/product-view/product-details/product-details.component';


const routes: Routes = [
    {path: '', pathMatch:'full', redirectTo:'dashboard'},
    {path: 'dashboard', component:DashboardComponent, children: [
        {path:'', pathMatch:'full',redirectTo:'detalles'},
        { path: 'detalles', component: ProductDetailsComponent },
        { path: 'predicciones', component: PredictionsComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
