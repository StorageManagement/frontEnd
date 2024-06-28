import { Component, Input } from '@angular/core';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
export interface IconPropertiesI {
  multiPath?: {
    containerClass: string;
    size: string;
    paths: { class: string }[];
  };
  class?: string;
  size?: string;
  color?: string;
}
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgStyle, NgIf, NgForOf],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input()
  public iconProperties!: IconPropertiesI;
}
