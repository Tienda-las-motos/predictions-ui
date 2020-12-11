import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArimaResults } from 'src/app/models/predictions.model';

@Component({
    selector: 'app-arima',
    templateUrl: './arima.component.html',
    styleUrls: ['./arima.component.scss'],
})
export class ArimaComponent implements OnInit {

    form: FormGroup;

    results: ArimaResults = {
        avg_for_sell: 0,
        months_predicted: 0,
        total_predicted: 0,
    }

    constructor (
        fb: FormBuilder,
    ) {
        this.form = fb.group( {
            'test_size': [ 25, Validators.required ],
        })
     }

    ngOnInit(): void {}
}
