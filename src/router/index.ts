import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '@/components/login/UserLogin.vue'
import UserSigin from '@/components/sigin/UserSigin.vue';

const routes = [

  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: UserLogin},
  { path: '/sigin', name: 'sigin', component: UserSigin}

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
