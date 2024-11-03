import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {

  articleArray: Array<any> = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getArticle('article').subscribe({
      next: (data) => {
        this.articleArray = data
      },
      error: (error) => {
          console.error('Error occurred:', error);
      }
    });
  }

}
