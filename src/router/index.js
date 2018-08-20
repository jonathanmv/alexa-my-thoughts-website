import Vue from 'vue'
import Router from 'vue-router'
import MoodOverTimeChart from '@/components/MoodOverTimeChart'
import TermsOfUse from '@/components/TermsOfUse'

import userRoutes from '@/modules/users/routes'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'MoodOverTimeChart',
      component: MoodOverTimeChart
    },
    {
      path: '/terms-of-use',
      name: 'TermsOfUse',
      component: TermsOfUse
    },
    ...userRoutes
  ]
})

export default router
