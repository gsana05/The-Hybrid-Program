import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayareaComponent } from './playarea/playarea.component';
import { AboutMeComponent } from './about-me/about-me.component';
import {ProgramsComponent} from './programs/programs.component';
import { HomeComponent } from './home/home.component';
import { SignUserIn } from './sign-user-in/sign-user-in..component';
import { CreateUserAccount } from './create-user-account/create-user-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'playarea', component: PlayareaComponent},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'about', component: AboutMeComponent},
  { path: 'programs', component: ProgramsComponent},
  { path: 'home', component: HomeComponent},
  { path: 'create-account', component: SignUserIn},
  { path:'log-in', component: CreateUserAccount},
  { path: 'dashboard', component: DashboardComponent},
  { path: '**', redirectTo: '/welcome' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

 
