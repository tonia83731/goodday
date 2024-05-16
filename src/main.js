import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// vue-select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)
//dayjs
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
dayjs().locale('zh-tw')
// datepicker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('v-select', vSelect)
app.component('VueDatePicker', VueDatePicker)
app.provide('dayjs', dayjs)

app.mount('#app')
