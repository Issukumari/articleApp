import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Article } from '../../model/article.model';
import { Author } from '../../model/author.model';
import { ArticleService } from '../../service/article.service';
import { AuthorService } from '../../service/author.service';
import { DatePipe, NgFor, NgIf ,CommonModule} from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as ArticleActions from '../../store/article.actions';
import {  selectAuthor, selectRelatedArticles, selectAuthorArticles, selectLoading, selectError, selectAllArticles, selectArticleById } from '../../store/article.selectors';
@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [RouterModule,NgIf,NgFor,DatePipe,CommonModule],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | any;
  author: Author | undefined;
  articles$!: Observable<ReadonlyArray<Article>> ;
  author$!: Observable<Author | null>;
  relatedArticles$: Observable<any[]>;
  authorArticles$: Observable<Article[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  article$!: Observable<Article | undefined>; 
  authorName: readonly Article[] =[];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private store: Store
    
  ) {
    this.articles$ = this.store.select(selectAllArticles);
    this.author$ = this.store.select(selectAuthor);
    this.relatedArticles$ = this.store.select(selectRelatedArticles);
    this.authorArticles$ = this.store.select(selectAuthorArticles);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const articleId = Number(params.get('id'));
      this.article$ = this.store.select(selectArticleById(articleId)).pipe(
        tap((article) => {
          if (article?.author) {
            
            this.store.dispatch(
              ArticleActions.loadAuthorByName({ authorName: article.author })
            );
            this.store.dispatch(
              ArticleActions.loadRelatedArticles({
                relatedArticleIds: article.relatedArticles ?? []  
              })
            );
          }
        })
      );
    });
  }
}      


