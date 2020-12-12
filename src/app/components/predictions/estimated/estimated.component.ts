import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PredictionForm, PredictionResults } from 'src/app/models/predictions.model';
import { Loading } from 'src/app/services/loading/loading.service';
import { PredictionsService } from 'src/app/services/predictions.service';

@Component({
    selector: 'app-estimated',
    templateUrl: './estimated.component.html',
    styleUrls: ['./estimated.component.scss'],
})
export class EstimatedComponent implements OnInit {

    @Input() tableId: string
    @Input() productId: string

    form: FormGroup;

    results: PredictionResults = {
        avg_for_sell: 0,
        error_mean: 0,
        months_predicted: 0,
        total_predicted: 0,
        imgURL:''
    }

    constructor (
        public _formBuilder: FormBuilder,
        private _predictions: PredictionsService,
        private _loading:Loading
    ) {
        this.form = _formBuilder.group( {
            'test_size': [ 20, Validators.required ],
            'window_size': [ 2, Validators.required]
        })
    }

    ngOnInit(): void {
        this.loadLastPrediction()
        console.log(this.productId, this.tableId);
        
     }
    
    async loadLastPrediction() {
        await this._predictions
            .getLastPrediction(this.tableId, this.productId, 'estimated')
            .then((result) => {
                if (result) {
                    this.results = result;
                }
            });
    }


    makePrediction() {
        this._loading.toggleWaitingSpinner(true)
        let request: PredictionForm = {
            test_size: this.form.value[ 'test_size' ],
            window_size: this.form.value[ 'window_size' ],
            table: this.tableId,
            product: this.productId
        }
        this._predictions.makeEstimatedPrediction( request )
            .subscribe( result => {
                this._loading.toggleWaitingSpinner( false )
                if (result) this.results = result
            })
    }
}
