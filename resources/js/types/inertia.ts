export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  is_admin?: boolean;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  articles_count?: number;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  status: 'draft' | 'published';
  user_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
  tags?: Tag[];
}

export interface PageProps {
  auth: {
    user: User | null;
  };
  errors: Record<string, string[]>;
  flash?: {
    success?: string | null;
    error?: string | null;
  };
}

declare module '@inertiajs/vue3' {
  interface PageProps {
    auth: {
      user: User | null;
    };
    flash: {
      message?: string;
      success?: string;
      error?: string;
    };
  }
}

declare global {
  function route(): {
    current: () => string;
  };
  function route(name: string, params?: Record<string, any>): string;
} 