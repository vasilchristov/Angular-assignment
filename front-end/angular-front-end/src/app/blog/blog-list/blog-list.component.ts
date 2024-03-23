import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog.model'

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit{

  blogs: BlogPost[] = [];

  constructor(private blogService: BlogService){}

  ngOnInit(): void {
    this.blogService.getAllBlogPosts().subscribe({
      next: (data) => {
        this.blogs = data;
        console.log(this.blogs);
      },
      error: (e) => console.error(e)
    });
  }
}
