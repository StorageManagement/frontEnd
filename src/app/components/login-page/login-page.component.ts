import { Component } from '@angular/core';
import {
  IconComponent,
  IconPropertiesI,
} from '../shared_components/icon/icon.component';
import {
  InputComponent,
  TextInputPropertiesI,
} from '../shared_components/text-input/input.component';
import { ButtonComponent } from '../shared_components/button/button.component';
import { ButtonPropertiesI } from '../shared_components/button/models/button-properties';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [IconComponent, InputComponent, ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('welcomeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('inputAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 1000ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginPageComponent {
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
}
