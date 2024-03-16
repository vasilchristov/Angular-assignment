import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogService } from './blog.service';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';



@NgModule({
  declarations: [
    BlogListComponent,
    NewBlogComponent,
    EditBlogComponent
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
