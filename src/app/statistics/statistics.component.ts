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
endDateOfProgram : Date | null | undefined
preFiveKTime : string | undefined
postFiveKtime : string | undefined
prePressUpCount : string | undefined
postPressUpCount : string | undefined
prePlankTime : string | undefined
postPlanktime : string | undefined

now = new Date();

  constructor(private programService : ProgramsService, @Inject(LOCALE_ID) private locale: string) { }

  transform(timestamp: Timestamp, format?: string): string {
    if (!timestamp?.toDate) {
        return "";
    }
    return formatDate(timestamp.toDate(), format || 'medium', this.locale);
}

  ngOnInit(): void {

    this.snapshotChanges = this.programService.testingPrograms()?.subscribe(programs => {
      programs.map(data => {
        this.program = data;

        //get results 
        this.programService.addTestResultsListenerSnapshotValues(data)

        this.programService.getTestResults()?.subscribe(testResults => {
          testResults.map(data => {
            this.testResults = data;

            this.startDateOfProgram = data.preTestDate 
            //this.endDateOfProgram = data.postTestDate 
            this.preFiveKTime = data.preTestFiveKmRun?.toString() 
            this.postFiveKtime = data.postTestFiveKmRun?.toString()
            this.prePressUpCount = data.preTestPressUps?.toString()
            this.postPressUpCount = data.postTestPressUps?.toString()
            this.prePlankTime = data.preTestPlank?.toString()
            this.postPlanktime = data.postTestPlank?.toString()




            console.log("postTestDate: " + this.testResults.postTestDate + " id: " + this.testResults.resultsId);

          })
        })

        const completedSessions = data.totalCompletedSessions
        const missedSessions = data.totalMissedSessions
        //const totalSessionsStatusSet = completedSessions + missedSessions
        const openSessions = this.numberOfWorkoutsPerCycle - (completedSessions + missedSessions)

        var myChart = new Chart("lineChart", {
          type: 'pie',
          data: {
            labels: ['Completed', 'Missed', 'Open'],
            datasets: [{
              label: 'session stats',
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
              responsive: true
          }
        });

      })
    });


    var myChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    var myChart = new Chart("horizontalBar", {
      type: 'horizontalBar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    var myChart = new Chart("horizontalBarPlay", {
      type: 'horizontalBar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }

  

}
