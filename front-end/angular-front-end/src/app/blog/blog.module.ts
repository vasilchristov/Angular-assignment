import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogService } from './blog.service';



@NgModule({
  declarations: [
    BlogListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BlogListComponent,
  ],
  providers: [BlogService]
})
export class BlogModule { }
