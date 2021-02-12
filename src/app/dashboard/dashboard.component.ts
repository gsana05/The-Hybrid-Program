import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProgramsService } from '../programs.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatTab, MatTabChangeEvent} from '@angular/material/tabs';
import { User, FreeProgram, Message } from '../types';
import { FreeProgramComponent } from '../free-program/free-program.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  program : FreeProgram = {
    userId : "",
    enrolled : false,
    date : new Date()
  }

  tabSelected = 3;
  tabName = "tab3";
  index = 2

  hasOpenProgram = false; 
  userId: string | null = null;

  valueChanges : Subscription | undefined
  snapshotChanges : Subscription | undefined

  constructor(private authService : AuthService, private router: Router, private programService : ProgramsService, private afAuth: AngularFireAuth) { 

    this.afAuth.currentUser.then(user => {
      if(user != null){
        this.userId = user.uid
      }
    });

    // get data to see what program use is in or not in any and set these values 
    this.tabSelected = 1;
    this.tabName = "tab1";
    this.index = 0
  }

  ngOnInit(): void {
    
    this.valueChanges = this.programService.programs()?.subscribe(programs => {
      console.log("hereeee");
      programs.forEach(program => {
        //console.log("enrolled: " + program.enrolled + " date: " + program.date);
      })
    })

    //this.valueChanges?.unsubscribe()

    this.snapshotChanges = this.programService.testingPrograms()?.subscribe(programs => {
      programs.map(data => {
        this.hasOpenProgram = data.enrolled; 
        console.log("snapshot values: date: " + data.date + ". enrolled: " + data.enrolled + " id: " + data.userId);
      })
    })

    //this.snapshotChanges?.unsubscribe()

    const i = this.programService.testingPrograms()?.pipe()
    

  }

  getSelectedIndex(): number {
    return this.index
}

async joinFreeProgram(){
  
  try{
    if(this.userId != null){
      this.program.enrolled = true;
      this.program.date = new Date();
      await this.programService.joinFreePrgram(this.userId, this.program);
      window.alert("success");
    }
    
  }
  catch(e){
    window.alert(e); 
  }  

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
