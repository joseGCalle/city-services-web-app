import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import StoreList from '../views/StoreList.vue';
import StoreDetail from '../views/StoreDetail.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import CreateStore from '../views/CreateStore.vue';
import CreateService from '../views/CreateService.vue';
import CreateEvent from '../views/CreateEvent.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/stores', name: 'StoreList', component: StoreList },
  { path: '/stores/:id', name: 'StoreDetail', component: StoreDetail, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/create-store', name: 'CreateStore', component: CreateStore },
  { path: '/create-service', name: 'CreateService', component: CreateService },
  { path: '/create-event', name: 'CreateEvent', component: CreateEvent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
