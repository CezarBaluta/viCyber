import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnInit {

  constructor() { }

  links = [
    {
      url: "/",
      name: "Home"
    },
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
    }
  ]

  menuIsOpen: boolean = false
  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen
    if(this.menuIsOpen) {
      this.navbar.dataset.state = ''
    } else {
      this.navbar.dataset.state = 'active'
    }
  }

  navbar: HTMLElement
  ngOnInit(): void {
      this.navbar = document.querySelector('nav')
  }
}


