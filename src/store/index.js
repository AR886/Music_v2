import Vue from 'vue'
import Vuex from 'vuex'

import Home from './home'
import Explore from './explore'
import Playlist from './playlist'
Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    Home,
    Explore,
    Playlist
  }
})
