import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../authors.service';
import { Author } from '../authors.model';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit{

  author?: Author;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
  ) {}

  ngOnInit() {
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.authorsService.getAuthorById(+authorId).subscribe({
        next: (author) => this.author = author,
        error: () => this.router.navigate(['/authors'])
      });
    } else {
      this.router.navigate(['/authors']);
    }
  }
}
