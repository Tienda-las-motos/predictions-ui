import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ArimaResults } from 'src/app/models/predictions.model';
import { PredictionsService } from '../../../services/predictions.service';
import { Loading } from '../../../services/loading/loading.service';
import {
  PredictionForm,
  PredictionResults,
} from '../../../models/predictions.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arima',
  templateUrl: './arima.component.html',
  styleUrls: ['./arima.component.scss'],
})
export class ArimaComponent implements OnInit {
  @Input() tableId: string;
  @Input() productId: string;

  form: FormGroup;
  testControl = new FormControl(20, [Validators.required]);

  results: PredictionResults = {
    avg_for_sell: 0,
    error_mean: 0,
    months_predicted: 0,
    total_predicted: 0,
    imgURL: '',
  };

  constructor(
    fb: FormBuilder,
    private _predictions: PredictionsService,
    private _loading: Loading
  ) {
    this.form = fb.group({
      test_size: [25, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLastPrediction();
  }

  async loadLastPrediction() {
    await this._predictions
      .getLastPrediction(this.tableId, this.productId, 'arima')
      .then((result) => {
        if (result) {
          this.results = result;
        }
      });
  }

  getTestError() {
    if (this.testControl.hasError('required')) {
      return 'Este valor es necesario';
    }
  }

  async makePrediction() {
    let request: PredictionForm = {
      test_size: this.form.value['test_size'],
      table: this.tableId,
      product: this.productId,
    };
    this.results = await this._predictions.makeARIMAPrediction(request);
  }
}
