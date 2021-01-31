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
    /*
    return new Promise((resolve, _reject) => {
      this.authSvc.currentUser.pipe(map(user => !!user), take(1)).subscribe(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['login']);
        }
        resolve(isLoggedIn)
      });
    });
    */
   return true; 
  }
  
}
