<script>
// import { RouterView, RouterLink } from 'vue-router'
// import { getAllTourisumSpot, getTourisumspotByCity } from './api/getTourismSpot'
import { getCityHelpers } from './helpers/cityDistrictsHelpers'
import { getSunStatus } from './api/getSunStatus'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      current: dayjs().format('YYYY/MM/DD HH:mm:ss'),
      currentTime: dayjs().format('HH:mm:ss'),
      currentDate: dayjs().format('YYYY/MM/DD'),
      locationName: '臺北市',
      sun: {
        timeFrom: '',
        timeTo: ''
      },
      sunData: {
        sunRiseTime: '',
        sunTransitTime: '',
        sunSetTime: ''
      },
      sunTime: {
        rise: '',
        set: ''
      },
      style: {
        night: 'bg-midnight text-lionsmane',
        middle: 'bg-marigold text-midnight',
        day: 'bg-lionsmane text-midnight'
      },
      touristData: []
    }
  },
  methods: {
    async sunstatusFetchData(locationName, timefrom, timeto) {
      try {
        const data = await getSunStatus(locationName, timefrom, timeto)
        const sunData = data[0]?.time[0]
        // console.log(sunData)
        const currentDate = dayjs().format('YYYY-MM-DDT')
        // console.log(currentDate)
        const sunRiseTime = currentDate + sunData.SunRiseTime + ':00'
        const sunTransitTime = currentDate + sunData.SunTransitTime + ':00'
        const sunSetTime = currentDate + sunData.SunSetTime + ':00'

        const sunRiseStamp = dayjs(sunRiseTime).valueOf()
        const sunTransitStamp = dayjs(sunTransitTime).valueOf()
        const sunSetStamp = dayjs(sunSetTime).valueOf()
        this.sunTime = {
          rise: sunData.SunRiseTime,
          set: sunData.SunSetTime
        }
        this.sunData = {
          sunRiseTime: sunRiseStamp,
          sunTransitTime: sunTransitStamp,
          sunSetTime: sunSetStamp
        }
        // console.log(this.sunData)
      } catch (error) {
        console.log(error)
      }
    },
    // async tourisumspotFetchData() {
    //   try {
    //     const data = await getAllTourisumSpot()
    //     console.log(data)
    //     // this.touristData = data
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    updateTime() {
      setInterval(() => {
        this.currentDate = dayjs().format('YYYY/MM/DD')
        this.currentTime = dayjs().format('HH:mm:ss')
        this.current = dayjs().format('YYYY/MM/DD HH:mm:ss')
      }, 1000)
    }
  },
  async created() {
    this.sun.timefrom = dayjs().format('YYYY-MM-DD')
    this.sun.timeto = dayjs().add(1, 'day').format('YYYY-MM-DD')
    this.sunstatusFetchData(this.locationName, this.sun.timefrom, this.sun.timeto)
    // this.tourisumspotFetchData()
  },
  async mounted() {
    this.updateTime()
    this.cityOptions = getCityHelpers()
  },
  watch: {
    locationName() {
      this.sunstatusFetchData(this.locationName, this.sun.timefrom, this.sun.timeto)
    }
  },
  computed: {
    mainStyle() {
      const { sunRiseTime, sunTransitTime, sunSetTime } = this.sunData
      const currentTime = dayjs(this.current).valueOf()
      if (currentTime > sunRiseTime && currentTime < sunSetTime) return this.style.day
      else if (currentTime === sunTransitTime) return this.style.middle
      else return this.style.night
    }
  }
}
</script>

<template>
  <div class="w-full h-full min-h-screen py-8 px-4" :class="mainStyle">
    <div class="container mx-auto flex flex-col gap-8">
      <header class="flex flex-col gap-4 justify-center items-center">
        <RouterLink
          :to="{ path: '/weather/current' }"
          class="font-bold text-2xl font-merriweather flex gap-1"
        >
          <font-awesome-icon :icon="['fas', 'cloud']" />
          <div class="font-extrabold">GOOD DAY</div></RouterLink
        >
        <nav class="flex gap-6 font-semibold">
          <RouterLink :to="{ path: '/weather' }">天氣預報</RouterLink>
          <RouterLink :to="{ path: '/tourism' }">旅遊景點</RouterLink>
          <RouterLink :to="{ path: '/rain' }">降雨量統計</RouterLink>
        </nav>
      </header>
      <div class="grid grid-cols-1 gap-2 md:grid-cols-5">
        <div class="bg-celeste-75 rounded relative px-2 py-4 w-full">
          <p class="text-sm mb-2">現在時間</p>
          <div class="font-bold text-xl">{{ currentDate }}</div>
          <div class="font-bold text-xl">{{ currentTime }}</div>
          <img
            src="./assets/currenttime.png"
            alt="current time"
            class="absolute bottom-2 right-2 md:hidden"
          />
        </div>
        <div class="bg-celeste-75 rounded relative md:col-span-2 px-2 py-4">
          <p class="text-sm mb-2">日出時間</p>
          <div class="font-bold text-4xl">{{ sunTime.rise }}</div>
          <img src="./assets/sunrise.png" alt="sunrise" class="absolute bottom-0 right-0" />
        </div>
        <div class="bg-celeste-75 rounded relative md:col-span-2 px-2 py-4">
          <p class="text-sm mb-2">日落時間</p>
          <div class="font-bold text-4xl">{{ sunTime.set }}</div>
          <img src="./assets/sunset.png" alt="sunset" class="absolute bottom-0 right-0" />
        </div>
      </div>
      <!-- <div class="flex gap-2">
        <font-awesome-icon :icon="['fas', 'calendar']" title="現在時間" />
        <div>{{ currentTime }}</div>
      </div>
      <ul>
        <li>日出時間: {{ sunTime.rise }}</li>
        <li>日落時間: {{ sunTime.set }}</li>
      </ul> -->
      <RouterView />
    </div>
  </div>
</template>
<style scoped></style>
