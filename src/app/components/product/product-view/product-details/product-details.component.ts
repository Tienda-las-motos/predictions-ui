import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ProductModel, buy_stats, product_stats, time_stats, sell_stats } from 'src/app/models/product.model';
import { CacheService } from 'src/app/services/cache.service';
import { Loading } from 'src/app/services/loading/loading.service';
import { ProductsService } from 'src/app/services/products.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { SellStats } from '../../../../models/product.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    product: ProductModel
    
    tableId: string

    constructor (
        private _products: ProductsService,
        private _route: ActivatedRoute,
        private _loading: Loading,
    ) {
        this.product = new ProductModel( '', '', '', buy_stats, product_stats, sell_stats, time_stats, '')
        
        this._loading.toggleWaitingSpinner( true )
        this._products.loadProduct$
            .pipe(distinctUntilChanged())
            .subscribe( id => {
                this._products.getProduct( id )
                    .then( product => this.product = product )
                // console.log( this.product )
            })

        this._loading.colectRouteData().subscribe( data => {
            let id = data.params[ 'product' ]
            this._products.loadProduct$.next( id )
            this.tableId = data.params['table']
        })
        this._loading.toggleWaitingSpinner(false)
    }

    async ngOnInit() {
        
    }


    loadMonthDetails() {
        this._loading.toggleWaitingSpinner(true)
        this._products.getMonthDetails( this.tableId, this.product.code )
            .subscribe( result => {
                this._loading.toggleWaitingSpinner(false)
                this.product = result
            } )
    }

}
