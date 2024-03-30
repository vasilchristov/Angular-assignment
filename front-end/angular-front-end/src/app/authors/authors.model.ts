export class Author {
    id: number;
    name: string;
    email: string;
    imageUrl?: string;
  
    constructor(id: number, name: string, email: string, imageUrl?: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.imageUrl = imageUrl;
    }
  }