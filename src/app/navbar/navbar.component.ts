import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent {

  constructor() { }

  links = [
    {
      url: "/news",
      name: "News"
    },
    {
      url: "/history",
      name: "History"
    },
    {
      url: "/sponsori",
      name: "Sponsors"
    },
    {
      url: "/contact",
      name: "Contact"
    }
  ]
}


