<template>
  <div>
    <h1 class="font-bold text-2xl">一周天氣預測</h1>
    <v-select
      :options="cityOptions"
      :clearable="false"
      label="city"
      placeholder="請選擇城市"
      v-model="locationName"
      class="w-full"
    ></v-select>
    <div class="my-4 w-full grid grid-cols-3 sm:grid-cols-4 gap-2 md:grid-cols-7">
      <div
        class="flex flex-col gap-2 items-center bg-celeste rounded px-4 py-2"
        v-for="data in weatherElement"
        :key="data.date"
      >
        <div class="text-center">
          <div class="text-xl font-bold">{{ data.date }}</div>
          <div class="text-sm">({{ data.weekday }})</div>
        </div>
        <div class="text-center text-sm">
          {{ data.Wx }}
        </div>
        <div class="text-center">
          <div class="text-[10px]">平均溫度</div>
          <div class="text-2xl font-bold">{{ data.MinT }}°</div>
          <div class="rotate-90">~</div>
          <div class="text-2xl font-bold">{{ data.MaxT }}°</div>
        </div>
        <div class="text-center">
          <div class="text-[10px]">降雨機率</div>
          <div class="text-2xl font-bold">{{ data.PoP12h }}%</div>
        </div>
        <div>
          <!-- <vue-slider v-model="value"></vue-slider> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCityHelpers } from '../helpers/cityDistrictsHelpers.js'
import { getWeekWeather } from '@/api/getWeekWeather'
import dayjs from 'dayjs'
export default {
  // components: {
  //   VueSlider: window['vue-slider-component']
  // },
  data() {
    return {
      baseUrl: 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/',
      dataid: import.meta.env.VITE_WEEK_WEATHER_ID,
      apiKey: import.meta.env.VITE_WEATHER_APIKEY,
      format: 'JSON',
      locationName: '臺北市',
      dataStore: null,
      weatherElement: [],
      cityOptions: [],
      weekday: ['日', '一', '二', '三', '四', '五', '六'],
      currHour: dayjs().hour(),
      table: null
    }
  },
  methods: {
    getWeatherByTime(currHour) {
      const morningStart = 6
      const eveningStart = 18
      let time = 6
      if (currHour >= morningStart && currHour < eveningStart) {
        time = 6
      } else {
        time = 18
      }
      const resultTime = time + ':00:00'
      return resultTime
    },
    async weatherFetchData(locationName) {
      try {
        const data = await getWeekWeather(locationName)
        const response = data?.data.records.locations
        const weatherElement = response[0].location[0].weatherElement
        let content = this.getWeatherContent(weatherElement)
        let reorderedData = this.reorderWeatherContent(content)
        console.log(reorderedData)
        this.weatherElement = reorderedData
      } catch (error) {
        console.log(error)
      }
    },
    getWeatherContent(weatherElement) {
      let content = {}
      const currtime = this.getWeatherByTime(this.currHour)
      const currDate = dayjs().format('YYYY-MM-DD')
      weatherElement.map((item) => {
        const filter = item.time.filter((data) => {
          return data.startTime.includes(currtime)
        })
        // console.log(filter)
        const todayCurr = item.time.filter((data) => {
          return data.startTime.includes(currDate)
        })
        const length = filter.length
        const finalData = length < 7 ? [todayCurr[0], ...filter] : filter
        content[item.elementName] = finalData
      })
      return content
    },
    reorderWeatherContent(content) {
      const reorderedData = []
      for (let i = 0; i < content.MaxT.length; i++) {
        const PoP12hValue = content.PoP12h[i].elementValue[0].value
        reorderedData.push({
          // startTime: content.MaxT[i].startTime,
          date: dayjs(content.MaxT[i].startTime).format('MM/DD'),
          weekday: this.weekday[dayjs(content.MaxT[i].startTime).day()],
          MaxT: content.MaxT[i].elementValue[0].value,
          MinT: content.MinT[i].elementValue[0].value,
          PoP12h: PoP12hValue.trim() === '' ? 0 : PoP12hValue,
          Wx: content.Wx[i].elementValue[0].value
        })
      }
      return reorderedData
    }
  },
  created() {
    this.weatherFetchData(this.locationName)
  },
  mounted() {
    this.cityOptions = getCityHelpers()
  },
  watch: {
    locationName() {
      this.weatherFetchData(this.locationName)
    },
    currHour() {
      this.weatherFetchData(this.locationName)
    }
  }
}
</script>
