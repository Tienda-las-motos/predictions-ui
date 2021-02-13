import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProveedorModel, ProvResult } from 'src/app/models/proveedores.model';
import { Loading } from 'src/app/services/loading/loading.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ProvRequest } from '../../../models/proveedores.model';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/services/cache.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.scss']
})
export class ProveedorFormComponent implements OnInit {

  table: string
  productId: string
  product: ProductModel
  provider: Observable<ProveedorModel>
  providerName: string

  provForm: FormGroup;
  providerControl: FormControl = new FormControl('', [Validators.required])
  conditionControl: FormControl = new FormControl( '', [ Validators.required ] )
  descControl: FormControl = new FormControl( '', Validators.required )
  stockControl: FormControl = new FormControl( '', )
  buyPriceControl: FormControl = new FormControl( '', Validators.required)
  salePriceControl: FormControl = new FormControl( '', Validators.required)

  

  constructor (
    private _fb: FormBuilder,
    private _proveedores: ProveedoresService,
    private _loading: Loading,
    private _router: Router,
    private _cache: CacheService,
    private _alert: AlertService, 
    private _products: ProductsService
  ) {
    
    this._loading.colectRouteData().subscribe( data => {
      this.productId = data.params[ 'product' ]
      this.table = data.params[ 'table' ]
      
      if ( data.params[ 'prov' ] ) {
        this.providerName = data.params[ 'prov' ]
        let providerPath = `tables/${ this.table }/products/${ this.productId }/providers_offers/${ this.providerName }`
        this._cache.updateData('providerPath', providerPath)
        this.provider = this._proveedores.getCurrent( providerPath )
        this.provider.subscribe( data => {
          console.log( data )
          if ( data ) this.provForm.setValue(data.query)
        })
      }
    } )
    
    this.provForm = this._fb.group( {
      'provider': this.providerControl,
      'condition': this.conditionControl,
      'desc': this.descControl,
      'stock': this.stockControl,
      'buy_price': this.buyPriceControl, 
      'sale_price': this.salePriceControl,
      'table': '',
      'product': ''
    })
   }

  async ngOnInit() {
    this.product = await this._products.getProduct( this.productId )
    console.log( this.product )
    this.buyPriceControl.setValue( this.product.buy_stats.suggest_buy_price )
    this.salePriceControl.setValue( this.product.sell_stats.suggest_sale_price)
  }


  evaluate() {
    const request: ProvRequest = {
      table: this.table,
      product: this.productId,
      provider: this.providerControl.value,
      condition: this.conditionControl.value,
      desc: this.descControl.value,
      stock: this.stockControl.value,
      buy_price: this.buyPriceControl.value, 
      sale_price: this.salePriceControl.value
    }

    const currentRoute = this._cache.getDataKey('currentRoute')
    this._loading.toggleWaitingSpinner(true)
    this._proveedores.evaluateProveedor( request )
      .subscribe( () => {
        this._loading.toggleWaitingSpinner(false)
        if ( !this.providerName ) 
        this._router.navigate(['/dashboard/'+currentRoute+'/proveedores/', request.provider])
      }, error => {
          this._loading.toggleWaitingSpinner( false )
          this._alert.sendError( 'Error en el servidor', error.message )
          console.error(error.error)
      })
    
  }

}
