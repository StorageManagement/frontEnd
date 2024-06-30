import { Injectable } from '@angular/core';
import { LoginFormDataI } from '../login-page.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../../loading/services/loading.service';

export interface LoginFormResponse {
  refresh: string;
  access: string;
  username: string;
  avatar: string;
}

export interface UserInformation {
  username: string;
  avatar: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public tokens: BehaviorSubject<Partial<LoginFormResponse>> =
    new BehaviorSubject<Partial<LoginFormResponse>>({});

  public userInformation: BehaviorSubject<UserInformation> =
    new BehaviorSubject<UserInformation>({ username: '', avatar: '' });

  public isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) {}
  public authenticate(data: LoginFormDataI) {
    this.loadingService.show();
    return this.http.post<LoginFormResponse>(
      'http://127.0.0.1:8000/api/users/login/',
      data,
    );
  }
}
