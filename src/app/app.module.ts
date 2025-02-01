import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { Routes , RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import { ContactContentComponent } from './contact-content/contact-content.component';
import { HistoryComponent } from './history/history.component';
import { SponsoriComponent } from './sponsori/sponsori.component';
import { NewsComponent } from './news/news.component';
import { AdminComponent } from './admin/admin.component';
const appRoutes: Routes = [
  {path:'', component:HomeContentComponent},
  {path:'contact', component:ContactContentComponent},
  {path:'history', component:HistoryComponent},
  {path:'sponsori', component:SponsoriComponent},
  {path:'news', component:NewsComponent},
  {path:'admin', component:AdminComponent}
];

@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        HomeContentComponent,
        FooterComponent,
        ContactContentComponent,
        HistoryComponent,
        SponsoriComponent,
        NewsComponent,
        AdminComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
