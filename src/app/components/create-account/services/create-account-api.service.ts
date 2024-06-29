import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginFormResponse } from '../../login-page/services/authentication.service';
import { CreateAccountFormDataI } from '../create-account.component';
export interface CreateAccountResponseI {
  detail: string;
}
@Injectable({
  providedIn: 'root',
})
export class CreateAccountApiService {
  constructor(private http: HttpClient) {}
  public createAccount(data: CreateAccountFormDataI) {
    return this.http.post<CreateAccountResponseI>(
      'http://127.0.0.1:8000/api/users/signup/',
      data,
    );
  }
}
