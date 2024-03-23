import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './shared/header/about/about.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { ContactComponent } from './shared/header/contact/contact.component';
import { NewBlogComponent } from './blog/new-blog/new-blog.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BlogListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'createBlog', component: NewBlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
