import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { AuthService } from 'src/app/core/auth.service';
import { AuthorsService } from 'src/app/authors/authors.service';
import { BlogPost } from '../blog.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit{

  blog: BlogPost | undefined;
  isAuthor: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private blogService: BlogService,
    private authService: AuthService,
    private authorsService: AuthorsService
    ) {}

  ngOnInit(): void {
    this.isAuthor.next(false);

    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.blogService.getBlogPostById(+postId).subscribe(post => {
          this.blog = post;
          if (post.authorName) {
            const authName = localStorage.getItem('name');
            this.isAuthor.next(post.authorName === authName);
          } else {
            this.isAuthor.next(false);
          }
        }, error => {
          console.error('Error fetching blog post:', error);
          this.isAuthor.next(false);
        });
      }
    });
  }

  deletePost(): void {
    if(this.blog && this.blog.id !== undefined && confirm('Are you sure you want to delete this post?')) {
      this.blogService.deleteBlogPost(this.blog.id).subscribe(() => {
          this.router.navigate(['/dashboard']); 
      });
  } else {
      console.error('Unable to delete: Blog or blog ID is undefined.');
  }
  }

  editPost(): void {
    if(this.blog) {
      this.router.navigate(['/edit-blog', this.blog.id]);
    }
  }
}
