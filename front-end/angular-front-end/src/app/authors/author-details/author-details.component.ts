import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../authors.service';
import { Author } from '../authors.model';
import { BlogPost } from 'src/app/blog/blog.model';
import { BlogService } from 'src/app/blog/blog.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit{

  author?: Author;
  blogs: BlogPost[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.authorsService.getAuthorById(+authorId).subscribe({
        next: (author) => {
          this.author = author;
          this.fetchAuthorPosts(author.email);
        },
        error: () => this.router.navigate(['/authors'])
      });
    } else {
      this.router.navigate(['/authors']);
    }
  }

  private fetchAuthorPosts(email: string) {
    this.blogService.getUserPostsByEmail(email).subscribe(posts => {
      this.blogs = posts;
    }, error => {
      console.error('Error fetching posts for user:', error);
    });
  }
}
