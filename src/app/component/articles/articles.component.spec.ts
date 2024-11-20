import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ArticlesComponent } from './articles.component';
import * as ArticleActions from '../../store/article.actions';
import { Article } from '../../model/article.model';
import { provideMockStore } from '@ngrx/store/testing';
import { selectAllArticles } from '../../store/article.selectors';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let store: Store;
  let router: Router;
  let dispatchSpy: jasmine.Spy;
  const initialState:any = {
    articles: [
      { id: 1, title: 'Article 1', author: 'Author 1', scheduledDate: new Date(), views: 100, isEditorPick: true },
      { id: 2, title: 'Article 2', author: 'Author 2', scheduledDate: new Date(), views: 50, isEditorPick: false },
      { id: 3, title: 'Article 3', author: 'Author 3', scheduledDate: new Date(), views: 200, isEditorPick: true },
    ],
  };
  const mockArticles: Article[] = [
    {
      id: 1,
      title: 'Article 1',
      author: 'Author 1',
      views: 100,
      scheduledDate: new Date('2024-01-01'), 
      isEditorPick: true,
      category: '',
      content: null,
      status: '',
      isFavourite: false
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        provideMockStore({
          selectors: [
            { selector: selectAllArticles, value: initialState.articles },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort articles by latest, popular, and editorPick', () => {
    component.filteredArticles = [...mockArticles];
    component.sortOption = 'latest';
    component.sortArticles();
    expect(component.filteredArticles[0].id).toBe(1);
    component.sortOption = 'popular';
    component.sortArticles();
    expect(component.filteredArticles[0].id).toBe(1);
    component.sortOption = 'editorPick';
    component.sortArticles();
    expect(component.filteredArticles[0].id).toBe(1);
  });


  it('should navigate to discover page when exploreArticle is called', () => {
    component.exploreArticle();
    expect(router.navigate).toHaveBeenCalledWith(['/discover']);
  });

  it('should dispatch loadArticles action on init', () => {
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(ArticleActions.loadArticles());
  });
  it('should load articles from the store', () => {
    component.ngOnInit();
    component.articles$.subscribe((articles:any) => {
      expect(articles).toEqual(initialState.articles);
    });
  });

  it('should sort articles by editor pick', () => {
    component.filteredArticles = [...initialState.articles];
    component.sortOption = 'editorPick';
    component.sortArticles();

    expect(component.filteredArticles).toEqual(
      [...initialState.articles].sort((a, b) => (a.isEditorPick === b.isEditorPick ? 0 : a.isEditorPick ? -1 : 1))
    );
  });
  it('should sort articles by popularity', () => {
    component.filteredArticles = [...initialState.articles];
    component.sortOption = 'popular';
    component.sortArticles();

    expect(component.filteredArticles).toEqual(
      [...initialState.articles].sort((a, b) => b.views - a.views)
    );
  });
  it('should sort articles by latest', () => {
    component.filteredArticles = [...initialState.articles];
    component.sortOption = 'latest';
    component.sortArticles();

    expect(component.filteredArticles).toEqual(
      [...initialState.articles].sort((a, b) => +b.scheduledDate - +a.scheduledDate)
    );
  });
  it('should paginate articles correctly', () => {
    component.filteredArticles = [...initialState.articles];
    component.articlesPerPage = 2;
    component.currentPage = 1;
    component.updatePaginatedArticles();

    expect(component.paginatedArticles).toEqual(initialState.articles.slice(0, 2));

    component.currentPage = 2;
    component.updatePaginatedArticles();

    expect(component.paginatedArticles).toEqual(initialState.articles.slice(2, 4));
  });


});
