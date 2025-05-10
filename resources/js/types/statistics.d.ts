interface ArticleStats {
  id: number;
  title: string;
  status: 'published' | 'draft';
  views: number;
  comments: number;
  created_at: string;
  isUpdated?: boolean;
  updatedField?: 'views' | 'comments' | null;
}

interface ViewStats {
  date: string;
  views: number;
  unique_views: number;
}

interface CommentStats {
  date: string;
  count: number;
}

interface PopularArticle {
  id: number;
  title: string;
  author: string;
  views: number;
  comments: number;
}

interface ActiveUser {
  user: string;
  comments: number;
}

interface SummaryStats {
  total_articles: number;
  published_articles: number;
  total_views: number;
  total_comments: number;
  unique_viewers: number;
}

interface StatisticsData {
  summary: SummaryStats;
  views: ViewStats[];
  comments: CommentStats[];
  popular_articles: PopularArticle[];
  active_users: ActiveUser[];
  articles_stats: ArticleStats[];
}

export {
  ArticleStats,
  ViewStats,
  CommentStats,
  PopularArticle,
  ActiveUser,
  SummaryStats,
  StatisticsData
}; 