import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/pageContent.vue'
import navbarView from '../views/navbar.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home_page',
      component: HomeView,
    },
        {
      path: '/navbar',
      name: 'navbar_page',
      component: navbarView,
    },
    {
      path:'/:catchAll(.)'
    }
  ],
})

export default router
