<template>
  <div>
    <div class="flex flex-col gap-2 mt-2 mb-4" v-if="earthquakeData.length > 0">
      <div
        class="bg-herb text-white px-4 py-2 rounded"
        v-for="{ EarthquakeNo, ReportContent } in earthquakeData"
        :key="EarthquakeNo"
      >
        {{ ReportContent }}
      </div>
    </div>
    <h1 class="font-bold text-2xl">即時天氣</h1>
    <v-select
      :options="cityOptions"
      :clearable="false"
      label="city"
      placeholder="請選擇城市"
      v-model="locationName"
      class="w-full border border-lionsmane rounded"
    ></v-select>
    <div class="my-4 p-2 bg-celeste-75 rounded-lg">
      <!-- https://www.cwa.gov.tw/V8/C/K/Weather_Icon.html -->
      <div class="flex gap-4 items-end">
        <div class="text-3xl font-bold">{{ this.weatherData.averageTemp }}°C</div>
        <div class="">{{ this.weatherData.Wx }}</div>
      </div>
      <div class="">最低平均溫度: {{ this.weatherData.MinT }}°C</div>
      <div class="">最高平均溫度: {{ this.weatherData.MaxT }}°C</div>
      <div class="">降雨機率: {{ this.weatherData.PoP }}%</div>
    </div>
  </div>
</template>

<script>
import { getCityHelpers } from '../helpers/cityDistrictsHelpers.js'
import { getCurrentWeather } from '@/api/getCurrentWeather.js'
import { getEarthquake } from '@/api/getEarthquake.js'
// import { getAllTourisumSpot } from '@/api/getTourismSpot'
import getAuthorizationHeader from '@/api/getAuthorizationHeader'
// import { getWeatherByTime } from '@/helpers/getWeatherByHr'
// import { inject } from 'vue'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      baseURL: 'https://tdx.transportdata.tw/api/basic',
      currentTime: '',
      locationName: '臺北市',
      weather: {
        timeFrom: '',
        timeTo: ''
      },
      // weatherData: [],
      weatherData: {},
      earthquakeData: [],
      cityOptions: []
    }
  },
  methods: {
    async weatherFetchData(locationName) {
      try {
        const data = await getCurrentWeather(locationName)
        const weatherData = data[0]?.weatherElement
        // console.log(weatherData)
        let content = {}
        weatherData.map((item) => {
          if (item.elementName !== 'CI') {
            content[item.elementName] = item.time[0].parameter.parameterName
          }
        })
        // console.log(content)
        this.weatherData = {
          ...content,
          averageTemp: ((+content.MinT + +content.MaxT) / 2).toFixed(1)
        }
        // console.log(this.weatherData)
      } catch (error) {
        console.log(error)
      }
    },
    async earthquakeFetchData(timefrom) {
      try {
        const data = await getEarthquake(timefrom)
        // console.log(data)
        this.earthquakeData = data
      } catch (error) {
        console.log(error)
      }
    }
    // async allTourisumSpotFetchData() {
    //   try {
    //     const res = await this.axios.get(`${this.baseURL}/v2/Tourism/ScenicSpot`, {
    //       headers: getAuthorizationHeader()
    //     })
    //     console.log(res.data)
    //     // const data = await getAllTourisumSpot()
    //     // console.log(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  },
  created() {
    // this.weatherFetchData()
    // const dayjs = inject('dayjs')
    this.currentTime = dayjs().format('YYYY-MM-DD HH:mm')

    this.weather.timefrom = dayjs().startOf('year').format('YYYY-MM-DDTHH:mm:ss')
    this.weather.timeto = dayjs().endOf('day').format('YYYY-MM-DDTHH:mm:ss')
    // console.log(this.weather)
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    const earthquakeTimefrom = dayjs(yesterday).format('YYYY-MM-DDTHH:mm:ss')
    this.weatherFetchData(this.locationName)
    this.earthquakeFetchData(earthquakeTimefrom)
    // this.allTourisumSpotFetchData()
  },
  mounted() {
    this.cityOptions = getCityHelpers()
  },
  watch: {
    locationName() {
      // this.sunstatusFetchData(this.locationName, this.sun.timefrom, this.sun.timeto)
      this.weatherFetchData(this.locationName)
    }
  }
}
</script>
