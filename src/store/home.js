import { recommendedSong, recommendNewMusic, newest } from '@/api/home'

const state = {
  // 推荐歌单列表数据
  recommendSongList: [],
  // 最新专辑列表数据
  albumsList: []
}
const actions = {
  // 获取推荐歌单数据
  async getRecommendSongList({ commit }) {
    const { data } = await recommendedSong()
    if (data.code === 200) {
      this.commit('GETRECOMMENDSONGLIST', data.result)
    }
  },
  // 获取推荐新音乐数据
  async getRecommendNewMusic({ commit }, data) {
    const res = await recommendNewMusic(data)
    console.log(res)
  },
  // 获取最新专辑数据
  async getNewEst({ commit }) {
    const { data } = await newest()
    try {
      if (data.code === 200) {
        commit('GETNEWEST', data.albums)
      }
    } catch (error) {
      return new Promise(error)
    }
  }
}
const mutations = {
  // 获取推荐歌单数据
  GETRECOMMENDSONGLIST(state, data) {
    state.recommendSongList = data
  },
  // 获取最新专辑
  GETNEWEST(state, data) {
    state.albumsList = data
  }
}
const getters = {
  // 拿推荐歌单的十个选项
  tenRandomSongList(state) {
    const arr = []
    for (let i = 0; i < 10; i++) {
      if (state.recommendSongList[i]) {
        arr.push(state.recommendSongList[i])
      }
    }
    return arr || []
  },
  // 拿最新专辑的五个选项
  fiveAlbumsList(state) {
    const arr = []
    for (let i = 0; i < 5; i++) {
      if (state.albumsList[i]) {
        arr.push(state.albumsList[i])
      }
    }
    return arr || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
