import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {

  articleArray: Array<any>
  rootArticleDiv: HTMLElement

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.rootArticleDiv = document.getElementById("root-article-div");

    this.apiService.getData('article').subscribe({
      next: (data) => {
          this.articleArray = data
          this.articleArray.forEach(element => {
            let articleDiv = document.createElement("div")
            articleDiv.classList.add("article-div")

            let h2: HTMLDivElement = document.createElement("h2")
            h2.innerHTML = element.Title
            h2.classList.add("article-title")
            articleDiv.appendChild(h2)

            let p: HTMLParagraphElement = document.createElement("p")
            p.innerHTML = element.Content
            p.classList.add("article-content")
            articleDiv.appendChild(p)

            this.rootArticleDiv.appendChild(articleDiv)
          });
      },
      error: (error) => {
          console.error('Error occurred:', error);
      }
    });
  }

}
