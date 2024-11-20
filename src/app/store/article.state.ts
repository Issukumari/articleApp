import { Article, RepComment } from "../model/article.model";

export interface ArticleState {
  articles: Article[];
  relatedArticles: Article[];
  authorArticles: Article[];
  loading: boolean;
  error: string | null;
  comments:RepComment[];
}

export const initialState: ArticleState = {
  articles: [],
  relatedArticles: [],
  authorArticles: [],
  loading: false,
  error: null,
  comments:[]
};
