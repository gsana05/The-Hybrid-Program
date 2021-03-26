import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  safeUrl: SafeResourceUrl;
  sessionNumber = -1;
  sessionType = -1; 
  sessionWorkout = "";
  exerciseName = "";
  url = ""
  repetitions = 0;
  sets = 0;
  restTime = ""; 
  keyInfo = "";

  workoutTest = 1;
  stretchAndCore = 2;
  running = 3;
  resistance = 4;
  runningAndResistance = 5; 
  rest = 6; 
  walkingAndResistance = 7;

  exerciseType5k = "5k run";
  exercisePlank = "Plank";
  exercisePressUps = "Press ups";
  exerciseSquats = "Squats";
  exercise2kEasy = "Easy 2km Run @50/60% effort";
  exercise3kEasy = "Easy 3km Run @50/60% effort";
  exercise4kEasy = "Easy 4km Run @50/60% effort";
  exerciseResistance = "30 minute resistance circuit - Follow video";
  exerciseWalk = "40/60 minute walk";
  exerciseIntervals400m = "8 X 400m interval runs @ 70/80% effort";
  exerciseIntervals200m = "8 X 200m interval runs @ 80/85% effort";
  exercise5kTempo = "Tempo 5km Run @60/70% effort"; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {

    this.sessionNumber = data["sessionNumber"];
    this.sessionType = data["sessionType"]; 
    this.url = data["url"];
    this.sessionWorkout = data["sessionWorkout"];

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl( this.url );


    switch (this.sessionType) {
      case this.workoutTest: 
      this.sets = 1;
      this.repetitions = 1; 
      this.restTime = "Only one set and repetition so no rest required";

      if(this.sessionNumber == 0){
        if(this.sessionWorkout == this.exerciseType5k){
          this.exerciseName = "5km race run";
          this.keyInfo = "Run a race 5km! Let's find out your starting point.";
        }
        else if(this.sessionWorkout == this.exercisePlank){
          this.exerciseName = "Plank"
          this.keyInfo = "Hold the plank for as long as possible with correct form";
        }
        else if(this.sessionWorkout == this.exercisePressUps){
          this.exerciseName = "Press Ups";
          this.keyInfo = "Complete as many press ups as possible with correct form until your knees touch the floor.";
        }
        else{
          this.keyInfo = "Error";
        }
        
      }

          break;
      case this.stretchAndCore:
        
          break;
      case this.running:
      this.sets = 1;
      this.repetitions = 1; 
      this.restTime = "Only one set and repetition so no rest required";
      if(this.sessionNumber == 2){
        this.exerciseName = "5k super easy run"
        this.keyInfo = "Running to build mileage - run at 5/6 out of 10 effort with the aim to keep your heart rate below 140bpm. DO NOT think about time and speed, just enjoy.";
      }
        
          break;
      case this.resistance: 
        
      if(this.sessionNumber == 3){
        this.exerciseName = "Testng 3"
        this.keyInfo = "key info test 3";
      }

          break;
      case this.runningAndResistance: 
        

          break;
      case this.rest: 
      this.sets = 1;
      this.repetitions = 1; 
      this.restTime = "Only one set and repetition so no rest required";
        
      if(this.sessionNumber == 1){
        this.exerciseName = "45/90 Minute walk";
        this.keyInfo = "Walk for a minimum of 45 minutes up to 90 minutes. Recovery session to burn calories without exhausting yourself.";
      }

          break;
      case this.walkingAndResistance: 
        

          break;
    }

  }


  ngOnInit(): void {
    
  }

}
