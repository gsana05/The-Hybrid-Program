import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService : AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    console.log("on the dashboard");
  
    /*
    this.afAuth.onAuthStateChanged((user) => {
      if(user){
        if(user.uid != null){
          console.log("userId (sign in compo): " + user.uid);
          this.authService.setCurrentUserId(user.uid)
          //this.zone.run(() => { this.router.navigate(['/dashboard']); });
        }
        else{
          console.log("userId: not foundd");
          this.authService.setCurrentUserIdToNull()
          this.router.navigate(['welcome']);
        }
      }
    })
    */
  }

  async logOut() {
    

    try {
      await this.authService.LogOutUser();
      //window.alert("Sign out")
      this.router.navigate(["/welcome"]);
    }
    catch (e) {
      window.alert(e); 
    }
    finally {
      //window.alert("finallyyyy"); 
    }

  }

}
