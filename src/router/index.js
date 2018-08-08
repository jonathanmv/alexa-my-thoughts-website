import Vue from 'vue'
import Router from 'vue-router'
import MoodOverTimeChart from '@/components/MoodOverTimeChart'

import userRoutes from '@/modules/users/routes'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'MoodOverTimeChart',
      component: MoodOverTimeChart
    },
    ...userRoutes
  ]
})

export default router
