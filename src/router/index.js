import Vue from 'vue'
import VueRouter from 'vue-router'
import addBlog from '@/views/addBlog.vue'
import blog from '@/views/blog.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/addBlog',
    name: 'addBlog',
    component: addBlog
  },
  {
    path: '/blog',
    name: 'blog',
    component: blog
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
