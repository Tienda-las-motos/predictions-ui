import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { ProductBlankComponent } from './components/product/product-blank/product-blank.component';
import { ProductDetailsComponent } from './components/product/product-view/product-details/product-details.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { TablesComponent } from './components/tables/tables.component';


const routes: Routes = [
    {path: '', pathMatch:'full', redirectTo:'dashboard'},
    {path: 'dashboard', component:DashboardComponent, children: [
        { path: '', component:ProductBlankComponent},
        { path: 'table/:table', component: TablesComponent, children: [
            { path: '', component:ProductBlankComponent},
            { path: 'product/:product', component: ProductViewComponent, children: [
                { path:'', pathMatch:'full',redirectTo:'detalles'},
                { path: 'detalles', component: ProductDetailsComponent },
                { path: 'predicciones', component: PredictionsComponent },
                { path: 'proveedores', component: ProveedoresComponent },
                { path: 'proveedores/:prov', component: ProveedoresComponent },
            ]}
        ]},
    ]
    },
    { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
