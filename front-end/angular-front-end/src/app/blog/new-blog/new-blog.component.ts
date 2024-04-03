import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogPost } from '../blog.model';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent {

  constructor(private blogService: BlogService, private router: Router){}

  saveBlog(form: NgForm) {
    const email = localStorage.getItem('email') || '';

    if (email === null) {
      console.error('Author email not found in localStorage');
      return;
    }

      const newBlog: BlogPost = {
        title: form.value.title,
        imageUrl: form.value.imageUrl,
        content: form.value.content,
        authorEmail: email
      };

      this.blogService.createBlogPost(newBlog).subscribe({
        next: (blogPost) => {
          console.log('New blog post created:', blogPost);
          form.reset();
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error creating blog post:', error);
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
