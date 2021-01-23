import { Component, OnInit } from '@angular/core';
import { fade, slideInOutVerticale, slideInOutHorizontal} from './../animations'

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  animations: [
    fade
  ]
})
export class ProgramsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
