
import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { Article } from '../model/article.model';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleService],
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getArticles', () => {
    it('should return a list of articles', (done) => {
      service.getArticles().subscribe((articles) => {
        expect(articles.length).toBeGreaterThan(0);
        expect(articles[0].title).toBeDefined();
        done();
      });
    });
  });

  describe('getArticleById', () => {
    it('should return the correct article by ID', () => {
      const articleId = 1;
      const article = service.getArticleById(articleId);
      expect(article).toBeDefined();
      expect(article?.id).toBe(articleId);
    });

    it('should return undefined if article ID is not found', () => {
      const articleId = 100; // Non-existent article ID
      const article = service.getArticleById(articleId);
      expect(article).toBeUndefined();
    });
  });

  describe('getArticlesByAuthor', () => {
    it('should return articles by the correct author', () => {
      const author = 'Author A';
      const articles = service.getArticlesByAuthor(author);
      expect(articles.length).toBeGreaterThan(0);
      expect(articles[0].author).toBe(author);
    });
  });

  describe('getRelatedArticles', () => {
    it('should return related articles by given IDs', (done) => {
      const relatedIds = [2, 3];
      service.getRelatedArticles(relatedIds).subscribe((articles) => {
        expect(articles.length).toBe(2);
        expect(articles[0].id).toBe(2);
        done();
      });
    });
  });

  describe('getComments', () => {
    it('should return comments for a specific article', (done) => {
      const articleId = '1';
      service.getComments(articleId).subscribe((comments) => {
        expect(comments).toBeDefined();
        done();
      });
    });
  });

  describe('addComment', () => {
    it('should add a comment successfully', () => {
      const newComment = { articleId: '1', content: 'Great article!' };
      const initialCommentCount = service['comments'].length;
      service.addComment(newComment);
      expect(service['comments'].length).toBeGreaterThan(initialCommentCount);
    });
  });

  describe('sortComments', () => {
    it('should sort comments by newest first', () => {
      const comments: any[] = [
        { timestamp: new Date('2023-10-01'), content: 'Older comment' },
        { timestamp: new Date('2023-10-03'), content: 'Newer comment' },
      ];
      const sortedComments = service.sortComments(comments, 'newest');
      expect(sortedComments[0].content).toBe('Newer comment');
      expect(sortedComments[1].content).toBe('Older comment');
    });

    it('should sort comments by oldest first', () => {
      const comments: any[] = [
        { timestamp: new Date('2023-10-03'), content: 'Newer comment' },
        { timestamp: new Date('2023-10-01'), content: 'Older comment' },
      ];
      const sortedComments = service.sortComments(comments, 'oldest');
      expect(sortedComments[0].content).toBe('Older comment');
      expect(sortedComments[1].content).toBe('Newer comment');
    });
  });

  describe('markAsFavorite', () => {
    it('should return a marked article if it exists', (done) => {
      const articleId = 1;
      service.markAsFavorite(articleId).subscribe((result) => {
        expect(result.listing).toBeDefined();
        expect(result.listing?.id).toBe(articleId);
        done();
      });
    });

    it('should return null if the article does not exist', (done) => {
      const articleId = 100; 
      service.markAsFavorite(articleId).subscribe((result) => {
        expect(result.listing).toBeNull();
        done();
      });
    });
  });

  describe('postArticle', () => {
    it('should add a new article and return it', (done) => {
      const newArticle: Article = {
        id: 5,
        title: 'Article Five',
        category: 'Health',
        content: {
          image: 'assets/article5.jpg',
          description: 'This is a new article',
        },
        scheduledDate: new Date('2023-10-10'),
        status: 'publish',
        author: 'Author E',
        views: 50,
        isEditorPick: false,
        relatedArticles: [],
        isFavourite: false,
      };

      service.postArticle(newArticle).subscribe((addedArticle) => {
        expect(addedArticle).toBeDefined();
        expect(addedArticle.id).toBe(5);
        done();
      });
    });
  });
});
