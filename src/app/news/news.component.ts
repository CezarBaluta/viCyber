import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getData('article').subscribe({
      next: (data) => {
          console.log('Data received:', data);
      },
      error: (error) => {
          console.error('Error occurred:', error);
      },
      complete: () => {
          console.log('Request completed.');
      }
    });
  }

}
