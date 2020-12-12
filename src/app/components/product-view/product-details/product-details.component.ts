import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvgStats, ProductModel, ProductStats } from 'src/app/models/product.model';
import { CacheService } from 'src/app/services/cache.service';
import { Loading } from 'src/app/services/loading/loading.service';
import { ProductsService } from 'src/app/services/products.service';
import { MonthDetails } from '../../../models/product.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    product: ProductModel
    avg_stats: AvgStats = {
        sold_units: 0,
        sales_quantity: 0,
        min_purch_price: 0,
        avg_purch_price: 0,
        avg_sell_price: 0,
        max_sell_price: 0,
        avg_margin: 0,
        max_margin: 0,
    }
    monthDetails: MonthDetails = {
        avgsales_per_month: 0,
        max_sales: 0,
        month_sales_chart: '',
    }
    stats: ProductStats = {
        avgs: this.avg_stats,
        files: {
            'chart': ''
        }
    }

    tableId: string

    constructor (
        private _products: ProductsService,
        private _route: ActivatedRoute,
        private _loading: Loading,
    ) {
        this.product = new ProductModel( '', '', this.stats )
        this._loading.colectRouteData().subscribe( data => {
            this.product.code = data.params[ 'product' ]
            this.tableId = data.params['table']
        })
    }

    async ngOnInit() {
        console.log( this.product.code )
        this._loading.toggleWaitingSpinner(true)
        this.product = await this._products.getProduct( this.product.code )
        this._loading.toggleWaitingSpinner(false)
    }


    loadMonthDetails() {
        this._loading.toggleWaitingSpinner(true)
        this._products.getMonthDetails( this.tableId, this.product.code )
            .subscribe( result => {
                this._loading.toggleWaitingSpinner(false)
                this.product.month_details = result
            } )
    }

}
