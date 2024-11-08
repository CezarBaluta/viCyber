import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {
  articleArray: Array<any> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getArticle('article').subscribe({
      next: async (data) => {
        // Fetch each article and its image (base64 encoded)
        this.articleArray = await Promise.all(
          data.map(async (article: any) => {
            // If ImageID exists, fetch the image base64 data
            if (article.ImageID) {
              try {
                const imageResponse = await this.apiService.getImage(`image/${article.ImageID}`).toPromise();
                // Assign the base64 image data directly
                article.imageUrl = `data:image/jpeg;base64,${imageResponse.data}`; // or the correct mime type
              } catch (error) {
                console.error('Error loading image:', error);
              }
            }
            return article;
          })
        );
      },
      error: (error) => {
        console.error('Error occurred:', error);
      }
    });
  }
}
