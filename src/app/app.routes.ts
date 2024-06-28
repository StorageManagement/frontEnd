import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

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
];
