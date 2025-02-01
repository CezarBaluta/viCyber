import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'viCyber';
  
  constructor(){}

  ngOnInit(){
    // this.getNewsFromAPI();
  }

  // getNewsFromAPI(){
  //   this.service.getNews().subscribe((response)=>{
  //     console.log(response);
      
  //   },(error) =>{
  //     console.log(error);
  //     }
  //   );
  // }
}
