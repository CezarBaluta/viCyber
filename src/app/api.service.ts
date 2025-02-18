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

  private getHeadersWrite(): HttpHeaders {
    return 
  }

  getArticle(tags: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/article/${tags}`)
  }

  postArticle(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/article`, data, { headers: new HttpHeaders({ 'Authorization': this.apiKey }) })
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/article/${id}`, { headers: new HttpHeaders({ 'Authorization': this.apiKey }) })
  }
}
