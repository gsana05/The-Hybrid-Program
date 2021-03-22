import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProgramsService } from '../programs.service';
import { User, FreeProgram, Message, Cycles, Workout, TestResults } from '../types';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { Timestamp } from 'rxjs/internal/operators/timestamp';
import {formatDate} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

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

  taskTypeAreas: {
    name: string;
    point: string, 
    selected: boolean;
}[] = [
    {
        name: 'Area 1',
        point: 'Love',
        selected: false
    },
    {
        name: 'Area 2',
        point: 'Happy',
        selected: false
    },
    {
        name: 'Area 3',
        point: 'Joy',
        selected: true
    },
];

snapshotChanges : Subscription | undefined; 
numberOfWorkoutsPerCycle = 28;
startDateOfProgram : number | undefined | null 
endDateOfProgram : number | null | undefined
preFiveKTime : string | undefined
postFiveKtime : string | undefined
prePressUpCount : string | undefined
postPressUpCount : string | undefined
prePlankTime : string | undefined
postPlankTime : string | undefined

now = new Date();

workoutTest = 1;
workoutTestCount = 0;

stretchAndCore = 2;
stretchAndCoreCount = 0;

running = 3;
runningCount = 0;

resistance = 4;
resistanceCount = 0;

runningAndResistance = 5; 
runningAndResistanceCount = 0;

rest = 6;
restCount = 0; 

walkingAndResistance = 7;
walkingAndResistanceCount = 0;



  constructor(private programService : ProgramsService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {

    this.snapshotChanges = this.programService.testingPrograms()?.subscribe(programs => {
      programs.map(data => {
        this.program = data;

        data.cycles.forEach(data => {
          data.sessionTrackerCompleted.forEach(completed => {
            
            switch(completed.sessionType){
              case this.workoutTest: 
              this.workoutTestCount = this.workoutTestCount + 1;
              break;
              case this.stretchAndCore: 
              this.stretchAndCoreCount++;
              break;
              case this.running: 
              this.runningCount++;
              break;
              case this.resistance:
                this.resistanceCount++; 
              break;
              case this.runningAndResistance:
                this.runningAndResistanceCount++; 
              break;
              case this.rest: 
              this.restCount++;
              break;
              case this.walkingAndResistance: 
              this.walkingAndResistanceCount++;
              break;
            }

          })
        })

        //get results 
        this.programService.addTestResultsListenerSnapshotValues(data)

        this.programService.getTestResults()?.subscribe(testResults => {
          testResults.map(data => {
            this.testResults = data;

            this.startDateOfProgram = data.preTestDate 
            this.endDateOfProgram = data.postTestDate
            this.preFiveKTime = data.preTestFiveKmRun?.toString() 
            this.postFiveKtime = data.postTestFiveKmRun?.toString()
            this.prePressUpCount = data.preTestPressUps?.toString()
            this.postPressUpCount = data.postTestPressUps?.toString()
            this.prePlankTime = data.preTestPlank?.toString()
            this.postPlankTime = data.postTestPlank?.toString()

            console.log("postTestDate: " + this.testResults.postTestDate + " id: " + this.testResults.resultsId);

          })
        })

        const completedSessions = data.totalCompletedSessions
        const missedSessions = data.totalMissedSessions
        //const totalSessionsStatusSet = completedSessions + missedSessions
        const openSessions = this.numberOfWorkoutsPerCycle - (completedSessions + missedSessions)

        var myChart = new Chart("horizontalBar", {
          type: 'horizontalBar',
          data: {
            labels: ['Completed', 'Missed', 'Open'],
            datasets: [{
              label: '',
              data: [completedSessions, missedSessions, openSessions],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
              responsive: true,
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Number of sessions'
                  },
                  ticks: {
                    // forces step size to be 5 units
                    min: 0,
                    max: 28,
                    stepSize: 1 // <----- This prop sets the stepSize
                  }
                }],
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Status'
                  }
                }]
              },
              legend: {
                display: false // hide label
              }
          }
        });

        var myChart = new Chart("barChart", {
          type: 'bar',
          data: {
            labels: ['Test', 'Stretch', 'Running', 'Resistance', 'Hybrid', 'Rest', 'Walking'],
            datasets: [{
              label: '',
              data: [this.workoutTestCount, this.stretchAndCoreCount, this.runningCount, this.resistanceCount, this.runningAndResistanceCount, this.restCount, this.walkingAndResistanceCount],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgb(60, 179, 113, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgb(0,128,0, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  precision: 0 // whole numbers on yAxis
                }
              }]
            },
              legend: {
                display: false // hide label
              }
          }
        });


      })
    });

  }

}
