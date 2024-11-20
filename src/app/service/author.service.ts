import { Injectable } from '@angular/core';
import { Author } from '../model/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authors: Author[] = [
    {
      id: 1,
      title: 'Article One',
      category: 'Health',
      content: {
        image: 'assets/article3.jpg',
        description: 'This is the full content of the article about Angular...',
      },
      scheduledDate:new Date('2023-10-01'),
      status:'publish',
      author: 'Author A',
      views: 100,
      isEditorPick: true,
      relatedArticles: [2, 3]
    },
    {
      id: 2,
      title: 'Article Two',
      category: 'Technology',
      content: {
        image: 'assets/article1.jpg',
        description: 'This article explains the basics of TypeScript...',
      },
      scheduledDate: new Date('2023-10-05'),
      status:'publish',
      author: 'Author B',
      views: 200,
      isEditorPick: false,
      relatedArticles: [4, 5]
    },  
    {
      id: 3,
      title: 'Article Three',
      category: 'Technology',
      content: {
        image: 'assets/article2.jpg',
        description: 'Spacious apartment with a park view and modern amenities, perfect for a small family.',
      },
      scheduledDate: new Date('2023-10-02'),
      status:'publish',
      author: 'Author C',
      views: 2000,
      isEditorPick: false,
    },
    {
      id: 4,
      title: 'Article four',
      category: 'Technology',
      content: {
        image: 'assets/article4.jpg',
        description: 'A modern studio apartment with a great view and close proximity to shops and restaurants.',
      },
      scheduledDate: new Date('2023-10-06'),
      status:'publish',
      author: 'Author D',
      views: 1000,
      isEditorPick: true,
    },
  ];

  getAuthors(): Author[] {
    return this.authors;
  }

  getAuthorByName(name: string): Author | undefined {
    return this.authors.find(author => author.author === name);
  }
  postArticle(article: any): void {
    this.authors.push(article);
     }
}
