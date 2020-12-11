import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel, ProductStats, TimeStats } from 'src/app/models/product.model';
import { TextService } from 'src/app/services/gdev-text.service';

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
    activeLink = this.sections[0]

    constructor (
        public text_: TextService,
        private _route: ActivatedRoute
    ) {
        this.product = new ProductModel('', '', this.stats);
    }

    ngOnInit(): void {
        this.product.name = 'Balatas'
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
        return this.text_.stringifyDate(this.time_data.first_sale_date)
    }
    get lastDate() {
        return this.text_.stringifyDate(this.time_data.last_sale_date)
    }
}
