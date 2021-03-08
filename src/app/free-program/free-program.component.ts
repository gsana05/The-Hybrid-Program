import { Component, OnInit, Input, HostListener } from '@angular/core';
import { from } from 'rxjs';
import { VideoComponent } from '../video/video.component';
import { FreeProgramCompletedComponent } from '../free-program-completed/free-program-completed.component'
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
import { ThrowStmt } from '@angular/compiler';

import { CreateUserAccount } from '../create-user-account/create-user-account.component';
import { WorkoutComponent } from '../workout/workout.component';


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

  numberOfWorkoutsPerCycle = 28;
  openWorkout = 1;
  missedWorkout = 2;
  completedWorkout = 3;

  url: string | undefined;
  userId: string | null = null;
  snapshotChanges : Subscription | undefined; 
  workoutIds = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27);

  isWorkoutZeroCompleted = this.openWorkout; 
  isWorkoutOneCompleted = this.openWorkout;
  isWorkoutTwoCompleted = this.openWorkout;
  isWorkoutThreeCompleted = this.openWorkout;
  isWorkoutFourCompleted = this.openWorkout;
  isWorkoutFiveCompleted = this.openWorkout;
  isWorkoutSixCompleted = this.openWorkout;
  isWorkoutSevenCompleted = this.openWorkout;
  isWorkoutEightCompleted = this.openWorkout;
  isWorkoutNineCompleted = this.openWorkout;
  isWorkoutTenCompleted = this.openWorkout;
  isWorkoutElevenCompleted = this.openWorkout;
  isWorkoutTwelveCompleted = this.openWorkout;
  isWorkoutThirteenCompleted = this.openWorkout;
  isWorkoutFourteenCompleted = this.openWorkout;
  isWorkoutFifteenCompleted = this.openWorkout;
  isWorkoutSixteenCompleted = this.openWorkout;
  isWorkoutSeventeenCompleted = this.openWorkout;
  isWorkoutEighteenCompleted = this.openWorkout;
  isWorkoutNineteenCompleted = this.openWorkout;
  isWorkoutTwentyCompleted = this.openWorkout;
  isWorkoutTwentyOneCompleted = this.openWorkout;
  isWorkoutTwentyTwoCompleted = this.openWorkout;
  isWorkoutTwentyThreeCompleted = this.openWorkout;
  isWorkoutTwentyFourCompleted = this.openWorkout;
  isWorkoutTwentyFiveCompleted = this.openWorkout;
  isWorkoutTwentySixCompleted = this.openWorkout;
  isWorkoutTwentySevenCompleted = this.openWorkout;




  workoutTest = 1;
  stretchAndCore = 2;
  running = 3;
  resistance = 4;
  runningAndResistance = 5; 
  rest = 6; 
  walkingAndResistance = 7;

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
        this.program = data;
        this.updateUI();
        const isComplete = this.checkCycleIsCompleted()
        if(this.checkCycleIsCompleted()){
        if(this.dialog.openDialogs.length == 0){
          this.dialog.open(FreeProgramCompletedComponent, {width: '90%', height: '90%'});
        }
        }
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

