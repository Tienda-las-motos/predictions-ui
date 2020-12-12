import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/gdev-login/login.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    tableId: string
    constructor (
        private _route: ActivatedRoute,
        private _login: LoginService,
        private _router: Router
    ) {
        this.tableId = this._route.snapshot.params['table']
    }

    ngOnInit(): void {
        this._login.user$.subscribe( user => {
            if (!user) this._router.navigate(['/login']);
        })
    }
}
