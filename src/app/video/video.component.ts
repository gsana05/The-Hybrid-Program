import { ThrowStmt } from '@angular/compiler';
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
  repetitions = "0";
  sets = "0";
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
  exercise5kEasy = "Easy 5km Run @50/60% effort";
  exercise6kEasy = "Easy 6km Run @50/60% effort";
  exercise4kEasy = "Easy 4km Run @50/60% effort";
  exerciseCore = "10 minute core - Follow video";
  exerciseWalk = "45/90 minute walk";
  exerciseIntervals400m = "8 X 400m interval runs @ 80/90% effort";
  exerciseIntervals200m = "8 X 200m interval runs @ 80/85% effort";
  exercise5kTempo = "Tempo 5km Run @60/70% effort"; 
  curlAndPress = "Curl and press";
  lunges = "Lunges";
  dumbbellRow = "Dumbbell row";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {

    this.sessionNumber = data["sessionNumber"];
    this.sessionType = data["sessionType"]; 
    this.url = data["url"];
    this.sessionWorkout = data["sessionWorkout"];

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl( this.url );


    switch (this.sessionType) {
      case this.workoutTest: 
      this.sets = "1";
      this.repetitions = "1"; 
      this.restTime = "Only one set and repetition so no rest required";

      if(this.sessionNumber == 0 || this.sessionNumber == 27){
        if(this.sessionWorkout == this.exerciseType5k){
          this.exerciseName = "5km race run";
          this.keyInfo = "Run a race 5km! Complete 5km as quickly as possible. Pace yourself correctly so you do not burn out early in the run.";
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

      if(this.sessionNumber == 2){
        this.sets = "1";
        this.repetitions = "1"; 
        this.restTime = "Only one set and repetition so no rest required";
        this.exerciseName = "5k super easy run"
        this.keyInfo = "Running to build mileage - run at 5/6 out of 10 effort with the aim to keep your heart rate below 140bpm. DO NOT think about time and speed, just enjoy.";
      }

      if(this.sessionNumber == 10 || this.sessionNumber == 18){

        if(this.sessionWorkout == this.exercise2kEasy){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "Only one set and repetition so no rest required";
          this.exerciseName = "2k super easy run"
          this.keyInfo = "Very slow run to warm you up for the intervals";
        }

        if(this.sessionWorkout == this.exerciseIntervals400m){
          this.sets = "1";
          this.repetitions = "8"; 
          this.restTime = "90/120 seconds rest between each repetition";
          this.exerciseName = this.exerciseIntervals400m;
          this.keyInfo = "400m run at 80/90% of max effort followed by 90/120 seconds rest. Complete 8 reps. Heart rate target is 160/170 bpm (beats per minute).";
        }

      }

      if(this.sessionNumber == 21){
        if(this.sessionWorkout == this.exercise5kTempo){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "Only one set and repetition so no rest required";
          this.exerciseName = "5k at 7/10 effort"
          this.keyInfo = "This is a tempo run not a maximum effort run. Run 10% outside of your confort zone.";
        }

        if(this.sessionWorkout == this.exerciseIntervals200m){
          this.sets = "1";
          this.repetitions = "8"; 
          this.restTime = "90 seconds rest between each repetition";
          this.exerciseName = this.exerciseIntervals400m;
          this.keyInfo = "200m run at 80/90% of max effort followed by 90 seconds rest. Complete 8 reps. Heart rate target is 160/170 bpm (beats per minute).";
        }
      }

      if(this.sessionNumber == 14){

        if(this.sessionWorkout == this.exercise6kEasy){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "Only one set and repetition so no rest required";
          this.exerciseName = "6k super easy run"
          this.keyInfo = "Running to build mileage - run at 5/6 out of 10 effort with the aim to keep your heart rate below 140bpm. DO NOT think about time and speed, just enjoy.";
        }   
      }
        
          break;
      case this.resistance: 
        
      if(this.sessionNumber == 3 || this.sessionNumber == 9 || this.sessionNumber == 13 || this.sessionNumber == 19){

        this.sets = "4 to 6";
        this.repetitions = "40 seconds all you can with correct form"; 
        this.restTime = "20 seconds before moving on to the next exercise in the circuit";

        if(this.sessionWorkout == this.curlAndPress){
           this.exerciseName = this.curlAndPress;
           this.keyInfo = "CURL AND PRESS";
        }
        else if(this.sessionWorkout == this.lunges){
          this.exerciseName = this.lunges;
          this.keyInfo = "LUNGES";
        }
        else if(this.sessionWorkout == this.dumbbellRow){
          this.exerciseName = this.dumbbellRow;
          this.keyInfo = "Dumbbell row";
        }
        else if(this.sessionWorkout == this.exerciseSquats){
          this.exerciseName = this.exerciseSquats;
          this.keyInfo = "Squats";
        }
        else if(this.sessionWorkout == this.exercisePressUps){
          this.exerciseName = this.exercisePressUps;
          this.keyInfo = "Press ups";
        }

       

      }

          break;
      case this.runningAndResistance: 

      if(this.sessionNumber == 5 || this.sessionNumber == 6 || this.sessionNumber == 11 || this.sessionNumber == 15){

        if(this.sessionWorkout == this.exercise5kEasy){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "Only one set and repetition so no rest required";
          this.exerciseName = "5k super easy run"
          this.keyInfo = "Running to build mileage - run at 5/6 out of 10 effort with the aim to keep your heart rate below 140bpm. DO NOT think about time and speed, just enjoy.";
        }

        if(this.sessionWorkout == this.exerciseCore){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "15 seconds between each exercise";
          this.exerciseName = this.exerciseCore
          this.keyInfo = "Isometric exercises to build core strength and stability";
        }

        if(this.sessionWorkout == this.exercisePressUps){
          this.sets = "10";
          this.repetitions = "6/10"; 
          this.restTime = "90/120 seconds between each exercise";
          this.exerciseName = this.exercisePressUps;
          this.keyInfo = "Press ups to build upper body strength and endurance. 10 sets of 6 to 10 reps so you will complete a minimum of 60 reps and a max of 100. You can do them all your knees if needed.";
        }

        
      }

      if(this.sessionNumber == 23){
        if(this.sessionWorkout == this.exercise2kEasy){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "Only one set and repetition so no rest required";
          this.exerciseName = "2k super easy run"
          this.keyInfo = "Running to build mileage - run at 5/6 out of 10 effort with the aim to keep your heart rate below 140bpm. DO NOT think about time and speed, just enjoy.";
        }

        if(this.sessionWorkout == this.exerciseCore){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "15 seconds between each exercise";
          this.exerciseName = this.exerciseCore
          this.keyInfo = "Isometric exercises to build core strength and stability";
        }

        if(this.sessionWorkout == this.exercisePressUps){
          this.sets = "10";
          this.repetitions = "5"; 
          this.restTime = "90/120 seconds between each exercise";
          this.exerciseName = this.exercisePressUps;
          this.keyInfo = "Press ups to build upper body strength and endurance. 10 sets of 5 reps so you will complete 50 reps. You can do them all your knees if needed.";
        }
      }
        

          break;
      case this.rest: 
      this.sets = "1";
      this.repetitions = "1"; 
      this.restTime = "Only one set and repetition so no rest required";
        
      if(this.sessionNumber == 1 || this.sessionNumber == 4 || this.sessionNumber == 7 || this.sessionNumber == 8 || this.sessionNumber == 12 || this.sessionNumber == 16 || this.sessionNumber == 17 || this.sessionNumber == 22 || this.sessionNumber == 24 || this.sessionNumber == 25 || this.sessionNumber == 26){
        this.exerciseName = "45/90 Minute walk";
        this.keyInfo = "Walk for a minimum of 45 minutes up to 90 minutes. Recovery session to burn calories without exhausting yourself.";
      }

          break;
      case this.walkingAndResistance: 
        
      if(this.sessionNumber == 20){

        if(this.sessionWorkout == this.exerciseCore){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "15 seconds between each exercise";
          this.exerciseName = this.exerciseCore
          this.keyInfo = "Isometric exercises to build core strength and stability";
        }

        if(this.sessionWorkout == this.exerciseWalk){
          this.sets = "1";
          this.repetitions = "1"; 
          this.restTime = "Only one set and repetition so no rest required";
          this.exerciseName = "45/90 Minute walk";
          this.keyInfo = "Walk for a minimum of 45 minutes up to 90 minutes. Recovery session to burn calories without exhausting yourself.";
        }

      }

          break;
    }

  }


  ngOnInit(): void {
    
  }

}
