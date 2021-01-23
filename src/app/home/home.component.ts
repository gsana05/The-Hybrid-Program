import { Component, OnInit } from '@angular/core';
import { fade, slideInOutHorizontal } from './../animations';
import { MatDialog } from '@angular/material/dialog';
import { SignUserIn } from '../sign-user-in/sign-user-in..component';
import { CreateUserAccount } from '../create-user-account/create-user-account.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fade,
    slideInOutHorizontal
  ]
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async settingsPopUp(){
    this.dialog.open(CreateUserAccount, {width: '90%', height: '90%'})
  }

}
