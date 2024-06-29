import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmailService {
  private _email: string = '';
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
