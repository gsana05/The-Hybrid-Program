import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoComponent } from '../video/video.component';
import { MatDialog } from '@angular/material/dialog';
import { User, FreeProgram, Message, Cycles, Workout } from '../types';
import { AuthService } from '../auth.service';
import { ProgramsService } from '../programs.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  url: string | undefined;
  userId: string | null = null;
  snapshotChanges : Subscription | undefined; 

  sessionNumber = -1;
  sessionType = -1; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,  private programService : ProgramsService, private afAuth: AngularFireAuth) {


    //window.alert("session number: " + data["sessionNumber"] + " session type: " + data["sessionType"]);
    this.sessionNumber = data["sessionNumber"];
    this.sessionType = data["sessionType"]; 

    this.afAuth.currentUser.then(user => {
      if(user != null){
        this.userId = user.uid
      }
    });

    this.snapshotChanges = this.programService.testingPrograms()?.subscribe(programs => {
      programs.map(data => {
        this.program = data
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
            this.dialog.closeAll()
            //window.alert("success");

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
