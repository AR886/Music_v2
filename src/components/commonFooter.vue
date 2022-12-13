<template>
  <div class="container">
    <transition>
      <!-- 展开的歌曲信息 -->
      <div v-show="isExpand" class="expandSongBox">
        <!-- 让展开盒子收缩按钮 -->
        <el-button size="mini" icon="el-icon-arrow-down" @click="openBox" class="btn"></el-button>
        <!-- 盒子信息区域 -->
        <div class="songBox">
          <el-row>
            <!-- 歌曲图片区域 -->
            <el-col :span="12" :offset="0">
              <div class="songPicUrl" ref="songPicUrl" :class="isPlay?'rotate':''">
                <img :src="playMusicList[n].al.picUrl">
              </div>
            </el-col>
            <!-- 歌曲信息区域 和 歌词 -->
            <el-col :span="12" :offset="0">
              <!-- 歌曲信息区域 -->
              <div class="songInfo">
                <p>{{playMusicList[n].name}}</p>
                <div class="singerOrAlbum">
                  <div> 歌手:
                    <span style="margin-right:10px;" v-for="item in playMusicList[n].ar" :key="item.id">{{item.name}}</span>
                  </div>
                  <div>专辑: <span>{{playMusicList[n].al.name}}</span></div>
                </div>
              </div>
              <!-- 歌曲歌词区域 -->
              <div class="lyric" ref="lyric">
                <li :class="{each:true, choose: (key==lyricIndex)}" v-for="(item,key) in songLyric" :key="key">{{item}}</li>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </transition>
    <!-- 底部歌曲信息 -->
    <div class="playFooter">
      <!-- 左侧当前播放歌曲区域 -->
      <div class="left">
        <!-- 图片 -->
        <div class="music-img">
          <img :src="playMusicList[n].al.picUrl">
        </div>
        <!-- 歌名 歌手名 -->
        <div class="music-nick">
          <span class="music-song">{{playMusicList[n].name}}</span>
          <div class="music-singer">
            <span v-for="item in playMusicList[n].ar" :key="item.id">{{item.name}}</span>
          </div>
        </div>
        <!-- 小心心 -->
        <svg t="1668524360812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2630" v-if="isLove" @click="isLove = !isLove">
          <path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" p-id="2631" fill="#d81e06"></path>
        </svg>
        <svg t="1668522498470" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504" v-else @click="isLove = !isLove">
          <path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" p-id="1505" fill="#dbdbdb"></path>
        </svg>

      </div>
      <!-- 中间切换 暂停区域 -->
      <div class="center">
        <i class="el-icon-arrow-left" @click="toggleSong(-1)"></i>
        <i v-if="isPlay" class="el-icon-video-pause" @click="pauseOrPlay"></i>
        <i v-else class="el-icon-video-play" @click="pauseOrPlay"></i>
        <i class="el-icon-arrow-right" @click="toggleSong(1)"></i>
      </div>
      <!-- 右侧播放列表 -->
      <div class="right">
        <svg t="1668609072226" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2219" v-if="voice !== 0">
          <path d="M784 371.2c-16-25.6-35.2-44.8-44.8-54.4-9.6-9.6-28.8-9.6-38.4 3.2-9.6 9.6-9.6 28.8 3.2 38.4 3.2 3.2 6.4 6.4 9.6 9.6 9.6 9.6 19.2 22.4 25.6 35.2 57.6 86.4 57.6 179.2-38.4 278.4-9.6 9.6-9.6 28.8 0 38.4 9.6 9.6 28.8 9.6 38.4 0C851.2 598.4 851.2 476.8 784 371.2z" p-id="2220" fill="#ffffff"></path>
          <path d="M896 246.4c-16-25.6-35.2-48-54.4-70.4-9.6-12.8-19.2-19.2-25.6-25.6-9.6-9.6-28.8-9.6-38.4 3.2-9.6 9.6-9.6 28.8 3.2 38.4 3.2 3.2 12.8 9.6 22.4 22.4 16 19.2 32 38.4 48 64 105.6 160 105.6 336-70.4 518.4-9.6 9.6-9.6 28.8 0 38.4 9.6 9.6 28.8 9.6 38.4 0C1014.4 630.4 1014.4 425.6 896 246.4z" p-id="2221" fill="#ffffff"></path>
          <path d="M483.2 86.4l-217.6 185.6-108.8 0c-57.6 0-108.8 48-108.8 108.8l0 272c0 60.8 48 108.8 108.8 108.8l96 0 230.4 182.4c54.4 41.6 105.6 16 105.6-51.2l0-755.2C588.8 67.2 534.4 41.6 483.2 86.4zM534.4 889.6c0 22.4-3.2 22.4-19.2 9.6l-236.8-185.6c-3.2-3.2-9.6-6.4-16-6.4l-105.6 0c-28.8 0-54.4-25.6-54.4-54.4l0-272c0-28.8 25.6-54.4 54.4-54.4l118.4 0c6.4 0 12.8-3.2 16-6.4l224-192c16-12.8 16-12.8 16 6.4L531.2 889.6z" p-id="2222" fill="#ffffff"></path>
        </svg>
        <svg t="1668610500940" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2424" width="64" height="64" v-else>
          <path d="M128 420.576v200.864h149.12l175.456 140.064V284.288l-169.792 136.288H128z m132.256-64l204.288-163.968a32 32 0 0 1 52.032 24.96v610.432a32 32 0 0 1-51.968 24.992l-209.92-167.552H96a32 32 0 0 1-32-32v-264.864a32 32 0 0 1 32-32h164.256zM752 458.656L870.4 300.8a32 32 0 1 1 51.2 38.4L792 512l129.6 172.8a32 32 0 0 1-51.2 38.4l-118.4-157.856-118.4 157.856a32 32 0 0 1-51.2-38.4l129.6-172.8-129.6-172.8a32 32 0 0 1 51.2-38.4l118.4 157.856z" p-id="2425" fill="#ffffff"></path>
        </svg>
        <!-- 滑块 -->
        <div class="block">
          <el-slider v-model="voice" :max="1" :step="0.1"></el-slider>
        </div>
        <!-- 播放列表 -->
        <el-button size="default" icon="el-icon-arrow-up" class="playButton" @click="openBox"></el-button>
      </div>

      <!-- 音频播放文件 -->
      <audio :src="playMusicUrl" ref="musicAudio" @ended="playStop" @error="playError" @timeupdate="updateTime"></audio>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'commonFooter',
  data() {
    return {
      // 判断切换喜欢 爱心
      isLove: false,
      // 判断切换 播放 暂停
      isPlay: false,
      // 声音大小
      voice: 0.6,
      // 切换playMusicList 数组的选项
      n: 0,
      // 是否展开底部播放栏
      isExpand: false,
      // 现在播放的第几句歌词
      lyricIndex: 0,
      // 播放了几句歌词 用来改变歌词的位置
      lyricNum: 0
    }
  },
  methods: {
    // 暂停 播放
    pauseOrPlay() {
      if (this.isPlay) {
        this.$refs.musicAudio.pause()
      } else {
        this.$refs.musicAudio.play()
      }
      this.isPlay = !this.isPlay
    },
    // 切换歌曲
    toggleSong(n) {
      if (this.n === 0 && n === -1) {
        this.n = this.playMusicList.length - 1
      } else if (this.n === this.playMusicList.length - 1 && n === 1) {
        this.n = 0
      } else {
        this.n += n
      }
      this.isPlay = false
      this.$nextTick(() => {
        this.pauseOrPlay()
      })
      this.getSongLyric()
      // 初始化 滚动歌词
      this.$refs.lyric.scrollTop = 0
      this.lyricNum = 0
    },
    // 当播放结束后自动播放下一首歌
    playStop() {
      this.toggleSong(1)
    },
    playError() {
      this.$message({
        type: 'error',
        message: '遇到了错误!!!  3秒后自动播放下一首'
      })
      setTimeout(() => {
        this.toggleSong(1)
      }, 1000)
    },
    // 展开播放信息盒子
    openBox() {
      this.isExpand = !this.isExpand
    },
    // 获取歌曲歌词
    getSongLyric() {
      const id = this.playMusicList[this.n].id
      this.$store.dispatch('getSongLyric', id)
    },
    // 播放音频 时间改变触发
    updateTime() {
      if (this.songLyric[parseInt(this.$refs.musicAudio.currentTime)]) {
        this.lyricIndex = parseInt(this.$refs.musicAudio.currentTime)
      }
    }
  },
  computed: {
    // 播放歌曲src 地址
    playMusicUrl() {
      return `https://music.163.com/song/media/outer/url?id=${this.playMusicList[this.n].id}.mp3`
    },
    // 播放列表信息
    playMusicList() {
      return this.$store.state.Playlist.songInfo
    },
    ...mapState({
      songLyric: state => state.Playlist.songLyric
    })
  },
  mounted() {
    // 当双击时触发 自动播放功能
    this.$bus.$off('playSong')
    this.$bus.$on('playSong', () => {
      this.isPlay = false
      this.$nextTick(() => {
        this.pauseOrPlay()
      })
    })

    // 获取当前歌曲歌词
    this.getSongLyric()
  },
  watch: {
    // 音量大小
    voice(newVal) {
      this.$refs.musicAudio.volume = newVal
    },
    // 当前歌词位置
    lyricIndex() {
      let i = 0
      // 循环歌词对象
      for (const key in this.songLyric) {
        // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度  lyricIndex
        if (+key === this.lyricIndex && i > 5) {
          // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
          this.$refs.lyric.scrollTop = 30 * (i - 5)
        }
        i++
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}

//展开盒子区域
.expandSongBox {
  background-color: #333;
  width: 100%;
  height: calc(100vh - 60px);
  position: fixed;
  bottom: 60px;
  left: 0;
  display: flex;
  justify-content: center;

  // 收缩盒子按钮
  .btn {
    position: fixed;
    left: 20px;
    top: 20px;
    border: none;
    background-color: #333;
    font-size: 18px;
    color: #ccc;
    border-radius: 20px;
  }
  // 盒子区域
  .songBox {
    width: 80%;
    height: calc(100vh - 60px);
    background-color: #444;

    // 歌曲图片区域
    .songPicUrl {
      margin: 150px 0 0 100px;
      width: 300px;
      height: 300px;
      border: 40px solid #111;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    // 歌曲信息区域
    .songInfo {
      margin-top: 40px;
      width: 100%;
      height: 100px;
      color: #ccc;

      p {
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
      }

      .singerOrAlbum {
        display: flex;
        justify-content: space-around;
      }
    }
    // 歌曲歌词区域
    .lyric {
      width: 100%;
      height: 520px;
      // 滚动条
      overflow: auto;
      color: #ddd;
      font-size: 14px;
      font-weight: normal;
      padding: 5px 10px;
      box-sizing: border-box;
      .each {
        height: 30px;
        // border: 1px solid #000;
        line-height: 30px;
        text-align: center;
      }
      .choose {
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        color: #fff;
      }
      // 修改滚动条样式
      &::-webkit-scrollbar {
        width: 3px;
        height: 1px;
      }
      // 滑块部分
      &::-webkit-scrollbar-thumb {
        background-color: #eee;
      }
      // 轨道部分
      &::-webkit-scrollbar-track {
        background-color: #333;
      }
    }
  }
}
// 底部信息
.playFooter {
  width: 100%;
  background-color: #333;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;

  .left {
    min-width: 200px;
    height: 60px;
    margin-left: 40px;
    display: flex;
    align-items: center;

    .music-img {
      width: 56px;
      height: 56px;
      background-color: #333;
      margin: 2px;
      border-radius: 6px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .music-nick {
      margin-left: 20px;

      .music-singer {
        font-size: 12px;
        color: #999;
        margin-top: 8px;
        cursor: pointer;
        span {
          margin-right: 4px;
          &:hover {
            color: #ccc;
          }
        }
      }
    }
    svg {
      margin-left: 40px;
      width: 26px;
      height: 26px;
      cursor: pointer;
    }
  }
  .center {
    width: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 播放切换图标
    i {
      color: #fff;
      font-size: 40px;
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    align-items: center;
    svg {
      width: 28px;
      height: 28px;
    }
    .block {
      margin: 0 20px;
      width: 120px;

      /deep/.el-slider__button {
        border: none;
      }
      /deep/.el-slider__bar {
        background-color: #ff6868;
      }
    }
    .playButton {
      border: none;
      background-color: #333;
      font-size: 20px;
    }
  }
}

// 展开底部盒子信息动画
@keyframes expand {
  0% {
    height: 60px;
  }
  100% {
    height: 100%;
  }
}

// 旋转歌曲图片动画
@keyframes rotatePic {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 旋转盒子
.rotate {
  animation: rotatePic 20s linear infinite;
}

.v-enter-active {
  animation: expand 0.5s linear;
}
.v-leave-active {
  animation: expand 0.5s linear reverse;
}
</style>
