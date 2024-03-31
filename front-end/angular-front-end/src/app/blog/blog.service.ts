import { Injectable } from '@angular/core';
import { BlogPost } from '../blog/blog.model'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  
private apiUrl = 'http://localhost:8081/api/blogposts';

constructor(private http: HttpClient, private router: Router) {}

getAllBlogPosts(): Observable<BlogPost[]> {
  return this.http.get<BlogPost[]>(this.apiUrl);
}

getBlogPostById(id: number): Observable<BlogPost> {
  return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
}

createBlogPost(blogPost: BlogPost): Observable<BlogPost> {
  return this.http.post<BlogPost>(this.apiUrl, blogPost);
}

updateBlogPost(id: number, blogPost: BlogPost): Observable<BlogPost> {
  return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, blogPost);
}

deleteBlogPost(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

getUserPostsByEmail(email: string): Observable<BlogPost[]> {
  return this.http.get<BlogPost[]>(`${this.apiUrl}/posts/byUser?email=${encodeURIComponent(email)}`);
}

// maybe remove from here later
navigateToEditPost(id: number): void {
  this.router.navigate(['/edit-blog', id]);
}
}
