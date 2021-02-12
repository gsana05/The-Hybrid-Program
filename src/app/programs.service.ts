import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { User, FreeProgram } from './types';
import { observable, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  //freePrograms$ : Observable<DocumentChangeAction<FreeProgram>[]> | undefined;
  userCollection : AngularFirestoreCollection<FreeProgram> | undefined;
  //userDocument : AngularFirestoreDocument<FreeProgram> | undefined; 
  programs$ : Observable<FreeProgram[]> | undefined;
  testPrograms : Observable<FreeProgram[]> | undefined;
  userID = "";

  user: User = {
    userId:'',
    name: '',
    email: ''
  }

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {

    console.log("hello");
    this.afAuth.currentUser.then(user => {
      if(user != null){
        this.userID = user.uid
        console.log("userId: " + user.uid);
        this.userCollection = this.afs.collection("users").doc(user.uid).collection("programs");
        console.log("user collection: " + this.userCollection);
        this.addFreeProgramListener();
        this.addFreeProgramListenerSnapshotValues()
      }
    });
    
  }

  async joinFreePrgram(userId : string, FreeProgram : FreeProgram){
    this.afs.firestore.collection("users").doc(userId).collection("programs").add(FreeProgram)
  }

  async addFreeProgramListenerSnapshotValues(){
    this.testPrograms = this.afs.collection("users").doc(this.userID).collection("programs").snapshotChanges().pipe(map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as FreeProgram;
        data.userId = a.payload.doc.id;
        return data; 
      })
    }));

  }

  testingPrograms(){
    return this.testPrograms; 
  }

   async addFreeProgramListener() {
     console.log("testing: " + this.userCollection);
    this.programs$ = this.userCollection?.valueChanges()
    console.log("hei 222: " + this.programs$);
    return this.programs$
  }

  programs(){
    console.log("hei: " + this.programs$);
    return this.programs$
  }




}
