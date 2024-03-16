import { Injectable } from '@angular/core';

export interface Blog {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogs: Blog[] = [
    {
      id: 1,
      title: 'Blog Title 1',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'This is a short description of the first blog.'
    },
    {
      id: 2,
      title: 'Blog Title 2',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'This is a short description of the second blog.'
    },
    {
      id: 3,
      title: 'Blog Title 3',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'This is a short description of the third blog.'
    },
    {
      id: 4,
      title: 'Blog Title 4',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'This is a short description of the fourth blog.'
    },
    {
      id: 5,
      title: 'Blog Title 5',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'This is a short description of the fifth blog.'
    },
    {
      id: 6,
      title: 'Blog Title 6',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'This is a short description of the sixth blog.'
    }
  ];

  constructor() {}

  getBlogs(): Blog[] {
    console.log(this.blogs);
    return this.blogs;
  }
}
