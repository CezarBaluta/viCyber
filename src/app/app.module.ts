import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { Routes , RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import { ContactContentComponent } from './contact-content/contact-content.component';
import { HistoryComponent } from './history/history.component';
import { SponsoriComponent } from './sponsori/sponsori.component';
import { NewsComponent } from './news/news.component';
const appRoutes: Routes = [
  {path:'', component:HomeContentComponent},
  {path:'contact', component:ContactContentComponent},
  {path:'history', component:HistoryComponent},
  {path:'sponsori', component:SponsoriComponent},
  {path:'news', component:NewsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeContentComponent,
    FooterComponent,
    ContactContentComponent,
    HistoryComponent,
    SponsoriComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
