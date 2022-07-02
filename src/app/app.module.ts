import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import { ContactContentComponent } from './contact-content/contact-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeContentComponent,
    FooterComponent,
    ContactContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
