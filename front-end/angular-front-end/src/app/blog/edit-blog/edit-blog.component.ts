import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent {

  blog: BlogPost | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBlogPost();
  }

  getBlogPost(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.blogService.getBlogPostById(+postId).subscribe({
        next: (data) => this.blog = data,
        error: (err) => console.error(err)
      });
    }
  }

  updateBlog(form: any): void {
    if (this.blog && this.blog.id) {
      this.blogService.updateBlogPost(this.blog.id, this.blog).subscribe({
        next: () => this.router.navigate(['/blog-details', this.blog?.id]),
        error: (err) => console.error(err)
      });
    }
  }
}
