import {Component} from '@angular/core';
import {IconComponent, IconPropertiesI,} from '../shared_components/icon/icon.component';
import {InputComponent, TextInputPropertiesI,} from '../shared_components/input/input.component';
import {ButtonComponent} from '../shared_components/button/button.component';
import {ButtonPropertiesI} from '../shared_components/button/models/button-properties';
import {animate, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {LogoComponent} from "../shared_components/logo/logo.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [IconComponent, InputComponent, ButtonComponent, NgIf, LogoComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
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
    trigger('logoAnimation', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms 1500ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),

  ],
})
export class LoginPageComponent {
  protected usernameEmailInputProperties: TextInputPropertiesI = {
    name: 'Username or Email',
    placeholder: '',
    type: 'text',
  };
  protected passwordInputProperties: TextInputPropertiesI = {
    name: 'Password',
    placeholder: '',
    type: 'password',
  };
  protected submitButtonProperties: ButtonPropertiesI = {
    type: 'primary',
    text: 'Login',
    color: 'var(--white-color)',
  };

  protected urlChange: boolean = false;
  protected enterDashboard:boolean = false;

  public constructor(private router: Router) {}


  protected async onCreateAccountClicked(): Promise<void> {
    this.urlChange = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await this.router.navigateByUrl('/createAccount');
  }

  protected async onLoginClicked(): Promise<void> {
    this.urlChange = true;
    this.enterDashboard = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await this.router.navigateByUrl('/dashboard');
    this.enterDashboard = false;
  }
}
