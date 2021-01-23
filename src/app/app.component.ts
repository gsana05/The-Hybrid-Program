import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hybrid-athlete-program';

  navLinks = [
    {path: 'playarea', label: 'Play Area'},
    {path: 'about', label: 'About me'}
  ]

}
