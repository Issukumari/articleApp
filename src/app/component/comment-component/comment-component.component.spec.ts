import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponentComponent } from './comment-component.component';
import { Store, StoreModule } from '@ngrx/store';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as ArticleActions from '../../store/article.actions';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommentComponentComponent', () => {
  let component: CommentComponentComponent;
  let fixture: ComponentFixture<CommentComponentComponent>;
  let store: Store;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommentComponentComponent,
        FormsModule,
        CommonModule,
        RouterTestingModule, 
        StoreModule.forRoot({}) 
      ],
      providers: [
        DatePipe 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch loadComments when sort option changes', () => {
    const articleId = '123';
    component.articleId = articleId;
    component.sortComments('oldest');

    expect(dispatchSpy).toHaveBeenCalledWith(ArticleActions.loadComments({ articleId, sortOption: 'oldest' }));
  });
  it('should update sortOption when the select element changes', () => {
    const selectElement = { target: { value: 'oldest' } };
    component.articleId = '123';
    spyOn(component, 'onSortChange').and.callThrough();

    component.onSortChange(selectElement as any);

    expect(component.sortOption).toBe('oldest');
    expect(dispatchSpy).toHaveBeenCalledWith(ArticleActions.loadComments({
      articleId: '123',
      sortOption: 'oldest'
    }));
  });
});
