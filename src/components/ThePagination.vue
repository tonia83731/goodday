<template>
  <div class="flex gap-2">
    <button href="#" class="" @click="setCurrentPage(1)" :disabled="currentPage === 1">
      <font-awesome-icon :icon="['fas', 'angles-left']" />
    </button>
    <button
      href="#"
      class=""
      @click="setCurrentPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>
    <a
      href="#"
      class="w-6 h-6 leading-6 text-center"
      :class="currentPage === page ? 'font-bold bg-marigold rounded-full' : ''"
      v-for="page in pagesToShow"
      :key="'page' + page"
      @click="setCurrentPage(page)"
      >{{ page }}</a
    >
    <button
      href="#"
      class=""
      @click="setCurrentPage(currentPage + 1)"
      :disabled="currentPage === totalPage"
    >
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
    <button
      href="#"
      class=""
      @click="setCurrentPage(totalPage)"
      :disabled="currentPage === totalPage"
    >
      <font-awesome-icon :icon="['fas', 'angles-right']" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPage: Number
  },
  data() {
    return {
      cityOptions: [],
      pageOptions: [9, 12, 24, 36]
    }
  },
  methods: {
    setCurrentPage(page) {
      if (page > 1 || page < this.totalPage) this.$emit('update:currentPage', page)
    }
  },
  async created() {},
  mounted() {},
  watch: {},
  computed: {
    pagesToShow() {
      let delta = 2
      let show_per_page = 5
      let firstPage, lastPage
      if (this.currentPage < 3) {
        firstPage = 1
        lastPage = show_per_page
      } else if (this.currentPage > this.totalPage - 2) {
        firstPage = this.totalPage - show_per_page + 1
        lastPage = this.totalPage
      } else {
        firstPage = this.currentPage - delta
        lastPage = this.currentPage + delta
      }
      let result = []
      for (let i = firstPage; i <= lastPage; i++) {
        result.push(i)
      }
      return this.totalPage < 5 ? this.totalPage : result
    }
  }
}
</script>
