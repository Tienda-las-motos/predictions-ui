import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProveedorModel, ProvResult } from 'src/app/models/proveedores.model';
import { Loading } from 'src/app/services/loading/loading.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ProvRequest } from '../../../models/proveedores.model';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.scss']
})
export class ProveedorFormComponent implements OnInit {

  table: string
  product: string
  provider: Observable<ProveedorModel>
  providerName: string

  provForm: FormGroup;
  providerControl: FormControl = new FormControl('', [Validators.required])
  conditionControl: FormControl = new FormControl( '', [ Validators.required ] )
  descControl: FormControl = new FormControl( '', Validators.required )
  stockControl: FormControl = new FormControl( '', )

  

  constructor (
    private _fb: FormBuilder,
    private _proveedores: ProveedoresService,
    private _loading: Loading,
    private _router: Router,
    private _cache: CacheService,
  ) {
    
    this._loading.colectRouteData().subscribe( data => {
      this.product = data.params[ 'product' ]
      this.table = data.params[ 'table' ]
      if ( data.params[ 'prov' ] ) {
        this.providerName = data.params[ 'prov' ]
        let providerPath = `tables/${ this.table }/products/${ this.product }/providers_offers/${ this.providerName }`
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
      'table': '',
      'product': ''
    })
   }

  ngOnInit(): void {
  }


  evaluate() {
    const request: ProvRequest = {
      table: this.table,
      product: this.product,
      provider: this.providerControl.value,
      condition: this.conditionControl.value,
      desc: this.descControl.value,
      stock: this.stockControl.value
    }

    this._proveedores.evaluateProveedor( request )
    .subscribe( () => {
        if ( !this.providerName ) 
        this._router.navigate(['./'+request.provider])
      } )
    
  }

}
