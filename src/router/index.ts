import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '@/components/login/UserLogin.vue'
import UserSigin from '@/components/sigin/UserSigin.vue'
// import DashboardComponent from '@/components/dashboard/DashboardComponent.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue';

const routes = [

  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: UserLogin},
  { path: '/signIn', name: 'signIn', component: UserSigin},
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
