import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/blog/blog.model';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/blog/blog.service';
import { AuthorsService } from 'src/app/authors/authors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  blogs: BlogPost[] = [];
  authorName: string | undefined;
  author$ = this.authorsService.currentAuthor$;

  constructor(
    private blogService: BlogService, 
    private router: Router,
    private authorsService: AuthorsService
    ) { 
      this.author$ = this.authorsService.currentAuthor$;
    }

    ngOnInit(): void {
      const userEmail = localStorage.getItem('email');
      if (userEmail) {
        this.blogService.getUserPostsByEmail(userEmail).subscribe(posts => {
          this.blogs = posts;
        }, error => {
          console.error('Error fetching posts for user:', error);
        });
      }
  
      const userName = localStorage.getItem('name');
      if (userName) {
        this.authorsService.fetchAndUpdateAuthorByName(userName);
      }
    }

    editPost(postId: number): void {
      this.router.navigate(['/edit-blog', postId]);
    }

    viewDetails(postId: number): void {
      this.router.navigate(['/blog-details', postId]);
    }
}
