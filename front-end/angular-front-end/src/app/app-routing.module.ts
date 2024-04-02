import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './shared/header/about/about.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { ContactComponent } from './shared/header/contact/contact.component';
import { NewBlogComponent } from './blog/new-blog/new-blog.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { AuthorsListComponent } from './authors/authors-list/authors-list.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BlogListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'createBlog', component: NewBlogComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'authors', component: AuthorsListComponent},
  { path: 'author-details/:id', component: AuthorDetailsComponent },
  { path: 'edit-blog/:id', component: EditBlogComponent , canActivate: [AuthGuard] },
  { path: 'blog-details/:id', component: BlogDetailComponent },
  { path: 'edit-author/:id', component: EditUserComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
