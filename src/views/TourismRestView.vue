<template>
  <section id="restaurant" class="">
    <div class="w-full text-gray-400 text-center my-4" v-if="!restLength">沒有旅遊資料</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      <div
        class=""
        v-for="{
          RestaurantID,
          RestaurantName,
          Phone,
          Description,
          City,
          Class,
          Picture
        } in spotDataShow"
        :key="RestaurantID"
      >
        <img
          v-if="Picture.PictureUrl1"
          :src="Picture.PictureUrl1 || '../assets/travel.jpg'"
          :alt="Picture.PictureDescription1"
          class="w-full h-60 object-cover object-center"
        />
        <img v-else src="../assets/travel.jpg" :alt="Picture.PictureDescription1" class="" />
        <div class="py-2 px-4 bg-white">
          <div class="flex justify-between items-center">
            <h5 class="font-extrabold text-xl truncate">{{ RestaurantName }}</h5>
            <a :href="'tel:' + Phone" class="text-lg" :title="Phone">
              <font-awesome-icon :icon="['fas', 'square-phone']" />
            </a>
          </div>
          <div class="flex gap-2 text-sm">
            <p class="px-2 py-1 rounded bg-midnight text-white">{{ City }}</p>
            <p v-if="Class" class="px-2 py-1 rounded bg-midnight text-white">
              {{ Class }}
            </p>
          </div>
          <div class="mt-2">
            {{ getFirst50Words(Description) }}
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
import tourismStore from '@/stores/tourismStore'
import { mapState } from 'pinia'
import ThePagination from '@/components/ThePagination.vue'
import { getCityHelpers } from '../helpers/cityDistrictsHelpers'
import { getTourisumrestByCity } from '@/api/getTourismSpot'

export default {
  components: {
    ThePagination
  },
  data() {
    return {
      tourismRest: [],
      restLength: 0,
      currentPage: 1
    }
  },
  methods: {
    async tourismRestFetchData(value) {
      try {
        const response = await getTourisumrestByCity(value)
        this.tourismRest = response.data
        this.restLength = response.data.length
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
    updateCurrentPage(page) {
      this.currentPage = page
    }
  },
  async created() {
    await this.tourismRestFetchData(this.locationValue)
  },
  mounted() {
    this.cityOptions = getCityHelpers()
  },
  watch: {
    async locationName() {
      await this.tourismRestFetchData(this.locationValue)
    },
    pageValue() {
      if (this.currentPage > this.totalPage) this.currentPage = 1
    }
  },
  computed: {
    ...mapState(tourismStore, ['locationName', 'locationValue', 'pageValue']),
    totalPage() {
      return Math.ceil(this.restLength / this.pageValue)
    },
    spotDataShow() {
      let lastIndex = this.currentPage * this.pageValue
      let firstIndex = lastIndex - this.pageValue
      return this.tourismRest.slice(firstIndex, lastIndex)
    }
  }
}
</script>
