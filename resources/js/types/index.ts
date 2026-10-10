import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_admin: boolean;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    description?: string;
    articles_count?: number;
}

export interface Comment {
    id: number;
    content: string;
    user_id: number;
    article_id: number;
    parent_id: number | null;
    created_at: string;
    updated_at: string;
    likes_count: number;
    dislikes_count: number;
    is_liked_by_user: boolean;
    is_disliked_by_user: boolean;
    user: User;
    replies?: Comment[];
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    image_url: string | null;
    status: 'published' | 'draft';
    user_id: number;
    created_at: string;
    updated_at: string;
    likes_count: number;
    dislikes_count: number;
    views_count: number;
    comments_count: number;
    is_liked_by_user: boolean;
    is_disliked_by_user: boolean;
    user: User;
    tags: Tag[];
}

export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: any[];
}

export interface ArticlesPagination extends Pagination {
    data: Article[];
}

export interface PageProps extends InertiaPageProps {
    articles?: Article[];
    articlesPagination?: ArticlesPagination;
    auth: {
        user: User | null;
    };
    [key: string]: any;
}

declare global {
    function route(name: string, params?: Record<string, any>): string;
} 