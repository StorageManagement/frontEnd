import { Component } from '@angular/core';
import {IconComponent, IconPropertiesI} from "../icon/icon.component";

@Component({
  selector: 'app-logo',
  standalone: true,
    imports: [
        IconComponent
    ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  protected logoIcon: IconPropertiesI = {
    multiPath: {
      containerClass: 'icon-logo',
      size: '3rem',
      paths: [
        {
          class: 'path1',
          color: 'var(--white-color)',
        },
        {
          class: 'path2',
          color: 'var(--white-color)',
        },
        {
          class: 'path3',
          color: 'var(--white-color)',
        },
      ],
    },
  };

}
