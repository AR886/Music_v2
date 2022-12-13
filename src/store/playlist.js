import { songLyric } from '@/api/playlist'

const state = {
  // 歌曲列表信息
  songInfo: JSON.parse(localStorage.getItem('songInfo')) || [],
  songLyric: {}
}
const actions = {
  // 获取歌曲歌词
  async getSongLyric({ commit }, id) {
    const { data } = await songLyric(id)
    if (data.code === 200) {
      commit('GETSONGLYRIC', data)
    }
  }
}
const mutations = {
  // 歌曲信息
  GETSONGINFO(state, data) {
    // 从 localstorage 上拿存储数据
    let arr = state.songInfo
    // 判断 播放列表上有没有该数据
    if (!arr.every((item) => item.id !== data.id)) {
      arr = arr.filter((item) => item.id !== data.id)
    }
    arr.unshift(data)
    state.songInfo = arr
    localStorage.setItem('songInfo', JSON.stringify(arr))
  },
  // 全部播放 替换播放列表
  AllPLAYLISTINFO(state, data) {
    state.songInfo = data
    // 清除 localStorage 上 songInfo 的信息
    localStorage.clear('songInfo')
    localStorage.setItem('songInfo', JSON.stringify(data))
  },
  // 获取歌曲歌词
  GETSONGLYRIC(state, data) {
    const lyricArr = data.lrc.lyric.split('[').slice(1) // 先以[进行分割
    const lrcObj = {}
    lyricArr.forEach((item) => {
      const arr = item.split(']') // 再分割右括号
      // 时间换算成秒
      const m = parseInt(arr[0].split(':')[0])
      const s = parseInt(arr[0].split(':')[1])
      arr[0] = m * 60 + s
      if (arr[1] !== '\n') {
        // 去除歌词中的换行符
        lrcObj[arr[0]] = arr[1]
      } else if (arr[1] === '\n') {
        lrcObj[arr[0]] = ''
      }
    })
    // 存储数据
    state.songLyric = lrcObj
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
