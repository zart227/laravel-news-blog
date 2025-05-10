import { createRouter, createWebHistory } from 'vue-router';
import ArticlesList from '../Pages/ArticlesList.vue';

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