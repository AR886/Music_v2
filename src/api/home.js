import request from './request'

// 轮播图
export const banner = () => request({ method: 'get', url: '/banner' })

// 推荐歌单
export const recommendedSong = () => request({ method: 'get', url: '/personalized' })

// 推荐新音乐  可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
export const recommendNewMusic = (data) => request({ url: `/personalized/newsong?limit=${data}`, method: 'get' })

// 推荐MV
export const recommendMV = () => request({ url: '/personalized/mv', method: 'get' })

// 最新专辑
export const newest = () => request({ url: '/album/newest', method: 'get' })
