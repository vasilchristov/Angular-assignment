import { Component } from '@angular/core';
import { Author } from 'src/app/authors/authors.model';
import { AuthorsService } from 'src/app/authors/authors.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  author: Author | undefined;

  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const authorId = this.route.snapshot.params['id'];
    if (authorId) {
      this.authorsService.getAuthorById(authorId).subscribe({
        next: (author) => this.author = author,
        error: () => console.error('Error fetching author')
      });
    }
  }

  updateAuthor(): void {
    if (this.author && this.author.id) {
      this.authorsService.updateAuthor(this.author.id, this.author).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (error) => console.error('Error updating author', error)
      });
   }
  }
}
