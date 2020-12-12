import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    tableId: string
    constructor (
        private _route: ActivatedRoute,
    ) {
        this.tableId = this._route.snapshot.params['table']
    }

    ngOnInit(): void {}
}
