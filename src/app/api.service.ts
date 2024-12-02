import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiKey = ''
  // private apiUrl = 'https://vicyberapi-806288902557.europe-west3.run.app'
  private apiUrl = 'http://localhost:8080'

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

  getArticle(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers: this.getHeadersRead() })
  }

  postArticle(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeadersWrite() });
  }

  deleteArticle(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}/${id}`, { headers: this.getHeadersWrite() })
  }

  getImage(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers: this.getHeadersRead() })
  }

  postImage(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeadersWrite() });
  }

  deleteImage(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}/${id}`, { headers: this.getHeadersWrite() })
  }
}
