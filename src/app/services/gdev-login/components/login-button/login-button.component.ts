import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LoginService } from '../../login.service';
import { CacheService } from '../../../cache.service';

@Component({
  selector: 'gdev-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {
  private agente = null;
  @Output() isLogged: EventEmitter<any> = new EventEmitter()
  constructor(
    public dialog: MatDialog,
    public _login: LoginService,
    private _cache: CacheService
  ) { }

  ngOnInit() {
    this._login.user$.pipe().subscribe( user => {
      if ( user )
      {
        this.isLogged.emit( user )
        this._cache.updateData('user', user)
      }
      
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginButtonDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this._login.googleSingIn().then( res => {
        console.log( 'se autenticó' )
      })
    });
  }
  

}

@Component({
  selector: 'aSmart-login-button-dialog',
  templateUrl: './login-button-dialog.html'
})
export class LoginButtonDialog {

  constructor(
   public dialogRef: MatDialogRef<LoginButtonDialog>,
   ) {}

  onClick(): void {
    this.dialogRef.close();
  }

}
