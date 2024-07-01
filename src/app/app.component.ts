import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingService } from './components/loading/services/loading.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'storage-management';
  isShow: boolean = false;
  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.isShow.subscribe((value) => {
      setTimeout(() => {
        this.isShow = value;
      }, 0);
    });
  }
}
