import { defineStore } from 'pinia'
import { getCityHelpers, twCity } from '../helpers/cityDistrictsHelpers'
export default defineStore('tourismStore', {
  state: () => ({
    cityOptions: [],
    pageOptions: [9, 12, 24, 36],
    locationName: '臺北市',
    locationValue: 'Taipei',
    pageValue: 9
  }),
  actions: {
    getCityOptions() {
      this.cityOptions = getCityHelpers()
    },
    updateLocationName(name) {
      this.locationName = name
      const obj = twCity.find((item) => item.label === name)
      this.locationValue = obj.value
    },
    updatePageValue(page) {
      this.pageValue = page
    }
  },
  watch: {}
})
