import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstimatedResults } from 'src/app/models/predictions.model';

@Component({
    selector: 'app-estimated',
    templateUrl: './estimated.component.html',
    styleUrls: ['./estimated.component.scss'],
})
export class EstimatedComponent implements OnInit {

    form: FormGroup;

    results: EstimatedResults = {
        avg_for_sell: 0,
        error_mean: 0,
        months_predicted: 0,
        total_predicted: 0,
    }

    constructor (
        public _formBuilder: FormBuilder
    ) {
        this.form = _formBuilder.group( {
            'test_size': [ 20, Validators.required ],
            'window_size': [ 2, Validators.required]
        })
    }

    ngOnInit(): void {}
}
