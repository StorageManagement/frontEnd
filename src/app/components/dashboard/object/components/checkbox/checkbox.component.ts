import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { FormsModule } from '@angular/forms';

export interface UserItemI {
  user: string;
  email: string;
  avatar: string;
  has_access: boolean;
}
@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [NzDividerComponent, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  @Input()
  public userItem!: UserItemI;

  @Output()
  public onCheckboxChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
}
