import { Pipe, PipeTransform } from '@angular/core';
import { TablesService } from '../services/tables.service';

@Pipe({
  name: 'synonymHeader',
  pure: false,
})
export class SynonymHeaderPipe implements PipeTransform {

  constructor (
    private _tables: TablesService
  ){}

  transform( value: string, ...args: unknown[] ): string | undefined {
    let synonymHeader = this._tables.headerMap.get( value );
    // console.log( synonymHeader )
    return synonymHeader
  }

}
