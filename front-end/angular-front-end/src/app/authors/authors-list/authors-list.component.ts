import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { Author } from '../authors.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit{
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
