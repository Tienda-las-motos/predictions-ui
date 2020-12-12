import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel, ProductStats, TimeStats } from 'src/app/models/product.model';
import { TextService } from 'src/app/services/gdev-text.service';
import { Loading } from 'src/app/services/loading/loading.service';
import { ProductsService } from 'src/app/services/products.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {

    product: ProductModel;
    time_data: TimeStats = {
        first_sale_date: new Date(),
        last_sale_date: new Date(),
        period_in_days: 0
    }
    stats: ProductStats = {time_data: this.time_data}

    sections: string[] = [ 'detalles', 'predicciones' ]
    activeLink = this.sections[ 0 ]
    
    tableId: string
    productId: string

    constructor (
        public text_: TextService,
        private _loading: Loading,
        private _products: ProductsService,
        private _router: Router
    ) {
        this.product = new ProductModel( '', '', this.stats );
        
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
        
        return this.text_.stringifyDate(this.product.stats.time_data.first_sale_date)
    }
    get lastDate() {
        return this.text_.stringifyDate(this.product.stats.time_data.last_sale_date)
    }

    goBack() {
        this._router.navigate([`/dashboard/table/${this.tableId}`])
    }
}
