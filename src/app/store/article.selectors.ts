import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article.state';

export const selectArticleState = createFeatureSelector<ArticleState>('articles');

export const selectAllArticles = createSelector(
  selectArticleState,
  (state) => state.articles
);

export const selectArticleLoading = createSelector(
  selectArticleState,
  (state) => state.loading
);

export const selectArticleError = createSelector(
  selectArticleState,
  (state) => state.error
);


export const selectArticle = createSelector(
  selectArticleState,
  (state: ArticleState) => state.articles
);

export const selectRelatedArticles = createSelector(
  selectArticleState,
  (state: ArticleState) => state.relatedArticles
);

export const selectAuthorArticles = createSelector(
  selectArticleState,
  (state: ArticleState) => state.authorArticles
);

export const selectLoading = createSelector(
  selectArticleState,
  (state: ArticleState) => state.loading
);

export const selectError = createSelector(
  selectArticleState,
  (state: ArticleState) => state.error
);

export const selectAuthor = createSelector(
  selectArticleState,
  (state: any) => state.author 
);
export const selectArticleById = (articleId: number) =>
  createSelector(selectAllArticles, (articles) =>
    articles.find((article) => article.id === articleId)
  );


export const selectCommentsError = createSelector(
  selectArticleState,
  (state: ArticleState) => state.error
);
export const selectComments = createSelector(
  selectArticleState,
  (state: ArticleState, props: { sortOption: 'newest' | 'oldest'  }) => {
    const { comments } = state;

    return [...comments].sort((a, b) => {
      switch (props.sortOption) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        default:
          return 0;
      }
    });
  }
);


