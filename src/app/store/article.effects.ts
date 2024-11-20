import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as ArticleActions from './article.actions';
import { ArticleService } from '../service/article.service';
import { AuthorService } from '../service/author.service';
import { Article } from '../model/article.model';

@Injectable()
export class ArticleEffects {
  getPosts$;
  loadAuthor$;
  loadRelatedArticles$;
  loadComments$;
  postArticle$;
  addComment$
  constructor(private readonly actions$: Actions, private readonly articleService: ArticleService,
    private readonly authorService: AuthorService
  ) {
      this.getPosts$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(ArticleActions.loadArticles), 
          mergeMap(() =>
            this.articleService.getArticles().pipe( 
              map((articles) => ArticleActions.loadArticlesSuccess({ articles })),
              catchError((error) => of(ArticleActions.loadArticlesFailure({ error })))
            )
          )
        )
      });
      this.loadAuthor$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(ArticleActions.loadAuthorByName),
          switchMap(({ authorName }) =>
            this.authorService.getAuthorByName(authorName) ? 
              of(this.authorService.getAuthorByName(authorName)) :
              of(undefined) 
          ),
          switchMap((author) => {
            if (author) {
              return of(ArticleActions.loadAuthorByNameSuccess({ author }));
            } else {
              return of(ArticleActions.loadAuthorByNameFailure({ error: 'Author not found' }));
            }
          }),
          catchError((error) => of(ArticleActions.loadAuthorByNameFailure({ error })))
        );
      });
      this.loadRelatedArticles$ = createEffect(() =>
        this.actions$.pipe(
          ofType(ArticleActions.loadRelatedArticles), 
          switchMap(({ relatedArticleIds }) =>
            this.articleService.getRelatedArticles(relatedArticleIds).pipe( 
              map((relatedArticles:any) =>
                ArticleActions.loadRelatedArticlesSuccess({ relatedArticles }) 
              ),
              catchError((error) =>
                of(ArticleActions.loadRelatedArticlesFailure({ error})) 
              )
            )
          )
        )
      );
      this.addComment$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(ArticleActions.addComment),
          switchMap(({ comment }) => {
            this.articleService.addComment(comment);  
    
            return of(ArticleActions.addCommentSuccess({ comment }));
          }),
          catchError((error) => of(ArticleActions.addCommentFailure({ error })))
        );
      });
      this.loadComments$ = createEffect(() =>
        this.actions$.pipe(
          ofType(ArticleActions.loadComments),
          switchMap(action =>
            this.articleService.getComments(action.articleId).pipe(
              map(comments => {
                const sortedComments = this.sortComments(comments, action.sortOption);
                return ArticleActions.loadCommentsSuccess({ comments: sortedComments });
              }),
              catchError(error => {
                return EMPTY; 
              })
            )
          )
        )
      );
      this.postArticle$ = createEffect(() =>
        this.actions$.pipe(
          ofType(ArticleActions.postArticle),
          switchMap(({ article }) =>
            this.articleService.postArticle(article).pipe(
              map((postedArticle: Article) =>
                ArticleActions.postArticleSuccess({ article: postedArticle })
              ),
              catchError((error) =>
                of(ArticleActions.postArticleFailure({ error: error.message }))
              )
            )
          )
        )
      );
      
    
  }
  sortComments(comments: any[], sortOption: 'newest' | 'oldest'): any[] {
    switch (sortOption) {
      case 'newest':
        return comments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      case 'oldest':
        return comments.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      default:
        return comments;
    }
  }
  }


