<template>
  <section id="spot" class="">
    <div class="w-full text-gray-400 text-center my-4" v-if="!hotelLength">沒有旅遊資料</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      <div
        class=""
        v-for="{ HotelID, HotelName, Phone, Description, Class, Picture } in spotDataShow"
        :key="HotelID"
      >
        <img
          v-if="Picture.PictureUrl1"
          :src="Picture.PictureUrl1 || '../assets/travel.jpg'"
          :alt="Picture.PictureDescription1"
          class="w-full h-60 object-cover object-center"
        />
        <img
          v-else
          src="../assets/travel.jpg"
          :alt="Picture.PictureDescription1"
          class="w-full h-60 object-cover object-center"
        />
        <div class="py-2 px-4 bg-white">
          <div class="flex justify-between items-center">
            <h5 class="font-extrabold text-xl truncate">{{ HotelName }}</h5>
            <a :href="'tel:' + Phone" class="text-lg" :title="Phone">
              <font-awesome-icon :icon="['fas', 'square-phone']" />
            </a>
          </div>
          <div class="flex gap-2 text-sm">
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
import tourismStore from '@/stores/tourismStore.js'
import { mapState } from 'pinia'
import ThePagination from '@/components/ThePagination.vue'
import { getTourisumhotelByCity } from '@/api/getTourismSpot'

export default {
  components: {
    ThePagination
  },
  data() {
    return {
      tourismHotel: [],
      hotelLength: 0,
      currentPage: 1
    }
  },
  methods: {
    async tourisumhotelFetchData(value) {
      try {
        const response = await getTourisumhotelByCity(value)
        this.tourismHotel = response.data
        this.hotelLength = response.data.length
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
    await this.tourisumhotelFetchData(this.locationValue)
  },
  watch: {
    async locationName() {
      await this.tourisumhotelFetchData(this.locationValue)
    },
    pageValue() {
      if (this.currentPage > this.totalPage) this.currentPage = 1
    }
  },
  computed: {
    ...mapState(tourismStore, ['locationName', 'locationValue', 'pageValue']),
    totalPage() {
      return Math.ceil(this.hotelLength / this.pageValue)
    },
    spotDataShow() {
      let lastIndex = this.currentPage * this.pageValue
      let firstIndex = lastIndex - this.pageValue
      return this.tourismHotel.slice(firstIndex, lastIndex)
    }
  }
}
</script>
