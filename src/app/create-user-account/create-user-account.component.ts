import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder,  private router: Router) {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
   }


  ngOnInit(): void {}

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
      this.awaitingSignUp = true;
      this.signUpError = null;
      this.router.navigate(["/verification"], { queryParams: { email } });
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
  }

  async goToLogIn(){
    this.router.navigate(['/login']);
  }

}
