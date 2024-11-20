import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ArticleDetailsComponent } from './article-details.component';
import {  selectAuthor, selectRelatedArticles, selectAuthorArticles, selectLoading, selectError } from '../../store/article.selectors';
import { AuthService } from '../../service/auth.service';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;
  let store: MockStore;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  const initialState = {
    articles: [],
    author: null,
    relatedArticles: [],
    authorArticles: [],
    loading: false,
    error: null,
  };

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [ArticleDetailsComponent], 
      
      providers: [
        {provide: AuthService, useValue: mockAuthService },
        provideMockStore({
          initialState, 
          selectors: [
            { selector: selectAuthor, value: null },
            { selector: selectRelatedArticles, value: [] },
            { selector: selectAuthorArticles, value: [] },
            { selector: selectLoading, value: false },
            { selector: selectError, value: null },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }), 
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
    it('should have observable selectors initialized', () => {
    expect(component.articles$).toBeDefined();
    expect(component.author$).toBeDefined();
    expect(component.relatedArticles$).toBeDefined();
    expect(component.authorArticles$).toBeDefined();
    expect(component.loading$).toBeDefined();
    expect(component.error$).toBeDefined();
  });  
});
