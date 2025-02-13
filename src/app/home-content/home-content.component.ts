import { Component } from '@angular/core';

@Component({
    selector: 'app-home-content',
    templateUrl: './home-content.component.html',
    styleUrls: ['./home-content.component.css'],
    standalone: false
})
export class HomeContentComponent {
  constructor() { }
  
  tags: string = 'home'
}
