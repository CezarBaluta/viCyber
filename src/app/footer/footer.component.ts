import { Component, OnInit } from '@angular/core';
import { SponsorsService } from '../sponsors.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent {
  constructor(public sponsorService: SponsorsService) { }
}
