import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatTab, MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tabSelected = 3;
  tabName = "tab3";

  index = 2

  constructor(private authService : AuthService, private router: Router, private afAuth: AngularFireAuth) { 

    // get data to see what program use is in or not in any and set these values 
    this.tabSelected = 2;
    this.tabName = "tab2";
    this.index = 1
   
  }

  ngOnInit(): void {}

  getSelectedIndex(): number {

    return this.index
}

  async openSettings(){
    this.router.navigate(['settings']);
  }

  async onTabChange(event: MatTabChangeEvent) {
    console.log("yoyo: " + event.tab);
    console.log("here is the event: " + event)
    this.tabName = event.tab.textLabel;   
    

    switch(this.tabName) { 
      case "tab1": { 
        this.tabSelected = 1
        this.index = 0
        break; 
      } 
      case "tab2": { 
        this.tabSelected = 2
        this.index = 1
        break; 
      } 
      case "tab3": { 
        this.tabSelected = 3
        this.index = 2
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
