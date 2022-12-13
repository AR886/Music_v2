import request from './request'

// 默认搜索关键词
// 接口地址 : /search/default
export const searchDefault = () => request({ url: '/search/default', method: 'get' })

// 热搜列表(详细)
// 说明 : 调用此接口,可获取热门搜索列表
// 接口地址 : /search/hot/detail
export const searchHotDetail = () => request({ url: '/search/hot/detail', method: 'get' })

// 搜索
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
// 必选参数 : keywords : 关键词
// 可选参数 : limit: 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
// 接口地址 : /search 或者 /cloudsearch(更全)
export const search = (keywords) => request({ url: '/search', method: 'get', params: { keywords } })

// 歌手分类列表
// 说明 : 调用此接口,可获取歌手分类列表
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
// 接口地址 : /artist/list
export const singerCateList = (data) =>
  request({
    url: '/artist/list',
    method: 'get',
    params: {
      type: data.type,
      area: data.area,
      initial: data.initial,
      offset: data.offset
    }
  })

// 歌手热门 50 首歌曲
// 说明 : 调用此接口,可获取歌手热门 50 首歌曲
// 必选参数 :
// id : 歌手 id
// 接口地址 : /artist/top/song
export const singerHotSong = (id) => request({ url: '/artist/top/song', params: { id } })
