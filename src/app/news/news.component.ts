import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class NewsComponent implements OnInit {

  @Input() tags: string = 'any'

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.apiService.getArticle(this.tags).subscribe({
      next: (message) => {
        console.log(message)
        const parent = document.querySelector('#parent')
        for(let article of message) {
          const div = this.createBox()
          div.innerHTML = article.HTML
          const id = document.createElement('p')
          id.innerHTML = 'ID: ' + article.ID
          div.appendChild(id)
          parent.appendChild(div)
        }
        this.applyStyles(parent)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  applyStyles(parent) {
    const headers = parent.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headers.forEach((title) => {
      title.classList.add('text-white', 'text-center')
    })
    const paragraphs = parent.querySelectorAll('p')
    paragraphs.forEach((p) => {
      p.classList.add('text-gray-300')
    })
    const imgs = parent.querySelectorAll('img')
    imgs.forEach((img) => {
      img.classList.add('mx-auto')
    })
  }

  createBox(): HTMLDivElement {
    const div = document.createElement('div')
    div.classList.add('bg-gray-900', 'rounded-2xl', 'p-[20px]', 'mb-[3vh]', 'border-1', 'border-gray-300')
    return div
  }
}
