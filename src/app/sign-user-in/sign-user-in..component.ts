import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { CreateUserAccount } from '../create-user-account/create-user-account.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-user-in.',
  templateUrl: './sign-user-in.component.html',
  styleUrls: ['./sign-user-in.component.scss']
})
export class SignUserIn implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = "";
  awaitingSignIn = false;
  signInError: string | null = null;

  constructor(private formBuilder: FormBuilder,  private afAuth: AngularFireAuth, private router: Router, private authService : AuthService, public zone: NgZone, public dialogRef: MatDialogRef<CreateUserAccount>) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit():void {
    console.log("on sign-in user");

    /*
    this.afAuth.onAuthStateChanged((user) => {
      if(user){
        if(user.uid != null){
          console.log("userId (sign in compo): " + user.uid);
          this.authService.setCurrentUserId(user.uid)
          this.router.navigate(['dashboard']);
          //this.zone.run(() => { this.router.navigate(['/dashboard']); });
        }
        else{
          console.log("userId: not foundd");
        }
      }
    })
    */

  }

  async signIn(email: string, password: string) {

    try {
      if (!email) {
        throw { message: "Please enter an email address" };
      }
      if (!password) {
        throw { message: "Please enter your password" };
      }

      /*
      if(email && password){
        this.errorMessage = "You have entered a correct email and password";
      }
      */

    }
    catch (err) {
      this.errorMessage = err.message;
    }

    try {
      this.awaitingSignIn = true;
      this.signInError = null;
      await this.authService.LogInUser(email, password);
      this.dialogRef.close()
      this.router.navigate(["/dashboard"]);
    }
    catch (e) {
      this.signInError = "Invalid credentials, please try again.";
    }
    finally {
      this.awaitingSignIn = false;
    }
    
  }

  async validateEmail(email : string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  async goToRegister(){
    this.router.navigate(['/register']);
  }

}
