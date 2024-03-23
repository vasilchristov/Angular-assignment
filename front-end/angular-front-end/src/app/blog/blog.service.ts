import { Injectable } from '@angular/core';
import { BlogPost } from '../blog/blog.model'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogs: BlogPost[] = [
    {
      id: 1,
      title: 'Blog Title 1',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'This is a short description of the first blog.'
    },
    {
      id: 2,
      title: 'Blog Title 2',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'This is a short description of the second blog.'
    },
    {
      id: 3,
      title: 'Blog Title 3',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'This is a short description of the third blog.'
    },
    {
      id: 4,
      title: 'Blog Title 4',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'This is a short description of the fourth blog.'
    },
    {
      id: 5,
      title: 'Blog Title 5',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'This is a short description of the fifth blog.'
    },
    {
      id: 6,
      title: 'Blog Title 6',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'This is a short description of the sixth blog.'
    }
  ];
  
  private apiUrl = 'http://localhost:8081/api/blogposts';

  constructor(private http: HttpClient) {}

  createBlogPost(blogPost: BlogPost): Observable<BlogPost> {
   return this.http.post<BlogPost>(this.apiUrl, blogPost).pipe(
    tap(response => console.log('createBlogPost response:', response)),
     catchError(error => {
       console.error('createBlogPost error:', error);
        throw error;
    })
  );
}


  // not yet done
  getBlogs(): BlogPost[] {
    console.log(this.blogs);
    return this.blogs;
  }


}
