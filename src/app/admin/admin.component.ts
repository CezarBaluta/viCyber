import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // post article
  title: string
  content: string
  passwordPost: string

  //  delete article
  id: string
  passwordDelete: string

  // shared
  submitCooldown: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
  
  submitPost() {
    // submit button debounce
    if (this.submitCooldown) {
      return
    }
    this.submitCooldown = true

    // set data
    this.apiService.apiKey = this.passwordPost
    const articleData = {
      title: this.title,
      content: this.content
    } 

    // post
    this.apiService.postArticle('article', articleData).subscribe({
      next: (response) => {
        console.log('Article posted successfully:', response);
        this.title = ''
        this.content = ''
        this.passwordPost = ''
      },
      error: (error) => {
        console.error('Error posting article:', error);
      },
      complete: () => {
        this.submitCooldown = false;
      }
    })
  }

  submitDelete() {
    if (this.submitCooldown) {
      return
    }
    this.submitCooldown = true

    this.apiService.apiKey = this.passwordDelete

    this.apiService.deleteArticle('article', this.id).subscribe({
      next: (response) => {
        console.log('Article deleted: ', response);
        this.id = ''
        this.passwordDelete = ''
      },
      error: (error) => {
        console.error('Error deleting article:', error);
      },
      complete: () => {
        this.submitCooldown = false;
      }
    })
  }
}

