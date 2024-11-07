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
  imagePreview: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
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

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];

      // Optional: Generate a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  // Function to handle image upload
  uploadImage(): void {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Img = reader.result as string
        const base64Data = base64Img.split(',')[1];
        
        this.apiService.postImage('image', { data: base64Data }).subscribe({
          next: (response) => {
            console.log('Image posted successfully:', response);
            this.imagePreview = null
          },
          error: (error) => {
            console.error('Error posting image:', error);
          }
        })
      }
        
      reader.readAsDataURL(this.selectedImage);
    }
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
    this.uploadImage()
    
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

