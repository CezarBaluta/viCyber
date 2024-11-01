import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = ''

  constructor(private http: HttpClient) { }
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.apiKey,
      'Content-Type': 'application/json'
    });
  }

  getData(endpoint: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${endpoint}`, { headers: this.getHeaders() })
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() });
  }
}
