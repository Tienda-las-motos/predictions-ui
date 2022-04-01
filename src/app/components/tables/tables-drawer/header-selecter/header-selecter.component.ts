import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-header-selecter',
  templateUrl: './header-selecter.component.html',
  styleUrls: ['./header-selecter.component.scss']
})
export class HeaderSelecterComponent implements OnInit {

  @Input() requiredColumn

  constructor (
    public tables: TablesService
  ) { 
    
  }

  ngOnInit(): void {
  }

  onHeaderSelected(event: MatSelectChange) {
    let header = event.value
    if ( !this.tables.headerMap.get( this.requiredColumn ) ) {
      this.tables.headerMap.set( this.requiredColumn, header );
      let indexHeader = this.tables.fileHeaders.indexOf( header );
      this.tables.headerIndexMap.set(this.requiredColumn, indexHeader );
    }
  }

}
