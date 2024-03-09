import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    BlogDetailComponent,
    BlogListComponent,
    EditBlogComponent,
    NewBlogComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BlogModule { }
