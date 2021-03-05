import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { ProgramsService } from '../programs.service';
import { User, FreeProgram, Message, Cycles, Workout } from '../types';

@Component({
  selector: 'app-join-free-program',
  templateUrl: './join-free-program.component.html',
  styleUrls: ['./join-free-program.component.scss']
})
export class JoinFreeProgramComponent implements OnInit {

  program : FreeProgram = {
    programId : "",
    userId : "",
    enrolled : false,
    date : new Date(),
    cycles :  Array<Cycles>(),
    currentCycleCount : 1,
    totalCompletedSessions : 0,
    totalCompletedCycles : 0,
    totalMissedSessions : 0
  }

  cycle : Cycles = {
    cycleId : 1,
    sessionTrackerMissed : Array<Workout>(),
    sessionTrackerCompleted :  Array<Workout>()
}

  userId: string | null = null;

  constructor(private authService : AuthService, private router: Router, private programService : ProgramsService, private afAuth: AngularFireAuth) { 
    this.afAuth.currentUser.then(user => {
      if(user != null){
        this.userId = user.uid
      }
    });
  }

  ngOnInit(): void {
  }

  async joinFreeProgram(){
  
    try{
      if(this.userId != null){
        this.program.enrolled = true;
        this.program.date = new Date();
        this.program.cycles.push(this.cycle);

        await this.programService.joinFreePrgram(this.userId, this.program);
        //window.alert("success");
      }
      
    }
    catch(e){
      window.alert(e); 
    }  
  
  }

}
