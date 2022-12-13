<template>
  <div class="container">
    <!-- 轮播图 banner -->
    <el-carousel :interval="4000" type="card" height="200px" indicator-position="none">
      <el-carousel-item v-for="(item,$index) in bannerList" :key="$index" class="carouselItem">
        <img :src="item.imageUrl">
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <song-sheet :list="tenRandomSongList" title="推荐歌单 >" />
    <el-row :gutter="20">
      <el-col :span="16">
        <!-- 推荐新音乐 -->
        <el-card shadow="always" class="cardbg">
          <!-- 标题 -->
          <div slot="header" class="card-title">
            <span>推荐新音乐 ></span>
          </div>
          <!-- 列表 -->
          <div class="music-list">
            <!-- 每一个音乐 -->
            <div class="music-item" v-for="item in newMusicList" :key="item.id">
              <!-- 音乐图片 -->
              <div class="music-item-img">
                <img :src="item.picUrl">
              </div>
              <div class="music-item-info">
                <span class="music-item-name">{{item.name}}</span>
                <span class="music-item-singer">{{item.singer}}</span>
              </div>
            </div>
          </div>
        </el-card>
        <!-- 热门歌手 -->
        <el-card shadow="always" class="cardbg">
          <div slot="header" class="card-title">
            <span @click="toSinger">
              全部歌手 >
            </span>
          </div>
          <div class="hotSinger-list">
            <div class="hotSinger-item" v-for="item in hotSingerList" :key="item.id" @click="goSingerInfo(item)">
              <span>{{item.name}}</span>
              <img :src="item.picUrl" :alt="item.name">
            </div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="8">
        <!-- 推荐MV -->
        <el-card shadow="always" class="cardbg" style="padding:none;">
          <div slot="header" class="card-title">
            <span>推荐MV ></span>
          </div>
          <div class="mv-item" v-for="item in mvList" :key="item.id">
            <div class="mv-item-img">
              <img :src="item.picUrl">
            </div>
            <span class="mv-name">{{item.name}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 最新专辑 -->
    <song-sheet :list="fiveAlbumsList" title="最新专辑 >" />

  </div>
</template>

<script>
import { banner, recommendNewMusic, recommendMV } from '@/api/home'
import { hotSinger } from '@/api/explore'
import { mapGetters } from 'vuex'
import songSheet from '@/components/songSheet.vue'
export default {
  components: { songSheet },
  name: 'home',
  data() {
    return {
      // 轮播图列表
      bannerList: [],
      // 推荐新音乐列表
      newMusicList: [],
      // 推荐MV列表
      mvList: [],
      // 热门歌手列表
      hotSingerList: []
    }
  },
  methods: {
    // 获取轮播图数据
    async getBannerList() {
      const { data } = await banner()
      if (data.code !== 200) this.$message('request bannerList fail')
      this.bannerList = data.banners
    },
    // 获取推荐歌单列表数据
    getTenRecommendSongList() {
      this.$store.dispatch('getRecommendSongList')
    },
    // 获取推荐新音乐列表数据
    async getRecommendNewMusicList(num = 10) {
      const { data } = await recommendNewMusic(num)
      if (data.code === 200) {
        this.newMusicList = data.result
      }
      this.newMusicList.forEach(item => {
        item.singer = ''
        item.song.artists.forEach(item2 => {
          item.singer += `${item2.name} `
        })
      })
    },
    // 获取推荐MV列表数据
    async getRecommendList() {
      const { data } = await recommendMV()
      if (data.code === 200) {
        this.mvList = data.result
      }
    },
    // 获取热门歌手
    async getHotSinger(limit = 12, offset = 0) {
      const { data } = await hotSinger(limit, offset)
      try {
        if (data.code === 200) {
          this.hotSingerList = data.artists
        }
      } catch (error) {
        this.$message(error)
      }
    },
    // 获取最新专辑
    getNewEst() {
      this.$store.dispatch('getNewEst')
    },
    // 去歌手页
    toSinger() {
      this.$router.push('singer')
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
  computed: {
    ...mapGetters(('home', ['tenRandomSongList', 'fiveAlbumsList']))
  },
  mounted() {
    this.getBannerList()
    this.getTenRecommendSongList()
    this.getRecommendNewMusicList()
    this.getRecommendList()
    this.getHotSinger()
    this.getNewEst()
  }
}
</script>

<style lang="less" scoped>
// 修改 card 默认样式
.cardbg {
  margin: 20px 0;
  background-color: #333;
  border: none;
  /deep/.el-card__header {
    border: none;
  }
  .card-title {
    font-size: 20px;
    color: #ccc;
    margin-bottom: -30px;

    span {
      cursor: pointer;
    }
  }
  .card-title:hover {
    color: #ddd;
  }
}
// 轮播图区域
.carouselItem {
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

// 推荐新音乐区域
.music-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  // 每一个音乐项
  .music-item {
    margin-top: 20px;
    width: 290px;
    height: 100px;
    display: flex;
    align-items: center;
    cursor: pointer;

    // 图片
    .music-item-img {
      width: 100px;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .music-item-info {
      width: 190px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-left: 20px;
      box-sizing: border-box;

      .music-item-name {
        color: #ddd;
      }
      .music-item-singer {
        color: #999;
        overflow: hidden;
        font-size: 12px;
      }
      .music-item-singer:hover {
        color: #ddd;
      }
    }
  }
  .music-item:hover {
    background-color: #444;
  }
}
// 推荐MV
.mv-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  .mv-item-img {
    margin: 20px 0;
    widows: 100%;
    height: 170px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mv-name {
    width: 80%;
    text-align: center;
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mv-name:hover {
    color: #ddd;
  }
}
// 热门歌手
.hotSinger-list {
  width: 100%;
  height: 233px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  .hotSinger-item {
    position: relative;
    margin: 0 10px;
    width: 100px;
    height: 100px;
    background-color: #aaa;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: transparent;
      font-size: 12px;
    }
    span:hover {
      color: #fff;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .hotSinger-item:hover {
    box-shadow: 0 5px 20px #fff;
  }
}
</style>
