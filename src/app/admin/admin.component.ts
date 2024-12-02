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
  imageid: number = -1
  imagePreview: string | ArrayBuffer | null = null
  imageWidth: number = 80
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
    console.log(this.imageWidth)
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
  uploadImage(): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      if (this.selectedImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Img = reader.result as string;
          const base64Data = base64Img.split(',')[1];
  
          this.apiService.postImage('image', { data: base64Data, width: this.imageWidth }).subscribe({
            next: (response) => {
              console.log('Image posted successfully:', response);
              this.imageid = response.ID; // Assuming response.ID is the image ID
              this.imagePreview = null;
              resolve(this.imageid); // Resolve with the image ID
            },
            error: (error) => {
              console.error('Error posting image:', error);
              reject(error); // Reject if there's an error
            }
          });
        };
  
        reader.readAsDataURL(this.selectedImage);
      } else {
        resolve(undefined); // Resolve with undefined if no image is selected
      }
    });
  }
  
  async submitPost() {
    // Prevent multiple submissions
    if (this.submitCooldown) return;
    this.submitCooldown = true;
  
    try {
      // Set the API key
      this.apiService.apiKey = this.passwordPost;
  
      // Upload the image and wait for the image ID
      let imageId = await this.uploadImage();
      if (!imageId) {
        imageId = null
      }
      // Set the article data with the image ID
      const articleData = {
        title: this.title,
        imageid: imageId,
        content: this.content
      };
  
      // Post the article
      this.apiService.postArticle('article', articleData).subscribe({
        next: (response) => {
          console.log('Article posted successfully:', response);
          this.title = '';
          this.content = '';
          this.passwordPost = '';
        },
        error: (error) => {
          console.error('Error posting article:', error);
        },
        complete: () => {
          this.submitCooldown = false;
        }
      });
    } catch (error) {
      console.error('Failed to submit post:', error);
      this.submitCooldown = false;
    }
  }

  submitDelete() {
    if (this.submitCooldown) {
        return;
    }
    this.submitCooldown = true;

    this.apiService.apiKey = this.passwordDelete;

    this.apiService.getArticle('article').subscribe({
        next: (articles) => {
            if (articles && Array.isArray(articles)) {
                // Find the article by ID
                const article = articles.find((a: any) => a.ID == this.id);

                if (article) {
                    console.log(article.ImageID);  // Log ImageID to see if it's available
                    if (article.ImageID) {
                        // Step 2: Delete the associated image
                        this.apiService.deleteImage('image', article.ImageID).subscribe({
                            next: (imageResponse) => {
                                console.log('Image deleted: ', imageResponse);

                                // Step 3: Now delete the article
                                this.apiService.deleteArticle('article', this.id).subscribe({
                                    next: (articleResponse) => {
                                        console.log('Article deleted: ', articleResponse);
                                        // Clear the ID and password after success
                                        this.id = '';
                                        this.passwordDelete = '';
                                    },
                                    error: (error) => {
                                        console.error('Error deleting article:', error);
                                    },
                                    complete: () => {
                                        // Reset cooldown here after both delete actions
                                        this.submitCooldown = false;
                                    }
                                });
                            },
                            error: (error) => {
                                console.error('Error finding image:', error);
                                // If image deletion fails, do not proceed with article deletion
                                this.submitCooldown = false;
                            }
                        });
                    } else {
                        console.log("Article had no image.")
                        // Step 3: Now delete the article
                        this.apiService.deleteArticle('article', this.id).subscribe({
                          next: (articleResponse) => {
                              console.log('Article deleted: ', articleResponse);
                              // Clear the ID and password after success
                              this.id = '';
                              this.passwordDelete = '';
                          },
                          error: (error) => {
                              console.error('Error deleting article:', error);
                          },
                          complete: () => {
                              // Reset cooldown here after both delete actions
                              this.submitCooldown = false;
                          }
                      });
                    }
                } else {
                    console.error('Article with ID not found');
                    this.submitCooldown = false;
                }
            } else {
                console.error('Invalid articles response:', articles);
                this.submitCooldown = false;
            }
        },
        error: (error) => {
            console.error('Error fetching articles:', error);
            this.submitCooldown = false;
        }
    });
  }
}

