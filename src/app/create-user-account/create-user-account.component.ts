import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.scss']
})
export class CreateUserAccount implements OnInit {

  loginForm: FormGroup;
  errorMessage: string | null = null;
  awaitingSignIn = false;
  signInError: string | null = null;
  awaitingSignUp = false;
  signUpError: string | null = null;

  data : Observable<any> | undefined;
  orderStatus = ""

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private authService : AuthService, public zone: NgZone, private userService : UserService, public dialogRef: MatDialogRef<CreateUserAccount>) {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });


   }


  ngOnInit(): void {

    this.data = new Observable(observer => {

      setTimeout(() => {
        observer.next(`IN progress`);
      }, 2000);

      setTimeout(() => {
        observer.next(`Processing`);
      }, 5000);

      setTimeout(() => {
        observer.next(`Complete`);
      }, 8000);

    });
    
    this.data.subscribe(val => {
      this.orderStatus = val as string;
    });

    
    this.afAuth.onAuthStateChanged((user) => {
      if(user){
        if(user.uid != null){
        //this.router.navigate(['dashboard']);
        this.zone.run(() => { this.router.navigate(['/dashboard']); });
        }
      }
    })

    this.userService.getAllUsersListeners()
    this.userService.test()?.subscribe(users => {
      users.forEach(user => {
        console.log(`here we go baby: name: ${user.name}, email: ${user.email}, userID: ${user.userId}`)
      })
    })
    //this.userService.deleteUser("abc")
    //this.userService.getAllUsers()
      //this.userService.getUser("C5LcTlJfNELRcYFi67dx")
      console.log("helloooo")
    
    
    
  }

  async signUp(name: string, email: string, password: string, confirmpassword: string) {
    
    try {

      if (!name) {
        throw { message: "Please enter your name" };
      }

      if (!email) {
        throw { message: "Please enter an email address" };
      }

      if (!password) {
        throw { message: "Please enter your password" };
      }

      if(password.length < 8){
        throw { message: "Passwords must have at least 8 characters, including a letter, number and symbol." };
      }

      if (!confirmpassword) {
        throw { message: "Please confirm your password" };
      }

      if(password != confirmpassword){
        throw { message: "Passwords do not match" };
      }

      if(email && password && name){
        this.errorMessage = null;
      }

    }
    catch (err) {
      this.errorMessage = err.message;
      return;
    }

    try {
      this.awaitingSignIn = true;
      this.signInError = null;
      const authLogIn = await this.authService.signUpUser(email, password);
      await this.userService.saveUser(authLogIn, name, email)
      this.dialogRef.close()
      //this.router.navigate(["/dashboard"]);
      //window.alert(authLogIn)
    }
    catch (e) {
      this.signInError = "Invalid credentials, please try again.";
      //window.alert(e); 
    }
    finally {
      this.awaitingSignIn = false;
      //window.alert("finallyyyy"); 
    }

    /*
    try {
      this.awaitingSignUp = true;
      this.signUpError = null;
      //this.router.navigate(["/verification"], { queryParams: { email } });
    }
    catch (e) {
      if (e == "InvalidParameterException" || e == "InvalidPasswordException" ) {
        this.signUpError = "Invalid email or password. Passwords must have at least 8 characters, including a letter, number and symbol.";
      }
      else if (e == "UsernameExistsException") {
        this.signUpError = "You are already a user. Please log in.";
      }
      else {
        console.error(e);
        this.signUpError = "An error occurred. Please try again.";
      }
    }
    finally {
      this.awaitingSignUp = false;
    }
    */


  }

  async goToLogIn(){
    this.router.navigate(['/login']);
  }

}
