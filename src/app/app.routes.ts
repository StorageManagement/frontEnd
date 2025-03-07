import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyEmailPageComponent } from './components/verify-email-page/verify-email-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccessNotGrantedComponent } from './components/access-not-granted/access-not-granted.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'createAccount',
    component: CreateAccountComponent,
  },
  {
    path: 'verifyEmail',
    component: VerifyEmailPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'unAuthorized',
    component: AccessNotGrantedComponent,
  },
];
