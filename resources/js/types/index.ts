export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export interface Comment {
    id: number;
    content: string;
    user: User;
    created_at: string;
    updated_at: string;
    article_id: number;
    parent_id?: number;
    replies?: Comment[];
    likes_count: number;
    dislikes_count: number;
    is_liked_by_user: boolean;
    is_disliked_by_user: boolean;
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image?: string;
    created_at: string;
    updated_at: string;
    user: User;
    tags: Tag[];
    comments: Comment[];
    comments_count?: number;
    views_count?: number;
    likes_count: number;
    dislikes_count: number;
    is_liked_by_user: boolean;
    is_disliked_by_user: boolean;
}

declare global {
    function route(name: string, params?: Record<string, any>): string;
} 