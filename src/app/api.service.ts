import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = ''
  private apiUrl = 'https://vicyberapi-806288902557.europe-west3.run.app'

  constructor(private http: HttpClient) { }
  
  private getHeadersRead(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private getHeadersWrite(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.apiKey,
      'Content-Type': 'application/json'
    });
  }

  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers: this.getHeadersRead() })
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeadersWrite() });
  }
}
