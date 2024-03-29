import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/blog/blog.model';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/blog/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userPosts: BlogPost[] = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      this.blogService.getUserPostsByEmail(userEmail).subscribe(posts => {
        this.userPosts = posts;
      }, error => {
        console.error('Error fetching posts for user:', error);
      });
    } else {
      console.warn('No user email found in localStorage');
    }
  }
  

  editPost(postId: number): void {
    this.router.navigate(['/edit-blog', postId]);
  }

  viewDetails(postId: number): void {
    this.router.navigate(['/blog-details', postId]);
  }
}
