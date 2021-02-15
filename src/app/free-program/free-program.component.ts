import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { VideoComponent } from '../video/video.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-free-program',
  templateUrl: './free-program.component.html',
  styleUrls: ['./free-program.component.scss']
})
export class FreeProgramComponent implements OnInit {

  url: string;

  
  constructor(private dialog: MatDialog) { 
    this.url ="https://www.youtube.com/embed/AtKZKl7Bgu0"
  }

  ngOnInit(): void {

  }

  async openVideo(){
    this.dialog.open(VideoComponent, {width: '90%', height: '90%', data: this.url})
  }

}
