<template>
  <section id="spot" class="">
    <div class="grid grid-cols-4 gap-4">
      <v-select
        :options="cityOptions"
        :clearable="false"
        label="city"
        placeholder="請選擇城市"
        v-model="selectLocation"
        class="w-full border border-lionsmane rounded col-span-3"
      ></v-select>
      <v-select
        :options="pageOptions"
        :clearable="false"
        label="per_page"
        v-model="selectPageValue"
        class="w-full border border-lionsmane rounded"
      ></v-select>
    </div>
    <nav class="flex gap-6 font-semibold sub-nav">
      <RouterLink :to="{ path: '/tourism/spots' }">旅遊景點</RouterLink>
      <RouterLink :to="{ path: '/tourism/restaurants' }">旅遊餐廳</RouterLink>
      <RouterLink :to="{ path: '/tourism/hotels' }">旅遊住宿</RouterLink>
      <RouterLink
        :to="{ path: '/tourism/activities' }"
        :class="isActive('/tourism/activities') && ''"
        >旅遊活動</RouterLink
      >
    </nav>
    <RouterView />
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { getCityHelpers } from '../helpers/cityDistrictsHelpers'
import tourismStore from '@/stores/tourismStore.js'
export default {
  data() {
    return {
      cityOptions: [],
      pageOptions: [9, 12, 24, 36],
      currentRoute: this.$route.path
    }
  },
  methods: {
    ...mapActions(tourismStore, ['updateLocationName', 'updatePageValue']),
    handleRouterChange(newRoute) {
      this.currentRoute = newRoute.path
    },
    isActive(path) {
      return this.currentRoute === path
    }
  },
  async created() {},
  mounted() {
    this.cityOptions = getCityHelpers()
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
      this.handleRouterChange(to)
    }
  },
  computed: {
    ...mapState(tourismStore, ['locationName', 'locationValue', 'pageValue']),
    selectLocation: {
      get() {
        return this.locationName
      },
      set(newValue) {
        this.updateLocationName(newValue)
      }
    },
    selectPageValue: {
      get() {
        return this.pageValue
      },
      set(newValue) {
        this.updatePageValue(newValue)
      }
    }
  }
}
</script>
<style>
/* // router-link-active router-link-exact-active */
.sub-nav > .router-link-active.router-link-exact-active {
  color: #f4a258;
  /* border:  */
}
</style>
