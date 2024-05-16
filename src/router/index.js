import { createRouter, createWebHistory } from 'vue-router'
import WeekweatherView from '@/views/WeekweatherView.vue'
import CurrweatherView from '@/views/CurrweatherView.vue'
import RainVolView from '@/views/RainVolView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/weather/current' // Redirect landing page to /weather/day
    },
    {
      path: '/weather',
      name: 'weather',
      redirect: { name: 'week-weather' },
      children: [
        {
          path: 'week',
          name: 'week-weather',
          component: WeekweatherView
        },
        {
          path: 'current',
          name: 'current-weather',
          component: CurrweatherView
        }
      ]
    },
    {
      path: '/rain',
      name: 'rain',
      component: RainVolView
    }
  ]
})

export default router
