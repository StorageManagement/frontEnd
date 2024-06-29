import { Injectable } from '@angular/core';
import { LoginFormDataI } from '../login-page.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
export interface LoginFormResponse {
  refresh: string;
  access: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public tokens: Subject<LoginFormResponse> = new Subject<LoginFormResponse>();
  public isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}
  public authenticate(data: LoginFormDataI) {
    return this.http.post<LoginFormResponse>(
      'http://127.0.0.1:8000/api/users/login/',
      data,
    );
  }
}
