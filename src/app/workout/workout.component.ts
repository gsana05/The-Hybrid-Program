import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoComponent } from '../video/video.component';
import { MatDialog } from '@angular/material/dialog';
import { User, FreeProgram, Message, Cycles, Workout, TestResults } from '../types';
import { AuthService } from '../auth.service';
import { ProgramsService } from '../programs.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionOrderPopUpComponent } from '../session-order-pop-up/session-order-pop-up.component';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

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

  testResults : TestResults = {
    resultsId : "",
    preTestDate : new Date().getTime(),
    postTestDate : new Date().getTime(),
    preTestFiveKmRun : 0,
    postTestFiveKmRun : 0,
    preTestPlank : 0,
    postTestPlank : 0,
    preTestPressUps : 0,
    postTestPressUps : 0
}

  url: string | undefined;
  userId: string | null = null;
  snapshotChanges : Subscription | undefined; 

  sessionNumber = -1;
  sessionType = -1; 
  sessionWorkout = "";

  workoutType = "";

  exerciseOne = "";
  exerciseTwo = "";
  exerciseThree = "";
  exerciseFour = "";
  exerciseFive = "";

  demoExerciseOne = "";
  demoExerciseTwo = "";
  demoExerciseThree = "";
  demoExerciseFour = "";
  demoExerciseFive = "";

  example = "Demo & info";

  fivekmRun = 0.0;
  plank = 0.0;
  pressUps = 0.0;

  exerciseType5k = "5k run";
  exercisePlank = "Plank";
  exercisePressUps = "Press ups";
  exerciseSquats = "Squats";
  exercise2kEasy = "Easy 2km Run @50/60% effort";
  exercise5kEasy = "Easy 5km Run @50/60% effort";
  exercise6kEasy = "Easy 6km Run @50/60% effort";
  exercise4kEasy = "Easy 4km Run @50/60% effort";
  exerciseCore = "10 minute core - Follow video";
  exerciseWalk = "45/90 minute walk";
  exerciseIntervals400m = "8 X 400m interval runs @ 80/90% effort";
  exerciseIntervals200m = "8 X 200m interval runs @ 80/85% effort";
  exercise5kTempo = "Tempo 5km Run @60/70% effort"; 
  workoutInfo = "";
  curlAndPress = "Curl and press";
  lunges = "Lunges";
  dumbbellRow = "Dumbbell row";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,  private programService : ProgramsService, private afAuth: AngularFireAuth) {


    //window.alert("session number: " + data["sessionNumber"] + " session type: " + data["sessionType"]);
    this.sessionNumber = data["sessionNumber"];
    this.sessionType = data["sessionType"]; 

    switch(this.sessionType){
      case 1: 
      this.workoutType = "TESTING"
      if(this.sessionNumber == 0 || this.sessionNumber == 27){
        this.exerciseOne = this.exerciseType5k;
        this.exerciseTwo = this.exercisePlank;
        this.exerciseThree = this.exercisePressUps;

        this.demoExerciseOne = this.example;
        this.demoExerciseTwo = this.example;
        this.demoExerciseThree = this.example;
      }

        break;

      case 2: 
      this.workoutType = "STRETCH AND CORE";
      if(this.sessionNumber == 25 || this.sessionNumber == 26){
        this.exerciseOne = "Dynamic stretching & core - Follow video";
        this.demoExerciseOne = this.example;
      }
    
        break;

      case 3: this.workoutType = "RUNNING"
      if(this.sessionNumber == 2){
        this.exerciseOne = this.exercise5kEasy;
        this.demoExerciseOne = this.example;
      }

      if(this.sessionNumber == 10 || this.sessionNumber == 18){
        this.exerciseOne = this.exercise2kEasy;
        this.demoExerciseOne = this.example;

        this.exerciseTwo = this.exerciseIntervals400m;
        this.demoExerciseTwo = this.example;
      }

      if(this.sessionNumber == 14){
        this.exerciseOne = this.exercise6kEasy;
        this.demoExerciseOne = this.example;
      }
     

      if(this.sessionNumber == 21){
        this.exerciseOne = "Tempo 5km Run @60/70% effort";
        this.demoExerciseOne = this.example;

        this.exerciseTwo = this.exerciseIntervals200m;
        this.demoExerciseTwo = this.example;
      }
        break;

      case 4: this.workoutType = "RESISTANCE"

      if(this.sessionNumber == 3 || this.sessionNumber == 9 || this.sessionNumber == 13 || this.sessionNumber == 19){

        this.workoutInfo = "Circuit training: \n 40 seconds on with 20 seconds rest per exercise. One round is complete after all 5 exercises (5 minutes). Complete 4/6 rounds (20/30 minutes for full workout).";

        this.exerciseOne = this.exercisePressUps;
        this.demoExerciseOne = this.example;

        this.exerciseTwo = this.exerciseSquats;
        this.demoExerciseTwo = this.example;

        this.exerciseThree = this.dumbbellRow; 
        this.demoExerciseThree = this.example;

        this.exerciseFour = this.lunges;
        this.demoExerciseFour = this.example;

        this.exerciseFive = this.curlAndPress; 
        this.demoExerciseFive = this.example;

      }
        break;

      case 5: this.workoutType = "RUNNING AND RESISTANCE"
      if(this.sessionNumber == 5 || this.sessionNumber == 6 || this.sessionNumber == 11 || this.sessionNumber == 15){
        this.exerciseOne = this.exercise5kEasy;
        this.demoExerciseOne = this.example;

        this.exerciseTwo = this.exerciseCore;
        this.demoExerciseTwo = this.example;

        this.exerciseThree = this.exercisePressUps;
        this.demoExerciseThree = this.example;
      }

      if(this.sessionNumber == 23){
        this.exerciseOne = this.exercise2kEasy;
        this.demoExerciseOne = this.example;

        this.exerciseTwo = this.exerciseCore;
        this.demoExerciseTwo = this.example;

        this.exerciseThree = this.exercisePressUps;
        this.demoExerciseThree = this.example;
      }

      if(this.sessionNumber == 24){
        this.exerciseOne = this.exercise2kEasy;
        this.demoExerciseOne = this.example;

        this.exerciseTwo = this.exerciseCore;
        this.demoExerciseTwo = this.example;

        this.exerciseThree = this.exercisePressUps;
        this.demoExerciseThree = this.example;
      }
        break;

      case 6: this.workoutType = "Walk"
      if(this.sessionNumber == 1 || this.sessionNumber == 4 || this.sessionNumber == 7 || this.sessionNumber == 8 || this.sessionNumber == 12 || this.sessionNumber == 16 || this.sessionNumber == 17 || this.sessionNumber == 22 || this.sessionNumber == 24 || this.sessionNumber == 25 || this.sessionNumber == 26){
        this.exerciseOne = this.exerciseWalk;
        this.demoExerciseOne = this.example;
      }
        break;
      case 7: this.workoutType = "WALKING AND RESISTANCE"

        if(this.sessionNumber == 20){
          this.exerciseOne = this.exerciseWalk;
          this.demoExerciseOne = this.example;

          this.exerciseTwo = this.exerciseCore;
          this.demoExerciseTwo = this.example;
        }
        break
      default:
            //default block statement;
    }


    this.afAuth.currentUser.then(user => {
      if(user != null){
        this.userId = user.uid
      }
    });

    this.snapshotChanges = this.programService.testingPrograms()?.subscribe(programs => {
      programs.map(data => {
        this.program = data
        this.programService.addTestResultsListenerSnapshotValues(data)

        this.programService.getTestResults()?.subscribe(testResults => {
          testResults.map(data => {
            this.testResults = data;

            console.log("postTestDate: " + this.testResults.postTestDate + " id: " + this.testResults.resultsId);

          })
        })


      })
    });


    


   }

  ngOnInit(): void {
  }

  async updateWorkout(sessionNumber : number, sessionType : number, workoutStatus : Boolean){

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

          const currentTotalMissedAndCompleted = openCycle.sessionTrackerCompleted.length + openCycle.sessionTrackerMissed.length
         
          const numberSession = sessionNumber + 1
          const value = numberSession - currentTotalMissedAndCompleted
          
          //window.alert("value: " + value + " numberSession: " + numberSession + " currentTotalMissedAndCompleted: " + currentTotalMissedAndCompleted);
          //console.log("value: " + value);



          if(value == 1){

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
              if(sessionNumber == 0 || sessionNumber == 27){
                window.alert("session number: " + sessionNumber);
                if(sessionNumber == 0){
                  window.alert("we are in");
                  const testResults : TestResults = {
                    preTestDate : new Date().getTime(),
                    postTestDate : null,
                    preTestFiveKmRun : this.fivekmRun,
                    postTestFiveKmRun : null,
                    preTestPlank : this.plank,
                    postTestPlank : null,
                    preTestPressUps : this.pressUps,
                    postTestPressUps : null
                  }

                  window.alert("before");
                  await this.programService.setFreeProgramTestResults(this.userId, this.program, testResults)
                  window.alert("success");
                }

                if(sessionNumber == 27){

                  this.testResults.postTestDate = new Date().getTime();
                  this.testResults.postTestFiveKmRun = this.fivekmRun;
                  this.testResults.postTestPlank = this.plank;
                  this.testResults.postTestPressUps = this.pressUps;

                  await this.programService.updateFreeProgramTestResults(this.userId, this.program, this.testResults);
                  window.alert("success");

                }

                //window.alert("fivekmRun: " + this.fivekmRun + "plank: " + this.plank + "press ups: " + this.pressUps);

              }
              this.dialog.closeAll()
              //window.alert("success");

            }
          }
          else{
            this.dialog.open(SessionOrderPopUpComponent, {width: '50%', height: '50%'})
            //window.alert("you need to complete or miss a session in sequencial order");
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

  async showVideo(exercise : string){

    const type = this.sessionType;
    const number = this.sessionNumber;
    this.sessionWorkout = exercise;

    switch (exercise) {
      case this.exerciseType5k: 
        this.url = "https://www.youtube.com/embed/AtKZKl7Bgu0";
        this.openVideo();
          break;
      case this.exercisePlank:
        this.url = "https://www.youtube.com/embed/ASdvN_XEl_c";
        this.openVideo();
          break;
      case this.exercisePressUps:
        this.url = "https://www.youtube.com/embed/HMWeJ6dyq9w";
        this.openVideo();
          break;
      case this.exerciseSquats: 
        this.url = "https://www.youtube.com/embed/aclHkVaku9U"
        this.openVideo() 
          break;
      case this.exercise2kEasy: 
        this.url = "https://www.youtube.com/embed/210qtHwAGpA";
        this.openVideo();
          break;
      case this.exercise5kEasy: 
        this.url = "https://www.youtube.com/embed/q90AtB707k0";
        this.openVideo();
          break;
      case this.exercise6kEasy:
        this.url = "https://www.youtube.com/embed/q90AtB707k0";
        this.openVideo();
        break
      case this.exercise4kEasy: 
        this.url = "https://www.youtube.com/embed/3ji1dia7oj0";
        this.openVideo();
          break;
      case this.exerciseCore: 
        this.url = "https://www.youtube.com/embed/eRhueOnrVkU";
        this.openVideo();
          break;
      case this.exerciseWalk: 
        this.url = "https://www.youtube.com/embed/BEZF20oo5UQ";
        this.openVideo();
          break;
      case this.exerciseIntervals400m: 
        this.url = "https://www.youtube.com/embed/8x7-fJW-Bww";
        this.openVideo();
          break;
      case this.exerciseIntervals200m: 
        this.url = "https://www.youtube.com/embed/OlHl7Mvm3b4";
        this.openVideo();
          break;
      case this.exercise5kTempo: 
        this.url = "https://www.youtube.com/embed/nviIHEXNAL8";
        this.openVideo();
          break;
      case this.curlAndPress:
        this.url = "https://www.youtube.com/embed/l6ApagwH0TY";
        this.openVideo();
        break
      case this.lunges:
        this.url = "https://www.youtube.com/embed/QOVaHwm-Q6U";
        this.openVideo();
        break
      case this.dumbbellRow:
        this.url = "https://www.youtube.com/embed/pTT_MCK0L90";
        this.openVideo();
        break;

    }

  }

  async openVideo(){
    //this.dialog.open(VideoComponent, {width: '90%', height: '90%', data: this.url})

    this.dialog.open(VideoComponent, {width: '90%', height: '90%', data:{
      url : this.url,
      sessionNumber: this.sessionNumber,
      sessionType: this.sessionType,
      sessionWorkout : this.sessionWorkout 
    }})

  }

}
