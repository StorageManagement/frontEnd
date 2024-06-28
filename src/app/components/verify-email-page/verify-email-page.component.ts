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
import { NgIf } from '@angular/common';
import { ButtonPropertiesI } from '../shared_components/button/models/button-properties';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-verify-email-page',
  standalone: true,
  imports: [ButtonComponent, IconComponent, InputComponent, NgIf],
  templateUrl: './verify-email-page.component.html',
  styleUrl: './verify-email-page.component.scss',
  animations: [
    trigger('titleAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms 1000ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('descriptionAnimation', [
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
  ],
})
export class VerifyEmailPageComponent {
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

  protected submitButtonProperties: ButtonPropertiesI = {
    type: 'primary',
    text: 'Login',
    color: 'var(--white-color)',
  };

  protected email: string = 'mitchellensink@gmail.com';
  protected urlChange: boolean = false;
  public constructor(private router: Router) {}
  protected async onCreateAccountClicked(): Promise<void> {
    this.urlChange = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await this.router.navigateByUrl('/createAccount');
  }
}
