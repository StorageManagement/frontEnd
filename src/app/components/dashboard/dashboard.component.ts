import { Component } from '@angular/core';
import {
  IconComponent,
  IconPropertiesI,
} from '../shared_components/icon/icon.component';
import { SearchBoxComponent } from '../shared_components/search-box/search-box.component';
import { ButtonComponent } from '../shared_components/button/button.component';
import { ButtonPropertiesI } from '../shared_components/button/models/button-properties';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { ObjectComponent } from './object/object.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IconComponent,
    SearchBoxComponent,
    ButtonComponent,
    NzAvatarComponent,
    ObjectComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected logoIcon: IconPropertiesI = {
    multiPath: {
      containerClass: 'icon-logo',
      size: '3rem',
      paths: [
        {
          class: 'path1',
          color: 'var(--primary-color)',
        },
        {
          class: 'path2',
          color: 'var(--primary-color)',
        },
        {
          class: 'path3',
          color: 'var(--primary-color)',
        },
      ],
    },
  };

  protected uploadButtonProperties: ButtonPropertiesI = {
    type: 'primary',
    text: 'Upload',
    color: 'var(--white-color)',
    icon: {
      class: 'icon-Upload',
    },
  };
}
