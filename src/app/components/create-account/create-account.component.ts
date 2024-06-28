import { Component } from '@angular/core';
import { ButtonComponent } from '../shared_components/button/button.component';
import {
  IconComponent,
  IconPropertiesI,
} from '../shared_components/icon/icon.component';
import {
  InputComponent,
  TextInputPropertiesI,
} from '../shared_components/input/input.component';
import { ButtonPropertiesI } from '../shared_components/button/models/button-properties';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ButtonComponent, IconComponent, InputComponent, NgIf],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  animations: [
    trigger('welcomeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms 1000ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('inputAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 500ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms 500ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 1000ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('errorAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CreateAccountComponent {
  protected logoIcon: IconPropertiesI = {
    multiPath: {
      containerClass: 'icon-logo',
      size: '3rem',
      paths: [
        {
          class: 'path1',
        },
        {
          class: 'path2',
        },
        {
          class: 'path3',
        },
      ],
    },
  };

  protected usernameInputProperties: TextInputPropertiesI = {
    name: 'Username',
    placeholder: '',
    type: 'text',
  };
  protected emailInputProperties: TextInputPropertiesI = {
    name: 'Email',
    placeholder: '',
    type: 'text',
  };
  protected passwordInputProperties: TextInputPropertiesI = {
    name: 'Password',
    placeholder: '',
    type: 'password',
  };
  protected confirmPasswordInputProperties: TextInputPropertiesI = {
    name: 'Confirm Password',
    placeholder: '',
    type: 'password',
  };
  protected submitButtonProperties: ButtonPropertiesI = {
    type: 'primary',
    text: 'Create Account',
    color: 'var(--white-color)',
  };

  protected urlChange: boolean = false;

  protected formValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  protected isError: boolean = false;
  public constructor(
    private router: Router,
    private notification: NzNotificationService,
  ) {}

  protected async onLoginClicked(): Promise<void> {
    this.urlChange = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await this.router.navigateByUrl('/login');
  }

  protected onSubmitClicked(): void {
    this.isError = this.formValues.password !== this.formValues.confirmPassword;
  }
}
