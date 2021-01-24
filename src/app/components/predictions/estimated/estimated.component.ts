import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    windowControl = new FormControl( 2, [ Validators.required, Validators.min(2), Validators.max(10)])
    testControl = new FormControl( 20, [ Validators.required, Validators.min(1), Validators.max(100)])

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
            'test_size': this.testControl,
            'window_size': this.windowControl
        })
    }

    ngOnInit(): void {
        this.loadLastPrediction()
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

    getWindowError() {
        console.log(this.windowControl.errors)
        if (this.windowControl.hasError('required')) {
          return 'Este valor es necesario';
        }
    
        if ( this.windowControl.hasError( 'min' ) ) {
            return 'El valor mínimo debe ser 2'
        } else if ( this.windowControl.hasError( 'max' ) ) {
            return ' El valor máximo debe ser 10'
        }
      }
    getTestError() {
        console.log(this.testControl.errors)
        if (this.testControl.hasError('required')) {
          return 'Este valor es necesario';
        }
    
        if ( this.testControl.hasError( 'min' ) ) {
            return 'El valor mínimo debe ser 1'
        } else if ( this.testControl.hasError( 'max' ) ) {
            return ' El valor máximo debe ser 100'
        }
      }


    makePrediction() {
        this._loading.toggleWaitingSpinner( true )
        console.log(this.form.value )
        let request: PredictionForm = {
            test_size: this.form.value[ 'test_size' ],
            window_size: this.form.value[ 'window_size' ],
            table: this.tableId,
            product: this.productId
        }
        console.log(request);
        
        this._predictions.makeEstimatedPrediction( request )
            .subscribe( result => {
                this._loading.toggleWaitingSpinner( false )
                if (result) this.results = result
            })
    }
}
