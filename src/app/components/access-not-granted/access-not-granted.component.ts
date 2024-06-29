import { Component } from '@angular/core';
import { ButtonComponent } from '../shared_components/button/button.component';
import { InputComponent } from '../shared_components/input/input.component';
import { LogoComponent } from '../shared_components/logo/logo.component';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-access-not-granted',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    LogoComponent,
    NgIf,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './access-not-granted.component.html',
  styleUrl: './access-not-granted.component.scss',
})
export class AccessNotGrantedComponent {}
