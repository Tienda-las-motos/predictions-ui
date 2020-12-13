import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableData } from 'src/app/models/table.model';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { TablesService } from 'src/app/services/tables.service';
import { UploadTableComponent } from './upload-table/upload-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Loading } from 'src/app/services/loading/loading.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { CacheService } from '../../services/cache.service';

@Component({
    selector: 'app-tables-drawer',
    templateUrl: './tables-drawer.component.html',
    styleUrls: ['./tables-drawer.component.scss'],
})
export class TablesDrawerComponent implements OnInit {

    selected

    constructor (
        private _dialog: MatDialog,
        private _alerts: AlertService,
        private _loading: Loading,
        public tables_: TablesService,
        private _cache: CacheService,
        private _router: Router
    ) {
        this._loading.getRouteParams().subscribe( params => {
            this.selected = params[ 'table' ]
            let table = this._cache.getDataKey( 'currentTable' )
            if ( table[ 'data' ].doc_id !== this.selected ) {
                if ( this.selected ) {
                    console.log('getSelected')
                    this.tables_.getTable(this.selected).subscribe()
                }
            }
        })
    }


    async ngOnInit() {

    }
    
    selectTable( tableId ) {
        if ( this.selected !== tableId ) {
            this._loading.toggleWaitingSpinner(true)
            this.tables_.getTable( tableId ).subscribe( ( result: TableData ) => {
                this.selected = result.doc_id
                this.tables_.tableLoaded$.next()
                this._loading.toggleWaitingSpinner(false)
                this._alerts.sendMessageAlert( `Se cargaron ${ result.total_count } de la tabla ${ result.file_name }` )
                    .subscribe( () => {
                        console.log('Rediirje a ', `/dashboard/table/${ tableId }`)
                        this._router.navigate( [ `/dashboard/table/${ tableId }` ] )
                })
            })
        }
    }

    openUploadBox() {
        var dialog = this._dialog
            .open( UploadTableComponent, {
                width: '50%'
            } )

        dialog.afterClosed().subscribe( (result: TableData) => {
            if ( result ) {
                this._alerts.sendMessageAlert( `
                    Se extrajeron ${result.total_count} items del archivo ${result.file_name}
                `)
            }
        })
    }
}
