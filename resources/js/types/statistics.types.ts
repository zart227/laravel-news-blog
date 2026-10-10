export interface StatisticsSummary {
  total_views: number;
  total_unique_views: number;
  average_views: number;
  total_articles: number;
  total_users: number;
}

export interface ArticlesStatistics {
  total: number;
  published: number;
  draft: number;
}

export interface TagStatistics {
  total: number;
  popular: Array<{
    id: number;
    name: string;
    articles_count: number;
  }>;
}

export interface BrowserStatistics {
  _id: string;
  count: number;
}

export interface ReferrerStatistics {
  _id: string;
  count: number;
}

export interface PopularArticle {
  title: string;
  views: number;
  unique_views: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface RecentArticle {
  id: number;
  title: string;
  author: string;
  status: string;
  created_at: string;
  views: number;
  unique_views: number;
  comments: number;
}

export interface Statistics {
  summary: StatisticsSummary;
  articles: ArticlesStatistics;
  tags: TagStatistics;
  browsers: BrowserStatistics[];
  referrers: ReferrerStatistics[];
  popular_articles: PopularArticle[];
  recent_articles: RecentArticle[];
}

export type StatisticsPeriod = 'day' | 'week' | 'month' | 'year'; 