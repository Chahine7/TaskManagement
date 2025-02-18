
import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AccessGuardService} from "./services/guard/access-guard.service";
import { HomeComponent } from './components/home/home.component';
export const routes: Routes = [

    {
      path: 'home', component: HomeComponent, canActivate: [AccessGuardService]
    },
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'register', component: RegisterComponent
    }
    ];