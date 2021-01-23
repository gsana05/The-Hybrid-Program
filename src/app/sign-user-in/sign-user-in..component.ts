import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit():void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signIn(email: string, password: string) {

    try {
      if (!email) {
        throw { message: "Please enter an email address" };
      }
      if (!password) {
        throw { message: "Please enter your password" };
      }

      if(email && password){
        this.errorMessage = "You have entered a correct email and password";
      }

    }
    catch (err) {
      this.errorMessage = err.message;
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
