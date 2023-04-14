import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage';
import GemsPage from "@/pages/GemsPage";
import SortedGemsPage from '@/pages/SortedGemsPage';
import Gem from '@/pages/Gem.vue';
import Admin from '@/pages/Admin.vue';

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
    component: SortedGemsPage,
  },
  {
    path: "/collection/:id",
    name: "gem",
    component: Gem,
  },

  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
