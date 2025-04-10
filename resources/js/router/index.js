import { createRouter, createWebHistory } from 'vue-router';
import ArticlesList from '../Pages/Articles/Index.vue';

const routes = [
    {
        path: '/',
        name: 'articles.index',
        component: ArticlesList
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
}); 