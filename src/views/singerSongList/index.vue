<template>
  <div class="container">
    <!-- 歌手信息盒子 -->
    <div class="singerBox">
      <div class="singerImg">
        <img :src="singerInfo.img" alt="">
      </div>
      <div class="singerInfo">
        <p class="name">{{singerInfo.name}}</p>
        <div class="singerAlias">
          <span class="alias" v-for="item,index in singerInfo.alias" :key="index">{{item}}</span>
        </div>

        <p>单曲数: <span class="count">{{singerInfo.musicSize}}</span></p>
        <PlayAllDialog :list="songs" />
      </div>
    </div>

    <PlaylistTable :list="songs" />
  </div>
</template>

<script>
import PlayAllDialog from '@/components/playAllDialog.vue'
import PlaylistTable from '@/components/playlistTable.vue'
import { singerHotSong } from '@/api/common'
export default {
  name: 'singerSongList',
  components: {
    PlayAllDialog,
    PlaylistTable
  },
  data() {
    return {
      // query 传递来的歌手信息
      singerInfo: {},
      // 歌手歌曲列表
      songs: []
    }
  },
  methods: {
    async getSingerSongInfo() {
      const { data } = await singerHotSong(this.singerInfo.id)
      if (data.code === 200) {
        data.songs.forEach(item => {
          this.$set(item, 'isLove', false)
        })
        this.songs = data.songs
      }
    }
  },
  mounted() {
    this.singerInfo = this.$route.query
    this.getSingerSongInfo()
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
// 歌手信息盒子
.singerBox {
  width: 100%;
  height: 340px;
  display: flex;
  background-color: #333;
  padding: 20px 40px;
  margin-bottom: 20px;
  box-sizing: border-box;

  // 歌手图片
  .singerImg {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  // 歌手信息
  .singerInfo {
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .name {
      font-size: 40px;
      color: #ddd;
    }
    .alias {
      color: #aaa;
      margin-right: 20px;
    }
    .count {
      color: #ccc;
    }
  }
}
</style>
