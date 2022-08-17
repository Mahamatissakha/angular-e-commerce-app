import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProducatservicesService {

  constructor(private http: HttpClient) { }

  postProducatdata(data: any){
    return this.http.post<any>('http://localhost:3000/Product', data);
  }

  getProducatdata(){
    return this.http.get<any>('http://localhost:3000/Product');
  }

  putProducatdata(data: any, id: number){
    return this.http.put<any>(`http://localhost:3000/Product/${id}`, data);
  }

  deleteProducatdata(id: number){
    return this.http.delete<any>(`http://localhost:3000/Product/${id}`);
  }

}
