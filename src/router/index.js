import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Character from '@/views/Character.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/character/:name',
    name: 'character',
    props: true,
    component: Character
  }
]

const router = new VueRouter({
  routes
})

export default router
