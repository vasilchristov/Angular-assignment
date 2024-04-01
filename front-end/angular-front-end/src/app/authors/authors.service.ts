import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Author } from './authors.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private apiUrl = 'http://localhost:8081/api/authors';

  // needed when editing an author and component does not refresh
  private currentAuthorSubject = new BehaviorSubject<Author | null>(null);

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  getAuthorByName(name: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/byName/${name}`);
  }

  fetchAndUpdateAuthorByName(name: string): void {
    this.getAuthorByName(name).subscribe(author => {
      this.currentAuthorSubject.next(author);
    }, error => console.error('Error fetching author details', error));
  }

  updateAuthor(authorId: number, authorData: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/${authorId}`, authorData).pipe(
        tap(updatedAuthor => {
            this.setCurrentAuthor(updatedAuthor);
        })
    );
  }

  get currentAuthor$(): Observable<Author | null> {
    return this.currentAuthorSubject.asObservable();
  }

  setCurrentAuthor(author: Author | null): void {
    this.currentAuthorSubject.next(author);
  }

  deleteAuthor(authorId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${authorId}`);
  }
}
