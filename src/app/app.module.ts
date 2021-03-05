import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';  
import {MatTabsModule} from '@angular/material/tabs';
import { PlayareaComponent } from './playarea/playarea.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProgramsComponent } from './programs/programs.component';
import { HomeComponent } from './home/home.component';
import { SignUserIn } from './sign-user-in/sign-user-in..component';
import { CreateUserAccount } from './create-user-account/create-user-account.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import {environment} from "../environments/environment";
import { DashboardComponent } from './dashboard/dashboard.component';
import * as admin from "firebase-admin";
import { FreeProgramComponent } from './free-program/free-program.component';
import { AdvancedProgramComponent } from './advanced-program/advanced-program.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { JoinFreeProgramComponent } from './join-free-program/join-free-program.component';
import { VideoComponent } from './video/video.component';
import { WorkoutComponent } from './workout/workout.component';
import { FreeProgramCompletedComponent } from './free-program-completed/free-program-completed.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PlayareaComponent,
    AboutMeComponent,
    ProgramsComponent,
    HomeComponent,
    SignUserIn,
    CreateUserAccount,
    DashboardComponent,
    FreeProgramComponent,
    AdvancedProgramComponent,
    StatisticsComponent,
    SettingsComponent,
    JoinFreeProgramComponent,
    VideoComponent,
    WorkoutComponent,
    FreeProgramCompletedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
