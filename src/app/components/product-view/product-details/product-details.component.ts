import { Component, OnInit } from '@angular/core';
import { AvgStats, ProductModel, ProductStats } from 'src/app/models/product.model';
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
            'sales_chart': ''
        }
    }
    constructor () {
      this.product = new ProductModel('','',this.stats, this.monthDetails)
   }

  ngOnInit(): void {
  }

}
