<template>
  <section id="spot" class="">
    <div class="w-full text-gray-400 text-center my-4" v-if="!spotLength">沒有旅遊資料</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      <div
        class=""
        v-for="{
          ScenicSpotID,
          ScenicSpotName,
          Phone,
          Description,
          DescriptionDetail,
          City,
          Class1,
          Class2,
          Picture
        } in spotDataShow"
        :key="ScenicSpotID"
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
            <h5 class="font-extrabold text-xl truncate">{{ ScenicSpotName }}</h5>
            <a :href="'tel:' + Phone" class="text-lg" :title="Phone">
              <font-awesome-icon :icon="['fas', 'square-phone']" />
            </a>
          </div>
          <div class="flex gap-2 text-sm">
            <p class="px-2 py-1 rounded bg-midnight text-white">{{ City }}</p>
            <p v-if="Class1 || Class2" class="px-2 py-1 rounded bg-midnight text-white">
              {{ Class1 || Class2 }}
            </p>
          </div>
          <div class="mt-2">
            {{ getFirst50Words(Description) || getFirst50Words(DescriptionDetail) }}
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
import { getTourisumspotByCity } from '@/api/getTourismSpot'
import ThePagination from '@/components/ThePagination.vue'
import { mapState } from 'pinia'
import tourismStore from '@/stores/tourismStore.js'
// import { getFirst50Words } from '@/helpers/getFirst50Words.js'

export default {
  components: {
    ThePagination
  },
  data() {
    return {
      tourismSpot: [],
      spotLength: 0,
      currentPage: 1
    }
  },
  methods: {
    async tourisumspotFetchData(value) {
      try {
        const response = await getTourisumspotByCity(value)
        this.tourismSpot = response.data
        this.spotLength = response.data.length
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
    await this.tourisumspotFetchData(this.locationValue)
  },
  watch: {
    async locationName() {
      await this.tourisumspotFetchData(this.locationValue)
    },
    pageValue() {
      if (this.currentPage > this.totalPage) this.currentPage = 1
    }
  },
  computed: {
    ...mapState(tourismStore, ['locationName', 'locationValue', 'pageValue']),
    totalPage() {
      return Math.ceil(this.spotLength / this.pageValue)
    },
    spotDataShow() {
      let lastIndex = this.currentPage * this.pageValue
      let firstIndex = lastIndex - this.pageValue
      return this.tourismSpot.slice(firstIndex, lastIndex)
    }
  }
}
</script>
