import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isShow: Subject<boolean> = new Subject<boolean>();

  public show(): void {
    this.isShow.next(true);
  }

  public hide(): void {
    this.isShow.next(false);
  }
}
