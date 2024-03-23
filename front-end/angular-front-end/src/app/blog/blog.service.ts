import { Injectable } from '@angular/core';
import { BlogPost } from '../blog/blog.model'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  
  private apiUrl = 'http://localhost:8081/api/blogposts';

  constructor(private http: HttpClient) {}

//  createBlogPost(blogPost: BlogPost): Observable<BlogPost> {
//   return this.http.post<BlogPost>(this.apiUrl, blogPost).pipe(
//    tap(response => console.log('createBlogPost response:', response)),
//     catchError(error => {
//       console.error('createBlogPost error:', error);
//        throw error;
//    })
//  );
//}

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

}
