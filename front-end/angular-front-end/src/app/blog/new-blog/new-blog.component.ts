import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogPost } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent {

  constructor(private blogService: BlogService){}

  saveBlog(form: NgForm) {

    console.log(form.value);

      const newBlog: BlogPost = {
        title: form.value.title,
        imageUrl: form.value.imageUrl,
        content: form.value.content
      };

      

      this.blogService.createBlogPost(newBlog).subscribe({
        next: (blogPost) => {
          console.log('New blog post created:', blogPost);
          form.reset();
        },
        error: (error) => console.error('Error creating blog post:', error)
      });

    
    
  }

}
