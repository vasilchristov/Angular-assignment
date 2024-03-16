import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './header/about/about.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './header/contact/contact.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports : [
    HeaderComponent, 
    FooterComponent,
    AboutComponent
  ]
})
export class SharedModule { }
