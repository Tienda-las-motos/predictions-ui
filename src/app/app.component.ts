import { Component } from '@angular/core';
import { CacheService } from './services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'predictions-UI';
    constructor (
        private _cache: CacheService
    ) {
        this._cache.cacheTagName = 'predict-app'
        this._cache.storage = 'local'
    }
}
