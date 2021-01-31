import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async logOut() {
    await this.authService.LogOutUser();
    this.router.navigate(["/welcome"]);
  }

}
