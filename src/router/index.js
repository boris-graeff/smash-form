import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Character from '@/views/Character.vue'
import Chart from '@/views/Chart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/character/:id',
    name: 'character',
    props: true,
    component: Character
  },
  {
    path: '/chart/:id/:lang(fr|en)?',
    name: 'chart',
    props: true,
    component: Chart
  },
  {
    path: '*',
    redirect: {
      name: 'home'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
