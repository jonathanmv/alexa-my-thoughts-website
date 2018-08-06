import Vue from 'vue'
import Router from 'vue-router'
import MoodOverTimeChart from '@/components/MoodOverTimeChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MoodOverTimeChart',
      component: MoodOverTimeChart
    }
  ]
})
