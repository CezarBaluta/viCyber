import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'viCyber';

  constructor(private service: AppServiceService){

  }

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
