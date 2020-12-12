import { Component, OnInit } from '@angular/core';
import { GdevLoginFields } from 'src/app/services/gdev-login/components/login-card/login-card.component';
import { LoginService } from 'src/app/services/gdev-login/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (
    private _login: LoginService
  ) { }

  ngOnInit(): void {
  }

  submit(datos: GdevLoginFields) {
    this._login.passwordLogin(datos.email, datos.password)
  }

  restore() {
    
  }

}
