import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { discardPeriodicTasks } from '@angular/core/testing';

interface RootArticle {
  Tags: string
  HTML: string
  ID: string
}

interface ArticleRef {
  div: HTMLDivElement
  rootArticle: RootArticle
  fullSize: boolean
}

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

  parent: HTMLDivElement

  ngOnInit(): void {
    this.apiService.getArticle(this.tags).subscribe({
      next: (message) => {
        console.log(message)
        this.parent = document.querySelector('#parent')
        
        for(let article of message) {
          const articleRef: ArticleRef = {
            div: document.createElement('div'),
            fullSize: false,
            rootArticle: article
          }
          this.render(articleRef)
        }
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  render(article: ArticleRef) {
    article.div = this.createBox()
    article.div.id = article.rootArticle.ID
    article.div.innerHTML = article.rootArticle.HTML

    if(article.fullSize) {
      // in full version, display ID
      const id = document.createElement('p')
      id.innerHTML = 'ID: ' + article.rootArticle.ID
      article.div.appendChild(id)

      // read less button
      const toggleSize: HTMLButtonElement = document.createElement('button')
      toggleSize.innerHTML = 'read less'
      toggleSize.onclick = () => {
        article.fullSize = false
        this.render(article)
      }
      article.div.appendChild(toggleSize)
    }
    if(!article.fullSize) {
      // in partial version, split into 2 side by side divs
      article.div.classList.add('flex')
      const left = document.createElement('div')
      left.classList.add('w-1/2')
      const right = document.createElement('div')
      right.classList.add('w-1/2')
      article.div.classList.add('gap-4')

      // remove some elements
      this.keepOnlyNElements(article.div, 'img', 1)
      this.keepOnlyNElements(article.div, 'p', 2)

      // put the remaining elements into the divs
      left.appendChild(article.div.querySelector('img'))
      const h1 = article.div.querySelector('h1')
      let p = article.div.querySelectorAll('p')[0]
      if(p.innerText == "") { // fix bug where the p that has the image in it is displayed instead of the text p
        p = article.div.querySelectorAll('p')[1]
      } 
      if(window.innerWidth > 768) {
        p.innerHTML = p.innerHTML.substring(0, 1000)
        right.appendChild(h1)
      } else {
        p.innerHTML = p.innerHTML.substring(0, 140)
      }
      right.appendChild(p)

      // read more button
      const toggleSize: HTMLButtonElement = document.createElement('button')
      toggleSize.innerHTML = 'read more'
      toggleSize.onclick = () => {
        article.fullSize = true
        this.render(article)
      }
      right.appendChild(toggleSize)

      // clear div and append side by side divs
      article.div.replaceChildren()
      article.div.appendChild(left)
      article.div.appendChild(right)
    }

    this.applyStyles(article.div)
    document.getElementById(article.rootArticle.ID)?.remove()
    this.parent.appendChild(article.div)
  }

  keepOnlyNElements(parent: HTMLDivElement, elementToRemove: string, n: number) {
    const elems = parent.querySelectorAll(elementToRemove)
    elems.forEach((elem) => {
      if(n != 0) {
        n--
      } else {
        elem.remove()
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
      p.classList.add('text-gray-300', 'text-justify')
    })
    if(window.innerWidth < 800) {
      paragraphs.forEach((p) => {
        p.classList.add('text-xs')
      })
    }
    const imgs = parent.querySelectorAll('img')
    imgs.forEach((img) => {
      img.classList.add('mx-auto')
    })
    const buttons = parent.querySelectorAll('button')
    buttons.forEach((b) => {
      b.classList.add('text-blue-500', 'border-1', 'rounded', 'p-[5px]')
    })
  }

  createBox(): HTMLDivElement {
    const div = document.createElement('div')
    div.classList.add('bg-gray-900', 'rounded-2xl', 'p-[20px]', 'mb-[3vh]', 'border-1', 'border-gray-300')
    return div
  }
}
