import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateAccountFormDataI } from '../create-account.component';
import { LoadingService } from '../../loading/services/loading.service';
import { catchError, throwError } from 'rxjs';
import { loadingError } from '../../../app.component';
export interface CreateAccountResponseI {
  detail: string;
}
@Injectable({
  providedIn: 'root',
})
export class CreateAccountApiService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) {}
  public createAccount(data: CreateAccountFormDataI) {
    this.loadingService.show();
    return this.http
      .post<CreateAccountResponseI>(
        'http://127.0.0.1:8000/api/users/signup/',
        data,
      )
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
