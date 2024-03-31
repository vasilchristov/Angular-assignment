import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from './authors.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private apiUrl = 'http://localhost:8081/api/authors';

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  getAuthorByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/byName/${name}`);
  }

  updateAuthor(authorId: number, authorData: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/${authorId}`, authorData);
  }
}
