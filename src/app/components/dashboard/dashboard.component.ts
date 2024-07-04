import { Component, OnInit } from '@angular/core';
import {
  IconComponent,
  IconPropertiesI,
} from '../shared_components/icon/icon.component';
import { SearchBoxComponent } from '../shared_components/search-box/search-box.component';
import { ButtonComponent } from '../shared_components/button/button.component';
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
  RequestUploadDataI,
  Serialized_data,
} from './services/dashboard-api.service';
import { Subject } from 'rxjs';

declare var XMLHttpRequest: any;

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

  protected uploadIcon: IconPropertiesI = {
    class: 'icon-Upload',
    color: '#fff',
  };

  protected selectedFile?: File;

  protected paginationData = {
    index: 1,
    totalItems: -1,
  };

  protected userInformation: UserInformation = {
    avatar: '',
    username: '',
    total_volume: 0,
  };

  protected searchValue: string = '';

  protected serializedDataList: Serialized_data[] = [];
  protected enrichedSerializedDataList: Serialized_data[] = [];
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

    this.userInformation.total_volume =
      this.authentication.userInformation.getValue().total_volume;

    this.loadingService.show();
    this.dashboardApiService
      .getObjects({
        pagination: '1',
      })
      .subscribe((items) => {
        this.paginationData.totalItems = Number(items.total_objects_number);
        this.serializedDataList = items.serialized_data;
        this.enrichedSerializedDataList = this.serializedDataList;
        this.loadingService.hide();
      });
  }

  onFileChange(event: Event) {
    if ((event.target as any).files && (event.target as any).files.length) {
      this.selectedFile = (event.target as any).files[0];
      const requestData: RequestUploadDataI = {
        object_name: this.selectedFile?.name ?? '',
      };
      this.loadingService.show();
      this.dashboardApiService
        .getUploadData(requestData)
        .subscribe(async (response) => {
          const formData = new FormData();
          formData.append('key', response.fields.key);
          formData.append('AWSAccessKeyId', response.fields.AWSAccessKeyId);
          formData.append('policy', response.fields.policy);
          formData.append('signature', response.fields.signature);
          if (this.selectedFile) {
            formData.append('file', this.selectedFile);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', response.url);
            let responseFetched: Subject<boolean> = new Subject<boolean>();
            responseFetched.next(false);
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (xhr.status === 204) {
                  responseFetched.next(true);
                } else {
                  console.error('Error:', xhr.statusText);
                }
              }
            };
            xhr.send(formData);
            responseFetched.subscribe((value) => {
              if (value) {
                this.dashboardApiService
                  .sendPostUploadData({
                    object_name: (event.target as any).files[0].name,
                    size: (event.target as any).files[0].size,
                  })
                  .subscribe((response) => {
                    if (response.detail == 'Changes submitted to database.') {
                      this.dashboardApiService
                        .getObjects({
                          pagination: this.paginationData.index.toString(),
                        })
                        .subscribe((objectsResponse) => {
                          this.serializedDataList =
                            objectsResponse.serialized_data;
                          this.enrichedSerializedDataList =
                            this.serializedDataList;
                          this.paginationData.totalItems = Number(
                            objectsResponse.total_objects_number,
                          );
                          this.userInformation.total_volume += (
                            event.target as any
                          ).files[0].size;
                        });
                    }
                  });
                this.loadingService.hide();
              }
            });
          }
        });
    } else {
      this.selectedFile = undefined;
    }
  }

  protected onItemDeleted(item: Serialized_data): void {
    this.serializedDataList = this.serializedDataList.filter(
      (serializedData) => {
        return serializedData.name !== item.name;
      },
    );
    this.enrichedSerializedDataList = this.serializedDataList;
    this.userInformation.total_volume -= Number(item.size);
    this.paginationData.totalItems -= 1;
    this.loadingService.hide();
  }

  protected onSearchValueChanged(value: string): void {
    if (value === '') {
      this.enrichedSerializedDataList = this.serializedDataList;
    } else {
      this.enrichedSerializedDataList = this.serializedDataList.filter(
        (data) => {
          return data.name.toLowerCase().startsWith(value.toLowerCase());
        },
      );
    }
  }

  protected onPageIndexChanged(index: number) {
    this.loadingService.show();
    this.dashboardApiService
      .getObjects({
        pagination: index.toString(),
      })
      .subscribe((items) => {
        this.paginationData.totalItems = Number(items.total_objects_number);
        this.serializedDataList = items.serialized_data;
        this.enrichedSerializedDataList = this.serializedDataList;
        this.loadingService.hide();
      });
  }
}
