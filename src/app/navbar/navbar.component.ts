import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnInit {

  constructor() { }
  showMenu() {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0";
  }
  
  hideMenu() {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-200px";
  }
  
  // showLogo1(){
  //   document.getElementsByClassName("sponsors")[1].classList.remove('mobile-sponsors');

  //   console.log(document.getElementsByClassName("sponsors"));
  //   var logo = document.getElementsByClassName("sponsors")[0];
  //   logo.classList.add('mobile-sponsors');
  //   console.log(logo.classList);
  //   setTimeout(() => this.showLogo2(),3000) 
  // }
  //  showLogo2(){
  //   document.getElementsByClassName("sponsors")[0].classList.remove('mobile-sponsors');
  //   var logo = document.getElementsByClassName("sponsors")[1];
  //   logo.classList.add('mobile-sponsors');
  //   setTimeout(() => this.showLogo1(),3000)
  // }

  ngOnInit(): void {
    // this.showLogo1();
  }
  
}


