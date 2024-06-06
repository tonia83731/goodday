import { createRouter, createWebHistory } from 'vue-router'
import WeekweatherView from '@/views/WeekweatherView.vue'
import CurrweatherView from '@/views/CurrweatherView.vue'
import RainVolView from '@/views/RainVolView.vue'
import TourismView from '@/views/TourismView.vue'
import TourismspotView from '@/views/TourismspotView.vue'
import TourismRestView from '@/views/TourismRestView.vue'
import TourismhotelView from '@/views/TourismhotelView.vue'
import TourismactivityView from '@/views/TourismactivityView.vue'

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
    },
    {
      path: '/tourism',
      name: 'tourism',
      component: TourismView,
      redirect: { name: 'spots' },
      children: [
        {
          path: 'spots',
          name: 'spots',
          component: TourismspotView
        },
        {
          path: 'restaurants',
          name: 'restaurants',
          component: TourismRestView
        },
        {
          path: 'hotels',
          name: 'hotels',
          component: TourismhotelView
        },
        {
          path: 'activities',
          name: 'activities',
          component: TourismactivityView
        }
      ]
    }
  ]
})

export default router
