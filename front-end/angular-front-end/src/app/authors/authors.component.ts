import { Component, OnInit } from '@angular/core';
import { AuthorsService } from './authors.service';
import { Author } from './authors.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{
  authors: Author[] = [];

  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.authorsService.getAllAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }
}
