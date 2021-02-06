import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tabSelected = 1;
  tabName = "tab1";

  constructor(private authService : AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {}

  async openSettings(){
    this.router.navigate(['settings']);
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

  async logOut() {
    

    try {
      await this.authService.LogOutUser();
      //window.alert("Sign out")
      this.router.navigate(["/welcome"]);
    }
    catch (e) {
      window.alert(e); 
    }
    finally {
      //window.alert("finallyyyy"); 
    }

  }

}
