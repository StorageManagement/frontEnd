import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginFormResponse } from '../../login-page/services/authentication.service';
import { CreateAccountFormDataI } from '../create-account.component';
import { LoadingService } from '../../loading/services/loading.service';
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
    return this.http.post<CreateAccountResponseI>(
      'http://127.0.0.1:8000/api/users/signup/',
      data,
    );
  }
}
