import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage';
import GemsPage from "@/pages/GemsPage";
import SortedGemsPage from '@/pages/SortedGemsPage';
import Gem from '@/pages/Gem.vue';
import Glossarium from '@/pages/glossarium/Glossarium.vue';
import Admin from '@/pages/Admin.vue';
import GlossText from '@/pages/glossarium/GlossText.vue';

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
    path: "/gems/:id/:subcatId",
    name: "sortedSubCatGems",
    component: SortedGemsPage,
  },
  {
    path: "/collection/:id",
    name: "gem",
    component: Gem,
  },

  {
    path: "/glossarium",
    name: "gloss",
    component: Glossarium,
  },

  {
    path: "/glossarium/:id",
    name: "glossItem",
    component: GlossText,
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
