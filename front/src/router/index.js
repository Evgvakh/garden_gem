import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage';
import GemsPage from "@/pages/GemsPage";
import SortedGemsPage from '@/pages/SortedGemsPage';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/gems",
    name: "gems",
    component: GemsPage,    
  },
  {
    path: "/gems/:id",
    name: "sortedGems",
    component: SortedGemsPage    
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
