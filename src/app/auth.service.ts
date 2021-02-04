import { Injectable } from '@angular/core';
//import * as firebase from 'firebase/app';
import {environment} from "../environments/environment"
import { collectionData } from 'rxfire/firestore';
import { authState } from 'rxfire/auth';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  constructor(private test : AngularFireAuth) {
    
   }

  async signUpUser(email : string, password : string) : Promise<string> {

    const auth = await this.test.createUserWithEmailAndPassword(email, password);
    if(auth.user != null){
      return auth.user.uid; 
    }
    else{
      return "";
    }
    
  }

  async LogInUser(email : string, password : string) : Promise<string> {
    const auth = await this.test.signInWithEmailAndPassword(email, password);
    if(auth.user != null){
      return auth.user.uid; 
    }
    else{
      return "";
    }
  }

  async LogOutUser(){
    
    const signout = this.test.signOut();
    console.log("user has signed out ");
  }

}
