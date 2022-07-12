import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    component: () => import("@/views/Recommend.vue"),
    children: [
      {
        path: ":id",
        component: () => import("@/views/PlayListDetail.vue")
      }
    ]
  },
  {
    path: "/search",
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/singer",
    component: () => import("@/views/Singer.vue"),
    children: [
      {
        path: ":id",
        component: () => import("@/views/SingerDetail.vue")
      }
    ]
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
