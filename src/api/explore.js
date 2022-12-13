import request from './request'

// 热门歌手  可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
export const hotSinger = (limit, offset) =>
  request({
    url: '/top/artists',
    method: 'get',
    params: {
      limit,
      offset
    }
  })

// 调用此接口,可获取所有榜单 接口地址 : /toplist
export const allTopList = () => request({ url: '/toplist', method: 'get' })

// 获取精品歌单
// 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
// limit: 取出歌单数量 , 默认为 20
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
export const boutiqueSongSheet = (data) =>
  request({
    url: '/top/playlist/highquality',
    method: 'get',
    params: {
      cat: data
    }
  })

// 精品歌单标签列表
export const sheetTags = () => request({ url: '/playlist/highquality/tags', method: 'get' })
