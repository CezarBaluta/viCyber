import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from "@angular/http";
import { Routes , RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import { ContactContentComponent } from './contact-content/contact-content.component';
import { HistoryComponent } from './history/history.component';
const appRoutes: Routes = [
  {path:'', component:HomeContentComponent},
  {path:'contact', component:ContactContentComponent},
  {path:'history', component:HistoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeContentComponent,
    FooterComponent,
    ContactContentComponent,
    HistoryComponent
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
