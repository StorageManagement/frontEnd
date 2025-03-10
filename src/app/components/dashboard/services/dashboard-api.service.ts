import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenGetter } from '../../../app.config';

export type DownloadRequestDataI = {
  object_name: string;
};
export type DownloadResponseDataI = {
  download_link: string;
};
export type PostUploadRequestDataI = {
  object_name: string;
  size: number;
};
export type PostUploadResponseDataI = {
  detail: string;
};
export type RequestUploadDataI = {
  object_name: string;
};

export type ResponseUploadDataI = {
  url: string;
  fields: {
    key: string;
    AWSAccessKeyId: string;
    policy: string;
    signature: string;
  };
};

export type Serialized_data = {
  name: string;
  size: string;
  date: string;
  owner: string;
  extension: string;
};

export interface ObjectsResponseI {
  serialized_data: Serialized_data[];
  total_objects_number: string;
}

export interface ObjectsRequestI {
  pagination: string;
}

export interface DeleteRequestI {
  object_name: string;
}

export interface DeleteResponseI {
  detail: string;
}

export interface GetUsersRequestI {
  object_name: string;
}

export interface GetUsersResponseI {
  user: string;
  email: string;
  avatar: string;
  has_access: string;
}

export interface Permissions {
  user: string;
  allowed: string;
}

export interface ChangeUsersRequestI {
  object_name: string;
  permissions: Permissions[];
}

export interface ChangeUsersResponseI {
  detail: string;
}
@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(private http: HttpClient) {}

  public getObjects(requestData: ObjectsRequestI) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenGetter()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<ObjectsResponseI>(
      'http://127.0.0.1:8000/api/storage/objects/',
      requestData,
      { headers },
    );
  }

  public getUploadData(requestData: RequestUploadDataI) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenGetter()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseUploadDataI>(
      'http://localhost:8000/api/storage/upload/',
      requestData,
      { headers },
    );
  }

  public sendPostUploadData(requestData: PostUploadRequestDataI) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenGetter()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<PostUploadResponseDataI>(
      'http://localhost:8000/api/storage/post-upload/',
      requestData,
      { headers },
    );
  }

  public getDownloadData(requestData: DownloadRequestDataI) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenGetter()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<DownloadResponseDataI>(
      'http://localhost:8000/api/storage/download/',
      requestData,
      { headers },
    );
  }

  public deleteData(requestData: DeleteRequestI) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenGetter()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<DeleteResponseI>(
      'http://localhost:8000/api/storage/delete/',
      requestData,
      { headers },
    );
  }

  public getUsersData(requestData: GetUsersRequestI) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenGetter()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<GetUsersResponseI[]>(
      'http://localhost:8000/api/storage/users/',
      requestData,
      { headers },
    );
  }

  public changeUsersPermission(requestData: ChangeUsersRequestI) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenGetter()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<ChangeUsersResponseI>(
      'http://localhost:8000/api/storage/permissions/',
      requestData,
      { headers },
    );
  }
}
