import { Component, OnInit } from '@angular/core';
import { fade, slideInOutHorizontal } from './../animations'

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    fade,
    slideInOutHorizontal
  ]
})
export class AboutMeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
