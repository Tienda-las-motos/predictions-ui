import { Component, OnInit } from '@angular/core';
import { Loading } from '../../services/loading/loading.service';

@Component({
    selector: 'app-predictions',
    templateUrl: './predictions.component.html',
    styleUrls: ['./predictions.component.scss'],
})
export class PredictionsComponent implements OnInit {
    
    productId
    tableId
    constructor (
        private _loading: Loading
    ) {
        this._loading.colectRouteData().subscribe( data => {
            this.productId = data.params[ 'product' ]
            this.tableId = data.params[ 'table']
        })
     }

    ngOnInit(): void { }
    
}
