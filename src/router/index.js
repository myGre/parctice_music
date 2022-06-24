import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    component: () => import("@/views/Recommend.vue")
  },
  {
    path: "/search",
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/singer",
    component: () => import("@/views/Singer.vue")
  },
  {
    path: "/toplist",
    component: () => import("@/views/TopList.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
