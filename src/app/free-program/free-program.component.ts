import { Component, OnInit, Input, HostListener } from '@angular/core';
import { from } from 'rxjs';
import { VideoComponent } from '../video/video.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ProgramsService } from '../programs.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatTab, MatTabChangeEvent} from '@angular/material/tabs';
import { User, FreeProgram, Message, Cycles, Workout } from '../types';
import { Subscription } from 'rxjs';
import {loadStripe} from '@stripe/stripe-js';
import { environment} from '../../environments/environment';

import {StripeCheckoutLoader, StripeCheckoutHandler} from 'ng-stripe-checkout';
import {StripeCheckoutModule} from 'ng-stripe-checkout';
import { Session } from 'protractor';



@Component({
  selector: 'app-free-program',
  templateUrl: './free-program.component.html',
  styleUrls: ['./free-program.component.scss']
})


export class FreeProgramComponent implements OnInit {

  program : FreeProgram = {
    programId : "",
    userId : "",
    enrolled : false,
    date : new Date(),
    cycles :  Array<Cycles>(),
    currentCycleCount : 0,
    totalCompletedCycles : 0,
    totalCompletedSessions : 0,
    totalMissedSessions : 0
  }

 //stripe = require('stripe')('sk_test_51IMhDzHLz4JOaSbMAW5KbDpdw5vT4oxGzbGqgojiJhLg6btSOBlthQxeKHHgvYHICl1QDtLz2t31snljgUCmjokS00R5JI7ZIm');

  //stripePromise = loadStripe(environment.stripe_key);
  //priceId = "price_1IN1kKHLz4JOaSbM5OtkxEdd"

  url: string | undefined;
  userId: string | null = null;
  snapshotChanges : Subscription | undefined; 

  //StripeCheckout: StripeCheckoutStatic | undefined;

  //@Input() amount: any;
  //@Input() description: any;
  

  //handler: any;

  //confirmation: any;
  //loading = false;

  //quantity = 1;

  //private stripeCheckoutHandler: StripeCheckoutHandler | undefined;


  constructor(private dialog: MatDialog, private authService : AuthService, private router: Router, private programService : ProgramsService, private afAuth: AngularFireAuth) { 
  
    this.afAuth.currentUser.then(user => {
      if(user != null){
        this.userId = user.uid
      }
    });

    this.snapshotChanges = this.programService.testingPrograms()?.subscribe(programs => {
      programs.map(data => {
        //window.alert("doc id: " + data.programId)
        this.program = data 
      })
    });

    /*
    this.handler = StripeCheckout.configure({
      key: environment.stripe_key,
      image: '../../assets/images/weights.jpg',
      locale: 'auto',
      token : token  => {

        //this.stripe.charge(100, 'usd', token.id )
        //need to get the token first then send this back to stripe to charge the card
        console.log("the token:" + token.id);
      }    
    });
    */
  
  }

  ngOnInit(): void {
    
  }

   // Open the checkout handler
   /*
   async checkout() {
    
    this.handler.open({
      name: 'Fireship Store',
      description: this.description,
      amount: 10,
      email: "Testing@email.com",
    });

    
  }
  */

  // Close on navigate
  /*
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
  */

  async updateWorkout(sessionNumber : number, sessionType : number, workoutStatus : Boolean){

    try{
      if(this.userId != null){
        if(this.program.programId != null){

          var openCycle : Cycles = {
            cycleId : 0,
            sessionTrackerMissed : Array(),
            sessionTrackerCompleted :  Array()
        }

          // find the current open cycle 
          
          this.program.cycles.forEach(data => {
            if(data.cycleId == this.program.currentCycleCount){
              openCycle = data 
            }
          })   


          var currentOpenCompleted = null;
          openCycle.sessionTrackerCompleted.forEach(dataCompleted => {
            if(dataCompleted.sessionNumber == sessionNumber){
              currentOpenCompleted = true; 
            }
          })

          var currentOpenMissed = null;
          openCycle.sessionTrackerMissed.forEach(dataMissed => {
            if(dataMissed.sessionNumber == sessionNumber){
              currentOpenMissed = true; 
            }
          })

          if(currentOpenCompleted == true){
            window.alert("You have already completed this sesssion");
          }
          else if(currentOpenMissed == true){
            window.alert("You have set this session to missed");
          }
          else {

            const workout : Workout = {
              date : new Date(),
              sessionNumber : sessionNumber,
              sessionType : sessionType
            } 
            
            if(workoutStatus == true){
              this.program.totalCompletedSessions = this.program.totalCompletedSessions + 1
              openCycle.sessionTrackerCompleted?.push(workout)

            }
            else{
              this.program.totalMissedSessions = this.program.totalMissedSessions + 1
               openCycle.sessionTrackerMissed?.push(workout)
            }
            
            await this.programService.updateFreeProgram(this.userId, this.program);
            window.alert("success");

          }
      
        }
        else{
          window.alert("program id is null");
        }
        
      }
      
    }
    catch(e){
      window.alert(e); 
    }
 
  }
  

  async squatDemo(){
    this.url = "https://www.youtube.com/embed/AtKZKl7Bgu0"
    this.openVideo()
  }

  async benchPressDemo(){
    this.url = "https://www.youtube.com/embed/cvBNqxlXmtM"
    this.openVideo()
  }

  async openVideo(){
    this.dialog.open(VideoComponent, {width: '90%', height: '90%', data: this.url})
  }

}
