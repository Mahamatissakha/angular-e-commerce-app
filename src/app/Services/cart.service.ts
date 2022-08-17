import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  postCart(data: any) {
    return this.http.post<any>('http://localhost:3000/Cart', data);
  }

  getCart() {
    return this.http.get<any>('http://localhost:3000/Cart');
  }

  putCart(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/Cart/${id}`, data);
  }

  deleteCart(id: number) {
    return this.http.delete<any>(`http://localhost:3000/Cart/${id}`);
  }
}
