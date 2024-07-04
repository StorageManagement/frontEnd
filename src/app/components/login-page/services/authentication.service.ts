import { Injectable } from '@angular/core';
import { LoginFormDataI } from '../login-page.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { LoadingService } from '../../loading/services/loading.service';
import { loadingError } from '../../../app.component';

export interface LoginFormResponse {
  refresh: string;
  access: string;
  username: string;
  avatar: string;
  total_volume: number;
}

export interface UserInformation {
  username: string;
  avatar: string;
  total_volume: number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public tokens: BehaviorSubject<Partial<LoginFormResponse>> =
    new BehaviorSubject<Partial<LoginFormResponse>>({});

  public userInformation: BehaviorSubject<UserInformation> =
    new BehaviorSubject<UserInformation>({
      username: '',
      avatar: '',
      total_volume: 0,
    });

  public isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) {}
  public authenticate(data: LoginFormDataI) {
    this.loadingService.show();
    return this.http
      .post<LoginFormResponse>('http://127.0.0.1:8000/api/users/login/', data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    loadingError.next(true);
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
