import { TestBed } from '@angular/core/testing';
import { AuthorService } from './author.service';
import { Author } from '../model/author.model';

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorService],
    });
    service = TestBed.inject(AuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAuthors', () => {
    it('should return a list of authors', () => {
      const authors: Author[] = service.getAuthors();
      expect(authors.length).toBeGreaterThan(0);
      expect(authors[0].author).toBeDefined();
    });
  });

  describe('getAuthorByName', () => {
    it('should return the correct author by name', () => {
      const authorName = 'Author A';
      const author = service.getAuthorByName(authorName);
      expect(author).toBeDefined();
      expect(author?.author).toBe(authorName);
    });

    it('should return undefined if author name is not found', () => {
      const authorName = 'Non-existing Author';
      const author = service.getAuthorByName(authorName);
      expect(author).toBeUndefined();
    });
  });

  describe('postArticle', () => {
    it('should add a new article to the authors list', () => {
      const newAuthor: Author = {
        id: 5,
        title: 'Article Five',
        category: 'Health',
        content: {
          image: 'assets/article5.jpg',
          description: 'This is the full content of the article about Health...',
        },
        scheduledDate: new Date('2023-10-10'),
        status: 'publish',
        author: 'Author E',
        views: 50,
        isEditorPick: false,
        relatedArticles: [1, 2],
      };

      const initialAuthorCount = service.getAuthors().length;
      service.postArticle(newAuthor);

      const updatedAuthorCount = service.getAuthors().length;
      expect(updatedAuthorCount).toBeGreaterThan(initialAuthorCount);
      expect(service.getAuthors()).toContain(newAuthor);
    });
  });
});
