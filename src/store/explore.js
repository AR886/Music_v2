import { allTopList, boutiqueSongSheet, sheetTags } from '@/api/explore'
const state = {
  // 所有榜单数据
  topList: [],
  // 精品歌单数据
  boutiqueList: [],
  // 歌单标签列表
  sheetTagList: []
}
const actions = {
  // 获取所有榜单列表
  async getTopList({ commit }) {
    const { data } = await allTopList()
    if (data.code === 200) {
      commit('GETTOPLIST', data)
    }
  },
  // 获取精品歌单列表
  async getBoutiqueSongSheet({ commit }, cat = '全部') {
    const { data } = await boutiqueSongSheet(cat)
    if (data.code === 200) {
      commit('GETBOUTIQUESONGSHEET', data.playlists)
    }
  },
  // 获取歌单标签列表
  async getSheetTags({ commit }) {
    const { data } = await sheetTags()
    if (data.code === 200) {
      commit('GETSHEETTAGS', data.tags)
    }
  }
}
const mutations = {
  // 获取所有榜单列表
  GETTOPLIST(state, data) {
    data.artistToplist.coverImgUrl = data.artistToplist.coverUrl
    data.list.push(data.artistToplist)
    state.topList = data.list
  },
  // 获取精品歌单列表
  GETBOUTIQUESONGSHEET(state, data) {
    state.boutiqueList = data
  },
  // 获取歌单标签列表
  GETSHEETTAGS(state, data) {
    data.forEach((item) => (item.active = false))
    state.sheetTagList = data
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
