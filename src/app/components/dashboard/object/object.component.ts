import {Component, Input} from '@angular/core';
import { ButtonComponent } from '../../shared_components/button/button.component';
import { ButtonPropertiesI } from '../../shared_components/button/models/button-properties';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import {Serialized_data} from "../services/dashboard-api.service";
import {LogoChangerPipe} from "./pipes/logo-changer.pipe";

@Component({
  selector: 'app-object',
  standalone: true,
  imports: [ButtonComponent, NzPopoverDirective, NzDividerComponent, LogoChangerPipe],
  templateUrl: './object.component.html',
  styleUrl: './object.component.scss',
})
export class ObjectComponent {
  @Input()
  public serialized_data:Serialized_data = {
    name: '',
    size: '',
    date: '',
    extension: ''
  }
  protected optionsButtonProperties: ButtonPropertiesI = {
    type: 'text',
    icon: {
      class: 'icon-more',
      color: '#000',
      size: '2rem',
    },
  };
  protected shareButtonProperties: ButtonPropertiesI = {
    type: 'text',
    text: 'share',
    color: '#000',
    icon: {
      class: 'icon-share',
      color: '#000',
      size: '2rem',
    },
  };
  protected downloadButtonProperties: ButtonPropertiesI = {
    type: 'text',
    text: 'download',
    color: '#000',
    icon: {
      class: 'icon-download',
      color: '#000',
      size: '2rem',
    },
  };
  protected deleteButtonProperties: ButtonPropertiesI = {
    type: 'text',
    text: 'delete',
    color: '#000',
    icon: {
      class: 'icon-delete',
      color: '#000',
      size: '2rem',
    },
  };
  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(this.serialized_data)
  }
}
