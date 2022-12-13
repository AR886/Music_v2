<template>
  <div class="container">
    <!-- 分类标签 -->
    <div class="singerCategoryBox">
      <!-- 语种 -->
      <div class="languages">
        <span>语种：</span>
        <span class="cateSpan" :class="item.id === lang?'checkRed':''" v-for="item in languages" :key="item.id" @click="lang = item.id">{{item.name}}</span>
      </div>
      <!-- 分类 -->
      <div class="category">
        <span>分类：</span>
        <span class="cateSpan" :class="item.id === cate?'checkRed':''" v-for="item in category" :key="item.id" @click="cate = item.id">{{item.name}}</span>
      </div>
      <!-- 筛选 -->
      <div class="screen">
        <span>筛选：</span>
        <span class="cateSpan" :class="index == screenIndex?'checkRed':''" v-for="item,index in screen" :key="index" @click="screenIndex = index">{{item}}</span>
      </div>
    </div>

    <!-- 歌手列表盒子 -->
    <div class="singerList" ref="singerBox">
      <div class="singerItem" v-for="item in artists" :key="item.id" @click="goSingerInfo(item)">
        <div class="itemPic">
          <img :src="item.picUrl" alt="">
        </div>
        <p class="itemName">{{item.name}}</p>
      </div>

    </div>

  </div>
</template>

<script>
import { singerCateList } from '@/api/common'
export default {
  name: 'singer',
  data() {
    return {
      // 语种分类标签
      languages: [
        { id: '-1', name: '全部' },
        { id: '7', name: '华语' },
        { id: '96', name: '欧美' },
        { id: '8', name: '日本' },
        { id: '16', name: '韩国' },
        { id: '0', name: '其他' }
      ],
      // 分类标签
      category: [
        { id: '-1', name: '全部' },
        { id: '1', name: '男歌手' },
        { id: '2', name: '女歌手' },
        { id: '3', name: '乐队组合' }
      ],
      // 筛选标签
      screen: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      // 各种标签选中项
      lang: '-1',
      cate: '-1',
      // 筛选用的是 索引 根据索引拿 字符
      screenIndex: 0,
      // 页码值
      page: 1,
      // 请求的歌手列表
      artists: [],
      // 是否加载新的歌手
      addSinger: false
    }
  },
  methods: {
    // 获取歌手列表信息
    async getSingerList() {
      const obj = {
        type: this.cate,
        area: this.lang,
        initial: this.screen[this.screenIndex] === '热门' ? '-1' : this.screen[this.screenIndex],
        offset: (this.page - 1) * 30
      }
      const { data } = await singerCateList(obj)
      if (data.code === 200) {
        // 判断 是下拉加载 还是点击 分类标签
        if (this.page !== 1) {
          this.artists.push(...data.artists)
        } else {
          this.artists = data.artists
        }
      }
    },
    // 滚动事件-触底
    handleScroll() {
      const winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (winHeight + st >= Math.floor(docHeight * 0.95)) {
        if (!this.addSinger) {
          this.page++
          // console.log('触底了page', this.page)
          this.getSingerList()
        }
      }
    },
    // 节流函数
    throttle(event, time) {
      let timer = null
      return _ => {
        if (!timer) {
          timer = setTimeout(_ => {
            event()
            timer = null
          }, time)
        }
      }
    },
    // 点击进入具体歌手页
    goSingerInfo(item) {
      // 携带歌手ID 去歌手信息页
      this.$router.push({
        path: 'singerSongList',
        name: 'singerSongList',
        query: {
          id: item.id,
          img: item.img1v1Url,
          name: item.name,
          alias: item.alias,
          musicSize: item.musicSize
        }
      })
    }
  },
  mounted() {
    this.getSingerList()
    // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
    window.addEventListener('scroll', this.throttle(this.handleScroll, 2000), true)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttle(this.handleScroll, 2000), true)
  },
  watch: {
    lang() {
      this.getSingerList()
      this.page = 1
    },
    cate() {
      this.getSingerList()
      this.page = 1
    },
    screenIndex() {
      this.getSingerList()
      this.page = 1
    }
  }
}
</script>

<style lang="less" scoped>
// 选中样式
.checkRed {
  color: rgb(207, 61, 61) !important;
  background-color: rgba(207, 61, 61, 0.1);
}

// 分类span 样式
.cateSpan {
  color: #ccc;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    color: #fff;
  }
}
// 分类标签
.singerCategoryBox {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 40px;
  box-sizing: border-box;
}
// 歌手列表
.singerList {
  width: 100%;
  height: 100%;
  background-color: rgba(50, 48, 48, 0.5);
  border-radius: 20px;
  margin: 20px 0;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  .singerItem {
    width: 150px;
    height: 180px;
    margin: 10px 10px 0 0;
    padding: 10px;
    cursor: pointer;

    .itemPic {
      width: 100%;
      height: 150px;
      background-color: antiquewhite;
      overflow: hidden;
      border-radius: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .itemName {
      text-align: center;
      height: 30px;
      line-height: 30px;
      color: #ccc;
      font-size: 13px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
