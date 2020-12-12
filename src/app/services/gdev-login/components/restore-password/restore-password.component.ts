import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../../login.service';

@Component({
  selector: 'gdev-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  emailAccount:string
  constructor (
    public dialog: MatDialogRef<RestorePasswordComponent>,
    public loginS: LoginService
  ) { }

  ngOnInit(): void {
  }

}
