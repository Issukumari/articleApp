export interface Author {
    bio?: string;
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
  }
  export interface ArticleListData {
    image?: string;
    description?: string;
  }