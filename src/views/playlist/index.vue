<template>
  <div class="container">
    <!-- 歌单盒子 -->
    <div class="songSheetBox">
      <div class="songSheetImg">
        <img :src="playlist.coverImgUrl" alt="">
      </div>
      <!-- 歌单详情信息 -->
      <div class="songSheetInfo">
        <div class="info-name">{{playlist.name}}</div>
        <div class="info-author">
          <el-avatar icon="el-icon-user-solid" :size="36" :src="author.avatarUrl"></el-avatar>
          <span class="infoAuthorAndTag">{{author.nickname}}</span>
          <span class="info-text">{{time}} 创建</span>
        </div>
        <div class="info-operation">
          <!-- 播放全部列表弹出层 -->
          <PlayAllDialog :list="tracks" style="margin-right:10px;" />
          <el-button type="info" round><i class="el-icon-document-add" /> 收藏</el-button>
          <el-button type="info" round><i class="el-icon-male" /> 分享</el-button>
          <el-button type="info" round><i class="el-icon-download" /> 下载全部</el-button>
        </div>
        <div class="info-tags">
          <template>标签:
            <span class="infoAuthorAndTag" v-for="(item,index) in allTag" :key="index">{{item}}</span>
          </template>
        </div>
        <div class="info-count">
          <span>歌曲:</span><span class="info-text">{{playlist.trackCount}}</span>
          <span>播放:</span><span class="info-text">{{playlist.playCount}}</span>
        </div>
        <div class="info-describe" v-if="playlist.description">
          <div>简介: </div>
          <div class="info-text describe-text">{{playlist.description}}</div>
        </div>
      </div>
    </div>
    <!-- 歌单歌曲列表 -->
    <PlaylistTable :list="tracks" />

  </div>
</template>

<script>
import dayjs from 'dayjs'
import PlayAllDialog from '@/components/playAllDialog.vue'
import PlaylistTable from '@/components/playlistTable.vue'
import { songSheetInfo } from '@/api/playlist'
export default {
  name: 'playList',
  components: {
    PlayAllDialog,
    PlaylistTable
  },
  data() {
    return {
      playlist: {},
      // 歌单歌曲表格css样式
      headerCellStyle: {
        color: '#999',
        'background-color': '#222',
        border: 'none'
      }
    }
  },
  methods: {
    // 获取歌曲列表
    async getSongSheetPlayList() {
      const { id } = this.$route.query
      const { data } = await songSheetInfo(id)
      try {
        if (data.code === 200) {
          this.playlist = data.playlist
        }
      } catch (error) {
        return error
      }
    }
  },
  computed: {
    // 标签
    allTag() {
      return this.playlist.tags ?? []
    },
    // 收藏者
    subscribers() {
      return this.playlist.subscribers ?? []
    },
    // 创建作者
    author() {
      return this.playlist.creator ?? []
    },
    // 不完整 歌单ID信息
    tracks() {
      this.playlist?.tracks?.forEach(item => {
        item.songTime = dayjs(item.dt).format('mm:ss')
        this.$set(item, 'isLove', false)
      })
      return this.playlist.tracks ?? []
    },
    // 歌单创建时间
    time() {
      return dayjs(this.playlist.createTime).format('YYYY-MM-DD')
    }
  },
  mounted() {
    this.getSongSheetPlayList()
  }
}
</script>

<style lang="less" scoped>
// 歌曲 播放 简介文字信息
.info-text {
  color: #bbb;
  margin: 0px 20px 0px 10px;
}
// 作者  标签项
.infoAuthorAndTag {
  color: rgba(255, 0, 0, 0.5);
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: #ccc;
  }
}
// 歌单盒子
.songSheetBox {
  width: 100%;
  height: 300px;

  .songSheetImg {
    width: 280px;
    height: 280px;
    float: left;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .songSheetInfo {
    width: auto;
    height: 100%;
    margin-left: 300px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .info-name {
      color: #ccc;
      font-size: 30px;
    }

    .info-author {
      display: flex;
      align-items: center;
    }

    .info-operation {
      display: flex;
    }
    .info-describe {
      display: flex;
      align-items: center;
      .describe-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        width: 90%;
      }
    }
  }
}
</style>
