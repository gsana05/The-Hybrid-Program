import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayareaComponent } from './playarea/playarea.component';
import { AboutMeComponent } from './about-me/about-me.component';
import {ProgramsComponent} from './programs/programs.component';
import { HomeComponent } from './home/home.component';
import { SignUserIn } from './sign-user-in/sign-user-in..component';
import { CreateUserAccount } from './create-user-account/create-user-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['welcome']);


const redirectToDashboard = redirectLoggedInTo(['dashboard']);
const redirectToDashboardWithLogger = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>
  pipe(
    tap(() => console.info('it will be redirected')),
    redirectToDashboard
  );
  
const routes: Routes = [
  {path: 'playarea', component: PlayareaComponent},
  //{ path: 'welcome', component: WelcomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToDashboardWithLogger}},
  //{ path: 'about', component: AboutMeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToDashboardWithLogger}},
  //{ path: 'programs', component: ProgramsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToDashboardWithLogger}},
  //{ path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToDashboardWithLogger}},
  //{ path: 'create-account', component: SignUserIn, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToDashboardWithLogger}},
  //{ path:'log-in', component: CreateUserAccount, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToDashboardWithLogger}},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin}},
  
  { path: 'welcome', component: WelcomeComponent,
   canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToDashboardWithLogger},
    children:[
      {path: 'about', component : AboutMeComponent},
      { path: 'programs', component: ProgramsComponent},
      { path: 'home', component: HomeComponent},
      { path: 'create-account', component: SignUserIn},
      { path:'log-in', component: CreateUserAccount}
    ]
  },

  { path: '**', redirectTo: '/welcome' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

 
