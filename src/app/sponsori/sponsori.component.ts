import { Component, OnInit } from '@angular/core';
import { SponsorsService } from '../sponsors.service';

@Component({
    selector: 'app-sponsori',
    templateUrl: './sponsori.component.html',
    styleUrls: ['./sponsori.component.css'],
    standalone: false
})
export class SponsoriComponent {
  constructor(public sponsorsService: SponsorsService) {}
  
  tags: string = 'sponsor'
}
