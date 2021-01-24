import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Router } from '@angular/router';
import { Loading } from 'src/app/services/loading/loading.service';
import { CacheService } from 'src/app/services/cache.service';
import { ProveedorModel } from 'src/app/models/proveedores.model';
import { tap } from 'rxjs/operators';
import { TextService } from 'src/app/services/gdev-text.service';

@Component({
  selector: 'app-proveedores-drawer',
  templateUrl: './proveedores-drawer.component.html',
  styleUrls: ['./proveedores-drawer.component.scss']
})
export class ProveedoresDrawerComponent implements OnInit {

  selected
  providers: ProveedorModel[]
  constructor (
    public proveedores_: ProveedoresService,
    private _router: Router,
    private _loading: Loading,
    private _cache: CacheService,
    public text_: TextService
  ) {

    this.proveedores_.getProveedoresList()
      .pipe(tap(console.log))
      .subscribe( data => this.providers = data )
   }

  ngOnInit(): void {
  }

  selectProvider(provider: string) {
    if ( this.selected !== provider ) {
      this._loading.toggleWaitingSpinner( true )
      let currentRoute = this._cache.getDataKey( 'currentRoute' )
      console.log( currentRoute )
      this._router.navigate( [ '/dashboard/'+currentRoute+'/proveedores', provider ] )
      this.selected = provider
      this._loading.toggleWaitingSpinner(false)
    }
  }

}
