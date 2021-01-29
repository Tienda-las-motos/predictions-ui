import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel, ProductStats, TimeStats } from 'src/app/models/product.model';
import { TextService } from 'src/app/services/gdev-text.service';
import { Loading } from 'src/app/services/loading/loading.service';
import { ProductsService } from 'src/app/services/products.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {

    product: ProductModel;
    time_data: TimeStats = {
        first_sale: new Date(),
        last_sale: new Date(),

    }
    stats: ProductStats = {}

    sections: string[] = [ 'detalles', 'predicciones', 'proveedores' ]
    activeLink = this.sections[ 0 ]
    
    tableId: string
    productId: string

    constructor (
        public text_: TextService,
        private _loading: Loading,
        private _products: ProductsService,
        private _router: Router,
        private _cache: CacheService
    ) {
        this.product = new ProductModel( '', '','',{}, {}, {}, {}, '' );
        
        this._products.loadProduct$
            .pipe(distinctUntilChanged())
            .subscribe( id => {
                this.productId = id
                this._products.getProduct( this.productId )
                .then( product => this.product = product )
            })
        this._loading.colectRouteData().subscribe( data => {
            let id = data.params[ 'product' ]
            this._products.loadProduct$.next( id )
            this.tableId = data.params[ 'table']
            let currentRoute = `table/${this.tableId}/product/${id}`
            this._cache.updateData('currentRoute', currentRoute)
        })
    }

    ngOnInit(): void {
        this.getActiveLink()
    }

    getActiveLink() {
        var enpoint = window.location.href.slice(
            window.location.href.lastIndexOf('/') + 1
        );
        // console.log( enpoint );
        return enpoint

    }

    get firstDate() {
        let date = this.product.time_stats.first_sale
        return date ? this.text_.stringifyDate(date) : ''
    }
    get lastDate() {
        let date = this.product.time_stats.last_sale
        return date ? this.text_.stringifyDate(date) : ''
    }

    goBack() {
        this._router.navigate([`/dashboard/table/${this.tableId}`])
    }
}
