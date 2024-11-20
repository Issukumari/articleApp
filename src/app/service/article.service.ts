import { Injectable } from '@angular/core';
import { Article, replyComment } from '../model/article.model';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [
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
      relatedArticles: [2, 3],
      isFavourite: false

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
      relatedArticles: [4, 5],
      isFavourite: true

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
      isFavourite: false

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
      isFavourite: true

    },
  ];
  private comments: any[] = [
    {
      id: "1732087419840",
      author: "User",
      content: "This article is awesome",
      timestamp: "2024-11-20T07:23:39.840Z",
      likes: 0,
      replies: [
          {
              id: "1732087428392",
              author: "User",
              content: "I also like this article",
              timestamp: "2024-11-20T07:23:48.392Z",
              likes: 0
          },
          {
              id: "1732087431048",
              author: "User",
              content: "Comments bring attention to an oversight in a Proceedings B article or propose an opposing",
              timestamp: "2024-11-20T07:23:51.048Z",
              likes: 0
          }
      ]
  }
  ];

  userNameSubject = new Subject<string>();
  userNameObservable$ = this.userNameSubject.asObservable();
  private articleSubject = new Subject<Article>();
  articleObservable$ = this.articleSubject.asObservable();

getArticles() {
  return of(this.articles); 
}
getArticleById(id: number): Article | undefined {
  return this.articles.find(article => article.id === id);
}

getArticlesByAuthor(author: string): Article[] {
  return this.articles.filter(article => article.author === author);
}

getRelatedArticles(relatedArticleIds: number[]): Observable<Article[]> {
  const relatedArticles = this.articles.filter((article) =>
    relatedArticleIds.includes(article.id)
  );
  return of(relatedArticles); 
}

getComments(articleId: string): Observable<Comment[]> {
  const articleComments = this.comments.filter((comment:any) => comment.articleId === articleId);
  return of(articleComments);
}

addComment(comment: any): void {
  this.comments.push(comment);
}

sortComments(comments: replyComment[], criterion: 'newest' | 'oldest'): replyComment[] {
  switch (criterion) {
    case 'newest':
      return comments.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    case 'oldest':
      return comments.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    default:
      return comments;
  }
}
markAsFavorite(listingId: number): Observable<{listing: any | null }> {
  const listing = this.articles.find(l => l.id === listingId);
  if (listing) {      
    return of({listing });
  } else {
    return of({listing: null });
  }
}

postArticle(article: Article): Observable<Article> {
  const mutableArticle = { ...article };

  if (!(mutableArticle.scheduledDate instanceof Date)) {
    mutableArticle.scheduledDate = new Date(mutableArticle.scheduledDate);
  }
  this.articles = [...this.articles, mutableArticle];
  this.articles = this.articles.map((a) => ({
    ...a,
    scheduledDate: a.scheduledDate instanceof Date ? a.scheduledDate : new Date(a.scheduledDate),
  }));
  this.articles.sort((a, b) => b.scheduledDate.getTime() - a.scheduledDate.getTime());
  this.articleSubject.next(mutableArticle);

  return of(mutableArticle);
}

}
