<template>
  <div>
    <h1 class="font-bold text-2xl">降雨量統計</h1>
    {{ startTime }} {{ endTime }} {{ centerId }}
    <Bar :data="chartData" :options="chartOptions" />
    <div class="mt-12 mb-24">
      <div class="flex gap-4">
        <VueDatePicker
          v-model="date"
          locale="zh-tw"
          range
          :enable-time-picker="false"
          :max-date="new Date()"
          placeholder="請選擇日期"
        />
        <v-select
          :options="centerOptions"
          label="center"
          placeholder="請選擇觀測站"
          v-model="centerName"
          class="w-full h-full"
        ></v-select>
        <div class="flex gap-2">
          <button class="bg-blue-500 text-white rounded-lg w-24" @click="handleDataSearch">
            搜尋
          </button>
          <button class="bg-gray-500 text-white rounded-lg w-24" @click="handleDataClear">
            清除
          </button>
        </div>
      </div>
      <Bar :data="rainChartData" :options="options" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getRainVolumnByStatistic, getRainVolumnByTime } from '@/api/getRainVolume'
import { getAllWeatherCenter } from '@/api/getWeatherForecastCenter'
// https://www.npmjs.com/package/vue-chartjs
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  components: {
    Bar
  },
  data() {
    return {
      date: null,
      startTime: null,
      endTime: null,
      rainStatisticData: [],
      weatherCenterData: [],
      centerName: '',
      centerId: '',
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '',
            data: []
          },
          {
            label: '',
            backgroundColor: '',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '2024降雨量(單位: mm)'
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          }
        }
      },
      rainChartData: {
        labels: [],
        datasets: [{ label: '降雨量(單位: mm)', data: [] }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    }
  },
  methods: {
    async rainByStatisticFetchData() {
      try {
        const data = await getRainVolumnByStatistic()
        // console.log(data)
        // console.log(data[0].stationObsStatistics.Precipitation.monthly)

        const labels = data.map((data) => {
          return data.station.StationName
        })
        const map = new Map()
        data.forEach((stationData) => {
          const monthlyData = stationData.stationObsStatistics.Precipitation.monthly

          monthlyData.map((item) => {
            // console.log(item)
            const hasKey = map.has(item.YearMonth)
            const total = isNaN(+item.Total) ? 0 : +item.Total
            if (hasKey) {
              let currValue = map.get(item.YearMonth)
              currValue.push(total)
              map.set(item.YearMonth, currValue)
            } else map.set(item.YearMonth, [total])
          })
        })
        // console.log(map.size)
        const color = [
          '#F9CAD2',
          '#FDD9B5',
          '#D4F1F4',
          '#2A7886',
          '#B5EAD7',
          '#FF6B6B',
          '#FFE66D',
          '#FFBE5E',
          '#B5EAD7',
          '#62CBCD',
          '#E8D3A3',
          '#BFA68A'
        ]
        const dataArray = Array.from(map).map(([key, value], index) => ({
          label: key,
          backgroundColor: color[index],
          data: value
        }))
        // console.log(dataArray)
        const lastThreeElements = dataArray.slice(-3)
        this.chartData = {
          labels,
          datasets: lastThreeElements
        }
      } catch (error) {
        console.log(error)
      }
    },
    async weatherCenterFetchData() {
      try {
        const data = await getAllWeatherCenter()
        this.weatherCenterData = data
        this.centerOptions = data.map((item) => {
          return item.stationName
        })
      } catch (error) {
        console.log(error)
      }
    },
    async handleDataSearch() {
      try {
        const data = await getRainVolumnByTime(this.centerId, this.startTime, this.endTime)
        const rainData = data[0].stationObsTimes.stationObsTime
        const label = rainData.map((data) => {
          return data.Date
        })
        const value = rainData.map((data) => {
          const vol = data.weatherElements.Precipitation
          return isNaN(+vol) ? 0 : +vol
        })
        this.rainChartData = {
          labels: label,
          datasets: [{ label: '降雨量(單位: mm)', data: value }]
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleDataClear() {
      this.date = null
      this.centerName = ''
    }
  },
  computed: {},
  created() {
    this.rainByStatisticFetchData()
    this.weatherCenterFetchData()
  },
  mounted() {},
  watch: {
    date(newValue) {
      if (newValue) {
        this.startTime = dayjs(newValue[0]).format('YYYY-MM-DD')
        this.endTime = dayjs(newValue[1]).format('YYYY-MM-DD')
      }
    },
    centerName(newValue) {
      if (newValue !== '') {
        const findId = this.weatherCenterData.filter((item) => item.stationName === newValue)
        this.centerId = findId[0].stationID
      }
    }
  }
}
</script>

<!-- https://vue3datepicker.com/ -->
