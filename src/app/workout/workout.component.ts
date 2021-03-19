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

  workoutType = "";

  exerciseOne = "";
  exerciseTwo = "";
  exerciseThree = "";
  exerciseFour = "";

  demoExerciseOne = "";
  demoExerciseTwo = "";
  demoExerciseThree = "";
  demoExerciseFour = "";

  example = "Demonstration";

  fivekmRun = 0.0;
  plank = 0.0;
  pressUps = 0.0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,  private programService : ProgramsService, private afAuth: AngularFireAuth) {


    //window.alert("session number: " + data["sessionNumber"] + " session type: " + data["sessionType"]);
    this.sessionNumber = data["sessionNumber"];
    this.sessionType = data["sessionType"]; 

    switch(this.sessionType){
      case 1: 
      this.workoutType = "TESTING"
      if(this.sessionNumber == 0 || this.sessionNumber == 27){
        this.exerciseOne = "5k run";
        this.exerciseTwo = "Plank";
        this.exerciseThree = "Press ups";
        this.exerciseFour = "Squats";

        this.demoExerciseOne = this.example;
        this.demoExerciseTwo = this.example;
        this.demoExerciseThree = this.example;
        this.demoExerciseFour = this.example;
      }

        break;

      case 2: 
      this.workoutType = "STRETCH AND CORE";
      if(this.sessionNumber == 1 || this.sessionNumber == 10 || this.sessionNumber == 13 || this.sessionNumber == 19 || this.sessionNumber == 25 || this.sessionNumber == 26){
        this.exerciseOne = "Dynamic stretching & core - Follow video";
        this.demoExerciseOne = this.example;
      }
    
        break;

      case 3: this.workoutType = "RUNNING"
      if(this.sessionNumber == 2){
        this.exerciseOne = "Easy 3km Run @50/60% effort";
        this.demoExerciseOne = this.example;
      }

      if(this.sessionNumber == 9){
        this.exerciseOne = "Easy 4km Run @50/60% effort";
        this.demoExerciseOne = this.example;
      }

      if(this.sessionNumber == 12){
        this.exerciseOne = "Easy 2km Run @50/60% effort";
        this.demoExerciseOne = this.example;

        this.exerciseTwo = "8 X 400m interval runs @ 70/80% effort";
        this.demoExerciseTwo = this.example;
      }

      if(this.sessionNumber == 21){
        this.exerciseOne = "Tempo 5km Run @60/70% effort";
        this.demoExerciseOne = this.example;

        this.exerciseTwo = "8 X 200m interval runs @ 80/85% effort";
        this.demoExerciseTwo = this.example;
      }
        break;

      case 4: this.workoutType = "RESISTANCE"
      if(this.sessionNumber == 3 || this.sessionNumber == 11 || this.sessionNumber == 18){
        this.exerciseOne = "30 minute resistance circuit - Follow video";
        this.demoExerciseOne = this.example;
      }
        break;

      case 5: this.workoutType = "RUNNING AND RESISTANCE"
      if(this.sessionNumber == 5 || this.sessionNumber == 6 || this.sessionNumber == 14){
        this.exerciseOne = "Easy 3km Run @50/60% effort";
        this.demoExerciseOne = this.example;

        this.exerciseTwo = "30 minute resistance circuit - Follow video";
        this.demoExerciseTwo = this.example;
      }
      if(this.sessionNumber == 17){
        this.exerciseOne = "Easy 4km Run @50/60% effort";
        this.demoExerciseOne = this.example;

        this.exerciseTwo = "30 minute resistance circuit - Follow video";
        this.demoExerciseTwo = this.example;
      }

      if(this.sessionNumber == 24){
        this.exerciseOne = "Easy 2km Run @50/60% effort";
        this.demoExerciseOne = this.example;

        this.exerciseTwo = "30 minute resistance circuit - Follow video";
        this.demoExerciseTwo = this.example;
      }
        break;

      case 6: this.workoutType = "Walk"
      if(this.sessionNumber == 4 || this.sessionNumber == 7 || this.sessionNumber == 15 || this.sessionNumber == 16 || this.sessionNumber == 22){
        this.exerciseOne = "40/60 minute walk";
        this.demoExerciseOne = this.example;
      }
        break;
      case 7: this.workoutType = "WALKING AND RESISTANCE"

        if(this.sessionNumber == 8 || this.sessionNumber == 20 || this.sessionNumber == 23){
          this.exerciseOne = "40/60 minute walk";
          this.demoExerciseOne = this.example;

          this.exerciseTwo = "30 minute resistance circuit - Follow video";
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
