import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../components/login-page/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}
  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated.getValue()) {
      return true;
    }

    return this.router.createUrlTree(['/unAuthorized']);
  }
}
