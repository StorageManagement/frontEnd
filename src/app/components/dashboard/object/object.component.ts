import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../shared_components/button/button.component';
import { ButtonPropertiesI } from '../../shared_components/button/models/button-properties';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import {
  DashboardApiService,
  GetUsersResponseI,
  Permissions,
  Serialized_data,
} from '../services/dashboard-api.service';
import { LogoChangerPipe } from './pipes/logo-changer.pipe';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SearchBoxComponent } from '../../shared_components/search-box/search-box.component';
import { LoadingService } from '../../loading/services/loading.service';
import { AuthenticationService } from '../../login-page/services/authentication.service';

@Component({
  selector: 'app-object',
  standalone: true,
  imports: [
    ButtonComponent,
    NzPopoverDirective,
    NzDividerComponent,
    LogoChangerPipe,
    NzModalModule,
    NzCheckboxComponent,
    FormsModule,
    NgForOf,
    CheckboxComponent,
    SearchBoxComponent,
    NgIf,
  ],
  templateUrl: './object.component.html',
  styleUrl: './object.component.scss',
})
export class ObjectComponent {
  @Input()
  public serialized_data: Serialized_data = {
    name: '',
    size: '',
    date: '',
    owner: '',
    extension: '',
  };

  @Output()
  public onItemDeleted: EventEmitter<void> = new EventEmitter<void>();

  protected optionsButtonProperties: ButtonPropertiesI = {
    type: 'text',
    icon: {
      class: 'icon-more',
      color: '#000',
      size: '2rem',
    },
  };
  protected shareButtonProperties: ButtonPropertiesI = {
    type: 'text',
    text: 'share',
    color: '#000',
    icon: {
      class: 'icon-share',
      color: '#000',
      size: '2rem',
    },
  };

  protected submitShareButtonProperties: ButtonPropertiesI = {
    type: 'primary',
    text: 'continue',
    color: '#fff',
    icon: {
      class: 'icon-share',
      color: '#fff',
      size: '2rem',
    },
  };
  protected downloadButtonProperties: ButtonPropertiesI = {
    type: 'text',
    text: 'download',
    color: '#000',
    icon: {
      class: 'icon-download',
      color: '#000',
      size: '2rem',
    },
  };
  protected deleteButtonProperties: ButtonPropertiesI = {
    type: 'text',
    text: 'delete',
    color: '#000',
    icon: {
      class: 'icon-delete',
      color: '#000',
      size: '2rem',
    },
  };

  protected isVisible: boolean = false;

  protected usersItems: GetUsersResponseI[] = [];
  protected enrichedUsersItems: GetUsersResponseI[] = [];

  protected searchValue: string = '';
  visible: boolean = false;

  constructor(
    private dashboardApiService: DashboardApiService,
    private loadingService: LoadingService,
    protected authenticationService: AuthenticationService,
  ) {}

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(this.serialized_data);
  }

  showModal(): void {
    this.dashboardApiService
      .getUsersData({
        object_name: this.serialized_data.name,
      })
      .subscribe((response) => {
        this.usersItems = response;
        this.enrichedUsersItems = this.usersItems;
        this.isVisible = true;
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onDownloadObjectClicked() {
    this.loadingService.show();
    this.dashboardApiService
      .getDownloadData({
        object_name: this.serialized_data.name,
      })
      .subscribe((response) => {
        const filename = response.download_link;
        const link = document.createElement('a');
        link.classList.add('download-link');
        link.href = filename;
        link.download = 'downloaded-file.txt';
        link.click();

        window.URL.revokeObjectURL(link.href);
        document.querySelector('.download-link')?.remove();
        this.loadingService.hide();
      });
  }

  protected onDeleteButtonClicked() {
    this.loadingService.show();
    this.dashboardApiService
      .deleteData({
        object_name: this.serialized_data.name,
      })
      .subscribe((response) => {
        if (response.detail === 'Object deleted successfully') {
          this.onItemDeleted.emit();
        }
      });
  }

  protected onContinueButtonClicked() {
    const permissions: Permissions[] = [];
    this.usersItems.forEach((userData) => {
      permissions.push({
        user: userData.user,
        allowed: userData.has_access,
      });
    });

    this.dashboardApiService
      .changeUsersPermission({
        object_name: this.serialized_data.name,
        permissions: permissions,
      })
      .subscribe((response) => {
        if (response.detail === 'Permissions changed successfully.') {
          console.log('success');
          this.isVisible = false;
        }
      });
  }

  protected onCheckboxChanged(value: boolean, item: GetUsersResponseI) {
    if (value) {
      item.has_access = 'true';
    } else {
      item.has_access = 'false';
    }
  }

  protected onSearchValueChanged(value: string): void {
    if (value === '') {
      this.enrichedUsersItems = this.usersItems;
    } else {
      this.enrichedUsersItems = this.usersItems.filter((item) => {
        return item.user.toLowerCase().startsWith(value.toLowerCase());
      });
    }
  }
}
