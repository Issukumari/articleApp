import { createAction, props } from '@ngrx/store';
import { Article, RepComment } from '../model/article.model';
import { Author } from '../model/author.model';

export const loadArticles = createAction('[Article] Load Articles');
export const loadArticlesSuccess = createAction(
  '[Article] Load Articles Success',
  props<{ articles: Article[] }>()
);
export const loadArticlesFailure = createAction(
  '[Article] Load Articles Failure',
  props<{ error: any }>()
);

export const loadArticleById = createAction(
  '[Article] Load Article By Id',
  props<{ articleId: number }>()
);

export const loadArticleByIdSuccess = createAction(
  '[Article] Load Article By Id Success',
  props<{ article: Article }>()
);

export const loadArticleByIdFailure = createAction(
  '[Article] Load Article By Id Failure',
  props<{ error: string }>()
);

export const loadRelatedArticles = createAction(
  '[Article] Load Related Articles',
  props<{ relatedArticleIds: number[] }>()
);

export const loadRelatedArticlesSuccess = createAction(
  '[Article] Load Related Articles Success',
  props<{ relatedArticles: Article[] }>()
);
export const loadRelatedArticlesFailure = createAction(
  '[Article] Load Related Articles Failure',
  props<{ error: string }>()
);

export const loadAuthorArticles = createAction(
  '[Article] Load Author Articles',
  props<{ author: string }>()
);

export const loadComments = createAction(
  '[Comments] Load Comments',
  props<{ articleId: string; sortOption: 'newest' | 'oldest'}>()

);

export const loadCommentsSuccess = createAction(
  '[Comments] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comments] Load Comments Failure',
  props<{ error: any }>()
);

export const loadAuthorArticlesSuccess = createAction(
  '[Article] Load Author Articles Success',
  props<{ authorArticles: Article[] }>()
);

export const loadAuthorByName = createAction(
  '[Article] Load Author By Name',
  props<{ authorName: string }>()
);

export const loadAuthorByNameSuccess = createAction(
  '[Article] Load Author By Name Success',
  props<{ author: Author }>()
);

export const loadAuthorByNameFailure = createAction(
  '[Article] Load Author By Name Failure',
  props<{ error: string }>()
);

export const addComment = createAction(
  '[Comment] Add Comment',
  props<{ comment: RepComment }>()
);

export const addCommentSuccess = createAction(
  '[Comment] Add Comment Success',
  props<{ comment: RepComment }>()
);

export const addCommentFailure = createAction(
  '[Comment] Add Comment Failure',
  props<{ error: any }>()
);
export const updateComment = createAction(
  '[Comment] Update Comment',
  props<{ comment: RepComment }>()
);

export const postArticle = createAction(
  '[Article] Post Article',
  props<{ article: Article }>()
);

export const postArticleSuccess = createAction(
  '[Article] Post Article Success',
  props<{ article: Article }>()
);

export const postArticleFailure = createAction(
  '[Article] Post Article Failure',
  props<{ error: string }>()
);
