

export interface replyComment {
  id: string;
  articleId: string; 
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[]; 
}

export interface ArticleListData {
  image?: string;
  description?: string;
}

export interface ArticleList {
  id?:number;
  title?: string;
  category?: string;
  content?: ArticleListData | null;
  scheduledDate?: Date;
  status: string;
  author?: string; 
  views?: number;
  isEditorPick?: boolean;
  relatedArticles?: number[];
}

export interface Article {
  id: number;
  title: string;
  category: string;
  content: ArticleListData | null;
  scheduledDate: Date;
  status:string;
  author: string; 
  views: number;
  isEditorPick?: boolean;
  relatedArticles?: number[];
  isFavourite: boolean;
}

export interface RepComment {
  id: string;
  articleId: string;
  author: string;
  content: string;  // Ensure this is present
  timestamp: Date;
  likes: number;
  replies: Comment[];  // Replies field, which is an array of Comment objects
}
