import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient);
  constructor() { 

  }
  getData<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`http://localhost:3000/${url}`);
  }

  postData<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(`http://localhost:3000/${url}`, data);
  }

  deleteData<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`http://localhost:3000/${url}`);
  }
  putData<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(`http://localhost:3000/${url}`, data);
  }
}