checkCycleIsCompleted() : Boolean {

  var isCycleComplete = false; 

  this.program.currentCycleCount

  this.program.cycles.forEach(data => {
    if(data.cycleId == this.program.currentCycleCount){
      const missed = data.sessionTrackerMissed.length;
      const completed = data.sessionTrackerCompleted.length;

      const total = missed + completed

      if(total >= this.numberOfWorkoutsPerCycle){
        //window.alert("sessions done: " + total + " const session number: " + this.numberOfWorkoutsPerCycle);
        isCycleComplete = true 
      }

    }
  })

  return isCycleComplete;
}

 async openWorkoutDay(sessionNumber : number, sessionType : number){


  if(this.checkCycleIsCompleted()){
    this.dialog.open(FreeProgramCompletedComponent, {width: '90%', height: '90%'});
  }
  else{
    this.dialog.open(WorkoutComponent, {width: '90%', height: '90%', data:{
      sessionNumber: sessionNumber,
      sessionType: sessionType
    }})
  }
  
}

  updateUI(){

    var listOfCompletedIds = Array<Number>();
    var listOfMissedIds = Array<Number>();

    this.program.cycles.forEach(data => {
      
      if(data.cycleId == this.program.currentCycleCount){
        this.workoutIds.forEach(workoutIdNumber => {

          const valueCompleted = data.sessionTrackerCompleted[workoutIdNumber - 1]
          if(valueCompleted != null){
            listOfCompletedIds.push(valueCompleted.sessionNumber)
          }

          const valueMissed = data.sessionTrackerMissed[workoutIdNumber - 1]
          if(valueMissed != null){
            listOfMissedIds.push(valueMissed.sessionNumber)
          }
          
        })
        
      }
    })

    listOfMissedIds.forEach(data => {

      switch (data) {
        case 0: this.isWorkoutZeroCompleted = this.missedWorkout;
            break;
        case 1: this.isWorkoutOneCompleted = this.missedWorkout;
            break;
        case 2: this.isWorkoutTwoCompleted = this.missedWorkout;
            break;
        case 3: this.isWorkoutThreeCompleted = this.missedWorkout;
            break;
        case 4: this.isWorkoutFourCompleted = this.missedWorkout;
            break;
        case 5: this.isWorkoutFiveCompleted = this.missedWorkout;
            break;
        case 6: this.isWorkoutSixCompleted = this.missedWorkout;
            break;
        case 7: this.isWorkoutSevenCompleted = this.missedWorkout;
            break;
        case 8: this.isWorkoutEightCompleted = this.missedWorkout;
            break;
        case 9: this.isWorkoutNineCompleted = this.missedWorkout;
            break;
        case 10: this.isWorkoutTenCompleted = this.missedWorkout;
            break;
        case 11: this.isWorkoutElevenCompleted = this.missedWorkout;
            break;
        case 12: this.isWorkoutTwelveCompleted = this.missedWorkout;
            break;
        case 13: this.isWorkoutThirteenCompleted = this.missedWorkout;
            break;
        case 14: this.isWorkoutFourteenCompleted = this.missedWorkout;
            break;
        case 15: this.isWorkoutFifteenCompleted = this.missedWorkout;
            break;
        case 16: this.isWorkoutSixteenCompleted = this.missedWorkout;
            break;
        case 17: this.isWorkoutSeventeenCompleted = this.missedWorkout;
            break;
        case 18: this.isWorkoutEighteenCompleted = this.missedWorkout;
            break;
        case 19: this.isWorkoutNineteenCompleted = this.missedWorkout;
            break;
        case 20: this.isWorkoutTwentyCompleted = this.missedWorkout;
            break;
        case 21: this.isWorkoutTwentyOneCompleted = this.missedWorkout;
            break;
        case 22: this.isWorkoutTwentyTwoCompleted = this.missedWorkout;
            break;
        case 23: this.isWorkoutTwentyThreeCompleted = this.missedWorkout;
            break;
        case 24: this.isWorkoutTwentyFourCompleted = this.missedWorkout;
            break;
        case 25: this.isWorkoutTwentyFiveCompleted = this.missedWorkout;
            break;
        case 26: this.isWorkoutTwentySixCompleted = this.missedWorkout;
            break;
        case 27: this.isWorkoutTwentySevenCompleted  = this.missedWorkout;
            break;
        default:
            //default block statement;
    }
    })

    listOfCompletedIds.forEach(data => {

      switch (data) {
        case 0: this.isWorkoutZeroCompleted = this.completedWorkout;
            break;
        case 1: this.isWorkoutOneCompleted = this.completedWorkout;
            break;
        case 2: this.isWorkoutTwoCompleted = this.completedWorkout;
            break;
        case 3: this.isWorkoutThreeCompleted = this.completedWorkout;
            break;
        case 4: this.isWorkoutFourCompleted = this.completedWorkout;
            break;
        case 5: this.isWorkoutFiveCompleted = this.completedWorkout;
            break;
        case 6: this.isWorkoutSixCompleted = this.completedWorkout;
            break;
        case 7: this.isWorkoutSevenCompleted = this.completedWorkout;
            break;
        case 8: this.isWorkoutEightCompleted = this.completedWorkout;
            break;
        case 9: this.isWorkoutNineCompleted = this.completedWorkout;
            break;
        case 10: this.isWorkoutTenCompleted = this.completedWorkout;
            break;
        case 11: this.isWorkoutElevenCompleted = this.completedWorkout;
            break;
        case 12: this.isWorkoutTwelveCompleted = this.completedWorkout;
            break;
        case 13: this.isWorkoutThirteenCompleted = this.completedWorkout;
            break;
        case 14: this.isWorkoutFourteenCompleted = this.completedWorkout;
            break;
        case 15: this.isWorkoutFifteenCompleted = this.completedWorkout;
            break;
        case 16: this.isWorkoutSixteenCompleted = this.completedWorkout;
            break;
        case 17: this.isWorkoutSeventeenCompleted = this.completedWorkout;
            break;
        case 18: this.isWorkoutEighteenCompleted = this.completedWorkout;
            break;
        case 19: this.isWorkoutNineteenCompleted = this.completedWorkout;
            break;
        case 20: this.isWorkoutTwentyCompleted = this.completedWorkout;
            break;
        case 21: this.isWorkoutTwentyOneCompleted = this.completedWorkout;
            break;
        case 22: this.isWorkoutTwentyTwoCompleted = this.completedWorkout;
            break;
        case 23: this.isWorkoutTwentyThreeCompleted = this.completedWorkout;
            break;
        case 24: this.isWorkoutTwentyFourCompleted = this.completedWorkout;
            break;
        case 25: this.isWorkoutTwentyFiveCompleted = this.completedWorkout;
            break;
        case 26: this.isWorkoutTwentySixCompleted = this.completedWorkout;
            break;
        case 27: this.isWorkoutTwentySevenCompleted = this.completedWorkout;
            break;
        default:
            //default block statement;
    }
    })

    //window.alert("values completed: " + listOfCompletedIds.length + "\n values missed: " + listOfMissedIds.length);
  }

  async updateWorkout(sessionNumber : number, sessionType : number, workoutStatus : Boolean){

    if(this.checkCycleIsCompleted()){
      window.alert("CYCLE IS COMPLETE");
    }
    else{
      try{
        if(this.userId != null){
          if(this.program.programId != null){
  
            var openCycle : Cycles = {
              cycleId : 0,
              sessionTrackerMissed : Array<Workout>(),
              sessionTrackerCompleted :  Array<Workout>()
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
