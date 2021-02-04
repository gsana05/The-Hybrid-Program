import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { promise } from 'protractor';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) { }

  
  public async canActivate(): Promise<boolean> {
    
    return new Promise((resolve, _reject) => {

      const userId = ""
       
      if(userId == null){
        console.log("userId is undefined: " + userId); 
        this.router.navigate(["/welcome"]);
        resolve(false)
      }
      else{
        console.log("userId found (auth-guard-service): " + userId); 
        resolve(true)
      }

    });
  }
  
}
