import { Component, OnInit } from '@angular/core';
import { fade, slideInOutHorizontal } from './../animations';
import { CreateUserAccount } from '../create-user-account/create-user-account.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    fade,
    slideInOutHorizontal
  ]
})
export class AboutMeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async settingsPopUp(){
    this.dialog.open(CreateUserAccount, {width: '90%', height: '90%'})
  }

}
