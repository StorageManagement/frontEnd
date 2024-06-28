import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared_components/button/button.component';
import { ButtonPropertiesI } from '../../shared_components/button/models/button-properties';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-object',
  standalone: true,
  imports: [ButtonComponent, NzPopoverDirective, NzDividerComponent],
  templateUrl: './object.component.html',
  styleUrl: './object.component.scss',
})
export class ObjectComponent {
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
    console.log(value);
  }
}
