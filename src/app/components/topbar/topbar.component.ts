import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/gdev-login/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor (
    public login_: LoginService
  ) { }

  ngOnInit(): void {
    // this.login_.user$.subscribe(user => console.log(user))
  }

}
