<template>
  <section id="spot" class="">
    <div class="w-full text-gray-400 text-center my-4" v-if="!activityLength">沒有旅遊資料</div>
    <div v-else class="">
      <div
        class=""
        v-for="(
          { ActivityID, ActivityName, StartTime, Class1, Class2, City, Organizer }, index
        ) in spotDataShow"
        :key="ActivityID"
      >
        <div class="grid grid-cols-8 p-2" :class="index < activityLength ? 'border-b' : ''">
          <div class="flex justify-center items-center">{{ index + 1 }}</div>
          <div class="col-span-6">
            <div class="font-bold text-lg">{{ ActivityName }}</div>
            <div class="text-sm">活動時間: {{ formatTime(StartTime) }}</div>
            <div class="text-sm">主辦單位: {{ Organizer }}</div>
            <div class="flex gap-2 items-center">
              <p class="px-2 py-0.5 rounded bg-midnight text-white text-sm">{{ City }}</p>
              <p v-if="Class1 || Class2" class="px-2 py-0.5 rounded bg-midnight text-white text-sm">
                {{ Class1 || Class2 }}
              </p>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <RouterLink
              :to="`/tourism/activities/${ActivityID}`"
              class="bg-herb text-white p-2 rounded text-center"
              >了解更多</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
    <ThePagination
      :currentPage="currentPage"
      :totalPage="totalPage"
      @update:currentPage="updateCurrentPage"
    />
  </section>
</template>

<script>
import tourismStore from '@/stores/tourismStore.js'
import { mapState } from 'pinia'
import ThePagination from '@/components/ThePagination.vue'
import { getTourisumactivityByCity } from '@/api/getTourismSpot'
import dayjs from 'dayjs'
import { RouterLink } from 'vue-router'

export default {
  components: {
    ThePagination
  },
  data() {
    return {
      tourismActivity: [],
      activityLength: 0,
      currentPage: 1
    }
  },
  methods: {
    async tourismActivityFetchData(value) {
      try {
        const response = await getTourisumactivityByCity(value)
        this.tourismActivity = response.data
        this.activityLength = response.data.length
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    getFirst50Words(text) {
      if (!text) return ''
      const words = text.split('')
      // console.log(words)
      return words.slice(0, 50).join('') + (words.length > 50 ? '...' : '')
    },
    formatTime(time) {
      return dayjs(time).format('YYYY/MM/DD')
    },
    updateCurrentPage(page) {
      this.currentPage = page
    }
  },
  async created() {
    await this.tourismActivityFetchData(this.locationValue)
  },
  watch: {
    async locationName() {
      await this.tourismActivityFetchData(this.locationValue)
    },
    pageValue() {
      if (this.currentPage > this.totalPage) this.currentPage = 1
    }
  },
  computed: {
    ...mapState(tourismStore, ['locationName', 'locationValue', 'pageValue']),
    totalPage() {
      return Math.ceil(this.activityLength / this.pageValue)
    },
    spotDataShow() {
      let lastIndex = this.currentPage * this.pageValue
      let firstIndex = lastIndex - this.pageValue
      return this.tourismActivity.slice(firstIndex, lastIndex)
    }
  }
}
</script>
