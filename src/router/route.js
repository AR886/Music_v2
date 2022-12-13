export default [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout'),
    redirect: 'home',
    children: [
      // 首页
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      },
      // 发现
      {
        path: 'explore',
        name: 'explore',
        component: () => import('@/views/explore')
      },
      // 音乐库
      {
        path: 'musicStore',
        name: 'musicStore',
        component: () => import('@/views/musicStore')
      },
      // 歌单列表
      {
        path: 'playList',
        name: 'playList',
        component: () => import('@/views/playlist')
      },
      // 搜索页
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/search')
      },
      // 歌手榜页
      {
        path: 'singer',
        name: 'singer',
        component: () => import('@/views/singer')
      },
      // 歌手信息页
      {
        path: 'singerSongList',
        name: 'singerSongList',
        component: () => import('@/views/singerSongList')
      }
    ]
  }
]
