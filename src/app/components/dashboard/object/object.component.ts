import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../shared_components/button/button.component';
import { ButtonPropertiesI } from '../../shared_components/button/models/button-properties';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import {
  DashboardApiService,
  Serialized_data,
} from '../services/dashboard-api.service';
import { LogoChangerPipe } from './pipes/logo-changer.pipe';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SearchBoxComponent } from '../../shared_components/search-box/search-box.component';
import { LoadingService } from '../../loading/services/loading.service';

export interface UserItem {
  name: string;
  imageUrl: string;
  checked: boolean;
  email: string;
}
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
    extension: '',
  };
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

  protected usersItems: UserItem[] = [
    {
      name: 'artaz',
      checked: false,
      imageUrl:
        'https://saatsheni.com/storage/4a4da2041c057327aa7287ae5e78c2b6/Card-thumbanil-copy.webp',
      email: 'noobazi1212@gmail.com',
    },
    {
      name: 'ali',
      imageUrl:
        'https://saatsheni.com/storage/4a4da2041c057327aa7287ae5e78c2b6/Card-thumbanil-copy.webp',
      checked: false,
      email: 'noobazi1212@gmail.com',
    },
    {
      name: 'ali',
      imageUrl:
        'https://saatsheni.com/storage/4a4da2041c057327aa7287ae5e78c2b6/Card-thumbanil-copy.webp',
      checked: false,
      email: 'noobazi1212@gmail.com',
    },
    {
      name: 'ali',
      imageUrl:
        'https://saatsheni.com/storage/4a4da2041c057327aa7287ae5e78c2b6/Card-thumbanil-copy.webp',
      checked: false,
      email: 'noobazi1212@gmail.com',
    },
    {
      name: 'ali',
      imageUrl:
        'https://saatsheni.com/storage/4a4da2041c057327aa7287ae5e78c2b6/Card-thumbanil-copy.webp',
      checked: false,
      email: 'noobazi1212@gmail.com',
    },
    {
      name: 'ali',
      imageUrl:
        'https://saatsheni.com/storage/4a4da2041c057327aa7287ae5e78c2b6/Card-thumbanil-copy.webp',
      checked: false,
      email: 'noobazi1212@gmail.com',
    },
    {
      name: 'ali',
      imageUrl:
        'https://saatsheni.com/storage/4a4da2041c057327aa7287ae5e78c2b6/Card-thumbanil-copy.webp',
      checked: false,
      email: 'noobazi1212@gmail.com',
    },
  ];
  visible: boolean = false;

  constructor(
    private dashboardApiService: DashboardApiService,
    private loadingService: LoadingService,
  ) {}

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(this.serialized_data);
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
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
}
