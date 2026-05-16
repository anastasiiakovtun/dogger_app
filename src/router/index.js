import { createRouter, createWebHistory } from "vue-router"
import BreedOverview from '../views/BreedOverview.vue'
import BreedDetail from '../views/BreedDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: BreedOverview
    },
    {
      path: '/breed/:breed',
      component: BreedDetailPage
    }
  ]
})

export default router

export default router