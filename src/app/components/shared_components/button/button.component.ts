import { Component, Input } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ButtonPropertiesI } from './models/button-properties';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NzButtonComponent, NgIf, NgStyle, IconComponent, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input()
  public buttonProperties: ButtonPropertiesI = {};
}
