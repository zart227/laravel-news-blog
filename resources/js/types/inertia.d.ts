import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import ziggyRoute from 'ziggy-js';

declare global {
  export function route(
    name: string,
    params?: Record<string, any>,
    absolute?: boolean,
    config?: any
  ): string;

  interface Window {
    axios: AxiosInstance;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    route: typeof ziggyRoute;
    $page: InertiaPageProps;
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  tags: Tag[];
  image_url?: string;
  status?: 'draft' | 'published';
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  content: string;
  user_id: number;
  article_id: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface PageProps {
  auth: {
    user: User | null;
  };
  app: {
    name: string;
  };
  errors: Record<string, string>;
  flash: {
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  };
}

declare module '@inertiajs/vue3' {
  import { DefineComponent } from 'vue';

  export const Link: DefineComponent<{
    href: string;
    method?: string;
    as?: string;
    data?: Record<string, any>;
    preserveScroll?: boolean;
    preserveState?: boolean;
    replace?: boolean;
    only?: string[];
  }>;

  export const Head: DefineComponent<{
    title: string;
  }>;

  export function usePage<T = any>(): {
    props: inertia.SharedProps & T;
    url: string;
    component: string;
    version: string | null;
  };
}

declare function route(name: string, params?: Record<string, any>): string; 