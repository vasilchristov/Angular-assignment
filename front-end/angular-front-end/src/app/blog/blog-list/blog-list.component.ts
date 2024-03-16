import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

interface Blog {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit{

  blogs: Blog[] = [];

  constructor(private blogService: BlogService){}

  ngOnInit(): void {
    this.blogs = this.blogService.getBlogs();
    console.log(this.blogs);
  }
}
