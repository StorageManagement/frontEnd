import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../login-page/services/authentication.service';
import { tokenGetter } from '../../../app.config';

export type Serialized_data = {
  name: string;
  size: string;
  date: string;
  extension: string;
};

export interface ObjectsResponseI {
  serialized_data: Serialized_data[];
  total_objects_number: string;
}

export interface ObjectsRequestI {
  pagination: string;
}
@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(
    private http: HttpClient,
  ) {}

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
}
