import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from 'src/app/models/response.model';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { CacheService } from 'src/app/services/cache.service';
import { TablesService } from 'src/app/services/tables.service';
import { Loading } from '../../../services/loading/loading.service';

@Component({
    selector: 'app-upload-table',
    templateUrl: './upload-table.component.html',
    styleUrls: ['./upload-table.component.scss'],
})
export class UploadTableComponent implements OnInit {

    loadedFile:any

    constructor (
        private _loading: Loading,
        private _cache: CacheService,
        private _alert: AlertService,
        private _tables: TablesService,
        public dialog_: MatDialogRef<UploadTableComponent>,
    ) { }

    ngOnInit(): void { }

    catchFile(event) {
        this.loadedFile = event.target.files[ 0 ];
        // console.log(this.loadedFile);

    }

    upload() {
        this._loading.toggleWaitingSpinner( true )
        this._tables.uploadTable( this.loadedFile )
            .subscribe( (result) => this.dialog_.close(result.data) )
    }
}
