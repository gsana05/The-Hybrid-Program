import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { fade, slideInOutVerticale, slideInOutHorizontal} from './../animations';
import { MatDialog } from '@angular/material/dialog';
import { SignUserIn } from '../sign-user-in/sign-user-in..component';
import { CreateUserAccount } from '../create-user-account/create-user-account.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    fade,
    slideInOutVerticale,
    slideInOutHorizontal,
    trigger(
      'fadeItem', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('2s ease-out', style({ visibility: 'visible', opacity: 1 }))
          ]
        ),
         transition(
          ':leave', 
          [
            style({ opacity: 0 }),
            animate('2s ease-out', style({ visibility: 'visible', opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class WelcomeComponent implements OnInit {

  tabSelected = 1;
  tabName = "tab1";

  

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  async logInPopUp(){
    this.dialog.open(SignUserIn, {width: '80%', height: '60%'})
  }

  async onTabChange(event: MatTabChangeEvent) {
    this.tabName = event.tab.textLabel;   
    

    switch(this.tabName) { 
      case "tab1": { 
        this.tabSelected = 1
        break; 
      } 
      case "tab2": { 
        this.tabSelected = 2
        break; 
      } 
      case "tab3": { 
        this.tabSelected = 3
        break; 
     } 
      default: { 
         //statements; 
         break; 
      } 
   } 

  }

  /*
  navLinks = [
    {path: 'playarea', label: 'Play Area'},
    {path: 'about', label: 'About me'}
  ]
  */

}
