import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isShow: boolean = false;

  public show(): void {
    this.isShow = true;
  }

  public hide(): void {
    this.isShow = false;
  }
}
