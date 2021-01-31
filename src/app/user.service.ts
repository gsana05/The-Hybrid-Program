import { Injectable } from '@angular/core';
import {environment} from "../environments/environment"
import { collectionData } from 'rxfire/firestore';
import { authState } from 'rxfire/auth';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './types';
import * as admin from "firebase-admin";
import { AngularFireDatabase } from '@angular/fire/database';
import { observable, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection : AngularFirestoreCollection<User>;
  userDocument : AngularFirestoreDocument<User> | undefined; 
  user$ : Observable<User[]> | undefined;
  player : Observable<User> | undefined;
  //private _currentUser = new BehaviorSubject<seven.CurrentUser | null>(null);
  userTest = this.afs.collection("users").valueChanges()

  user: User = {
    userId:'',
    name: '',
    email: ''
  }

  constructor(private afs: AngularFirestore, private authFirebase : AngularFireAuth) { 
    this.userCollection = this.afs.collection("users")
  }

  async updateUser(userId : String){
    const p = this.afs.firestore.collection("users").doc("C5LcTlJfNELRcYFi67dx").update({"name": "Liverpoooll"})
  }

  async getUserListener(userId : string){
    //this.player = this.userDocument?.collection("users").doc(userId).valueChanges()
    
  }

  async getUser(userId : string){

    const i = this.afs.firestore.collection("users").doc("C5LcTlJfNELRcYFi67dx").get()
    i.then(document =>{
      if(document.exists){
        let d = document.data() 
        let k = d as User
        let name = k.name
        let email = k.email
        let userId = k.userId
        //d as User
        console.log(`name: ${name}, email: ${email}, userID: ${userId}`)
      }
      else{
        console.log("document not found")
      }
    })
  }

  /*
  async getAllUsersListenersSnapshoe(){
    this.user$ = this.userCollection.snapshotChanges().pipe(changes => {
      return changes.pipe(a => {

        a.forEach(b => {

          b.forEach(k => {

            const data = k.payload.doc.data() as User
            const hey = k.payload.doc.id
            return data

          })

        })

      });

    });
    this.test()
    //return this.user$
  }
  */

  async getAllUsersListeners(){
    this.user$ = this.userCollection.valueChanges()
    this.test()
    //return this.user$
  }

  test(){
    return this.user$
  }

  async getAllUsers(){
    const data = this.afs.collection("users").get()
    data.forEach(doc => {
      doc.forEach(i => {
        const user = i.data() as User
        console.log(`name: ${user.name}, email: ${user.email}, userID: ${user.userId}`)
      })
    })

  }

  async saveUser(userId : string, name : string, email : string){
    this.user.email = email
    this.user.name = name
    this.user.userId = userId
    this.userCollection.doc(userId).set(this.user)
    //this.userCollection.add(this.user)
  }

  async deleteUser(userId : string){
    const p = this.afs.firestore.collection("users").doc(userId).delete()
  }

  
}
