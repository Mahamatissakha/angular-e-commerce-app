import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  postUserdata(data: any) {
    return this.http.post<any>('http://localhost:3000/Registration', data);
  }

  getUserdata() {
    return this.http.get<any>('http://localhost:3000/Registration');
  }

  putUserdata(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/Registration/' + id, data);
  }

  deleteUserdata(id: number) {
    return this.http.delete<any>('http://localhost:3000/Registration/' + id);
  }
}
