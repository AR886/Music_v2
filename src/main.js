import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/elementui'
import '@/assets/reset.css'

import SongSheet from '@/components/songSheet.vue'
Vue.config.productionTip = false
Vue.component('songSheet', SongSheet)
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
