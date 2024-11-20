import { createReducer, on } from '@ngrx/store';
import * as ArticleActions from './article.actions';
import { Article, RepComment } from '../model/article.model';
import { Author } from '../model/author.model';
import { map } from 'rxjs';

export interface ArticleState {
  articles: Article[];
  author: Author | null;
  relatedArticles: Article[];
  authorArticles: Article[];
  loading: boolean;
  error: any;
  comments: RepComment[];
}

export const initialState: ArticleState = {
  articles: [],
  author: null,
  relatedArticles: [],
  authorArticles: [],
  loading: false,
  error: null,
  comments: [],

};

export const articleReducer = createReducer(
  initialState,
  on(ArticleActions.loadArticles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ArticleActions.loadArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles,
    loading: false,
  })),
  on(ArticleActions.loadArticlesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ArticleActions.loadArticleById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ArticleActions.loadArticleByIdSuccess, (state, { article }) => ({
    ...state,
    loading: false,
    article
  })),
  on(ArticleActions.loadArticleByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ArticleActions.loadRelatedArticlesSuccess, (state, { relatedArticles }) => ({
    ...state,
    relatedArticles
  })),
  on(ArticleActions.loadAuthorArticlesSuccess, (state, { authorArticles }) => ({
    ...state,
    authorArticles
  })),
  on(ArticleActions.loadRelatedArticlesSuccess, (state, { relatedArticles }) => ({
    ...state,
    relatedArticles
  })),
  on(ArticleActions.loadAuthorArticlesSuccess, (state, { authorArticles }) => ({
    ...state,
    authorArticles
  })),
  on(ArticleActions.loadAuthorByNameSuccess, (state, { author }) => ({
    ...state,
    author: author 
  })),
  on(ArticleActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    repComment: comments,
    error: null
  })),
  on(ArticleActions.loadCommentsFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(ArticleActions.addCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: [...state.comments, comment],
  })),
  on(ArticleActions.addCommentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ArticleActions.updateComment, (state, { comment }) => {
    const updatedComments = state.comments.map((c: any) =>
      c.id === comment.id ? comment : c
    );
  
    return {
      ...state,
      comments: updatedComments,
    };
  }),
  on(ArticleActions.postArticle, (state) => ({
    ...state,
    loading: true
  })),
  on(ArticleActions.postArticleSuccess, (state, { article }) => ({
    ...state,
    loading: false,
    articles: [...state.articles, article]  // Assuming you add the article to the state
  })),
  on(ArticleActions.postArticleFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
  
);
