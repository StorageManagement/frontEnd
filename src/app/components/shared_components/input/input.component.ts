import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export interface TextInputPropertiesI {
  type: 'text' | 'password';
  placeholder: string;
  name: string;
}
@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [FormsModule, NgForOf, NgStyle, NgIf, IconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  @Input()
  public value!: string;

  @Input()
  public textInputProperties?: TextInputPropertiesI;

  @Output()
  public valueChange: EventEmitter<string> = new EventEmitter<string>();

  protected nameArray: { letter: string; index: number }[] = [];

  protected passwordVisible: boolean = false;

  ngOnInit(): void {
    if (this.textInputProperties?.name.length) {
      for (let i = 0; i < this.textInputProperties?.name.length; i++) {
        const char = this.textInputProperties?.name[i];
        this.nameArray.push({
          letter: char,
          index: i,
        });
      }
    }
  }
}
