import { Component, OnInit } from '@angular/core';
import {
  IconComponent,
  IconPropertiesI,
} from '../shared_components/icon/icon.component';
import { SearchBoxComponent } from '../shared_components/search-box/search-box.component';
import { ButtonComponent } from '../shared_components/button/button.component';
import { ButtonPropertiesI } from '../shared_components/button/models/button-properties';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { ObjectComponent } from './object/object.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import {
  AuthenticationService,
  UserInformation,
} from '../login-page/services/authentication.service';
import { LoadingService } from '../loading/services/loading.service';
import {
  DashboardApiService,
  Serialized_data,
} from './services/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IconComponent,
    SearchBoxComponent,
    ButtonComponent,
    NzAvatarComponent,
    ObjectComponent,
    NgForOf,
    NzPaginationComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('headerAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('contentAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
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

  protected paginationData = {
    index: 1,
    totalItems: -1,
  };

  protected userInformation: UserInformation = { avatar: '', username: '' };

  protected serializedDataList: Serialized_data[] = [];
  constructor(
    private readonly authentication: AuthenticationService,
    private readonly loadingService: LoadingService,
    private readonly dashboardApiService: DashboardApiService,
  ) {}

  ngOnInit(): void {
    this.userInformation.username =
      this.authentication.userInformation.getValue().username;
    this.userInformation.avatar =
      this.authentication.userInformation.getValue().avatar;
    console.log(this.authentication.userInformation.getValue().avatar);
    this.loadingService.show();
    this.dashboardApiService
      .getObjects({
        pagination: '1',
      })
      .subscribe((items) => {
        console.log(items);
        this.paginationData.totalItems = Number(items.total_objects_number);
        this.serializedDataList = items.serialized_data;
        this.loadingService.hide();
      });
  }
}
