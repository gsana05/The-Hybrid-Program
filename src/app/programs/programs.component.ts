import { Component, OnInit } from '@angular/core';
import { fade, slideInOutVerticale, slideInOutHorizontal} from './../animations';
import { CreateUserAccount } from '../create-user-account/create-user-account.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  animations: [
    fade
  ]
})
export class ProgramsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async settingsPopUp(){
    this.dialog.open(CreateUserAccount, {width: '90%', height: '90%'})
  }

}
