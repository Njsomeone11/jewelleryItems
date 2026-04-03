import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JewelleryService {
  private baseUrl = 'http://localhost:8080/jewellery';

  constructor(private http: HttpClient) {}

  getAllData() {
    return this.http.get<any>(`${this.baseUrl}/getItems`);
  }

  createItem(data: any) {
    return this.http.post(`${this.baseUrl}/createItem`, data);
  }

  updateItem(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/updateItem/${id}`, data);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.baseUrl}/deleteItem/${id}`, {
      responseType: 'text'
    });
  }
}
