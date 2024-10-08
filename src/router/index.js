import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
// 首页
const Index = () => import('../views/Index/Index.vue')

// 中心介绍
const Center = () => import('../views/Center/Index.vue')

// 新闻
const News = () => import('../views/News/Index.vue')
const NewsDetail  = () => import('../views/News/Detail.vue')

// 算力资源
const Resource = () => import('../views/Resource/Index.vue')

// 科普教育
const Education = () => import('../views/Education/Index.vue')
const EducationDetail = () => import('../views/Education/Detail.vue')

// 我要预约
const Reservation = () => import('../views/Reservation/Index.vue')

Vue.use(VueRouter);
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  // 中文
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: '/index',
    children:[
      {
        path: '/index',
        name: 'index',
        component: Index,
        meta: { title: '首页',keepAlive:true }
      },
      {
        path: '/center',
        name: 'center',
        component: Center,
        meta: { title: '中心介绍',keepAlive:false }
      },
      {
        path: '/news',
        name: 'news',
        component: News,
        meta: { title: '新闻动态',keepAlive:false }
      },
      {
        path: '/newsDetail',
        name: 'newsDetail',
        component: EducationDetail,
        meta: { title: '新闻详情',keepAlive:false }
      },
      {
        path: '/resource',
        name: 'resource',
        component: Resource,
        meta: { title: '算力资源',keepAlive:false }
      },
      {
        path: '/education',
        name: 'education',
        component: Education,
        meta: { title: '科普教育',keepAlive:false }
      },
      {
        path: '/educationDetail',
        name: 'educationDetail',
        component: EducationDetail,
        meta: { title: '科普教育详情',keepAlive:false }
      },
      {
        path: '/reservation',
        name: 'reservation',
        component: Reservation,
        meta: { title: '我要预约',keepAlive:false }
      },
    ]
  },
];

const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes,
});

export default router;
