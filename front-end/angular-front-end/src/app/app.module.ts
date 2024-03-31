import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogModule } from './blog/blog.module';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { AuthorsListComponent } from './authors/authors-list/authors-list.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsListComponent,
    AuthorDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    BlogModule,
    FormsModule,
    UserModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
