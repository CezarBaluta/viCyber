import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: false
})
export class AdminComponent {

  constructor(private apiService: ApiService) {}

  selectedFile: File | null = null
  selectedFileName: string = ''
  articleTag: string = ''
  apiKey = ''
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = input.files[0].name
    }
  }

  uploadFile() {
    if(!this.selectedFile) {
      alert('please select a file first')
      return
    }

    const formData = new FormData()

    if(!this.articleTag) {
      this.articleTag = 'any'
    }
    const tags = {
      tags: this.articleTag
    }
    formData.append('metadata', JSON.stringify(tags))
    formData.append('file', this.selectedFile)

    this.apiService.apiKey = this.apiKey

    this.apiService.postArticle(formData).subscribe({
      next: (res) => {
        alert('Succesful upload')
      },
      error: (err) => {
        alert(`Error uploading file: ${err}`)
      }
    })
  }

  deleteID: string = ''
  deleteArticle() {
    this.apiService.apiKey = this.apiKey
    this.apiService.deleteArticle(this.deleteID).subscribe({
      next: (res) => {
        alert('Delete succesful')
      },
      error: (err) => {
        alert(`Error deleting article: ${err}`)
      } 
    })
  }
}

