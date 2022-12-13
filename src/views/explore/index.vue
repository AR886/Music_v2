<template>
  <div class="container">
    <div class="btn-box">
      <el-button size="default" class="btn-item" :class="item.active?'active-item':''" v-for="item in tags" :key="item.id" @click="toggleBtn(item)">{{item.name}}</el-button>
      <!-- 添加类型 -->
      <el-button size="default" class="btn-item" :class="isShowTagsBox?'active-item':''" icon="el-icon-plus" @click="isShowTagsBox = !isShowTagsBox"></el-button>
    </div>
    <!-- 歌单标签列表 -->
    <div class="sheetTags" v-show="isShowTagsBox">
      <div class="tag-box" v-for="item in forTag" :key="item.category">
        <div class="tag-title">{{item.title}}</div>
        <div class="tag-item">
          <el-button size="mini" v-for="item2 in tagCategory(item.category)" :key="item2.id" class="tag-name" @click="addTag(item2)">{{item2.name}}</el-button>
        </div>
      </div>
    </div>

    <!-- 具体类型歌单展示区域 -->
    <songSheet v-if="this.$route.query.category === '推荐歌单'" :list="recommendList" />
    <ExploreSongSheet v-else :list="list" />
  </div>
</template>

<script>
import ExploreSongSheet from '@/components/exploreSongSheet.vue'
export default {
  name: 'explore',
  data() {
    return {
      // 展示的默认标签列表
      tags: [
        { id: 1, name: '推荐歌单', active: true },
        { id: 2, name: '精品歌单', active: false },
        { id: 3, name: '排行榜', active: false }
      ],
      // 循环获取各个category的 tag
      forTag: [
        { title: '语种', category: 0 },
        { title: '风格', category: 1 },
        { title: '场景', category: 2 },
        { title: '情感', category: 3 },
        { title: '主题', category: 4 }
      ],
      // 控制 循环标签盒子 显示 隐藏
      isShowTagsBox: false,
      recommendList: [],
      activeName: '推荐歌单',
      list: []
    }
  },
  components: {
    ExploreSongSheet
  },
  beforeRouteUpdate(to, from, next) {
    this.getPlayList()
    next()
  },
  methods: {
    // 点击切换标签
    toggleBtn(item) {
      this.tags.forEach(i => {
        if (i.id === item.id) {
          i.active = true
        } else {
          i.active = false
        }
      })
      this.activeName = item.name
      this.$router.push({
        path: '/explore',
        query: {
          category: item.name,
          time: new Date().getTime()
        }
      })
    },
    // 获取歌单标签列表
    getSheetTags() {
      this.$store.dispatch('getSheetTags')
    },
    // 向上面标签添加一个新标签
    addTag(data) {
      if (this.tags.find(item => item === data)) {
        this.tags = this.tags.filter(item => item.id !== data.id)
      } else {
        this.tags.push(data)
      }
    },
    // 根据 category 获取 标签
    tagCategory(category) {
      return this.$store.state.Explore.sheetTagList.filter(item => item.category === category)
    },
    // 获取对应的播放列表
    getPlayList() {
      const { activeName } = this
      if (activeName === '推荐歌单') {
        setTimeout(() => {
          this.recommendList = this.$store.state.Home.recommendSongList
        }, 500)
      } else if (activeName === '排行榜') {
        this.$store.dispatch('getTopList')
        setTimeout(() => {
          this.list = this.$store.state.Explore.topList
        }, 500)
      } else {
        const data = activeName === '精品歌单' ? '全部' : activeName
        this.$store.dispatch('getBoutiqueSongSheet', data)
        setTimeout(() => {
          this.list = this.$store.state.Explore.boutiqueList
        }, 500)
      }
    }
  },
  mounted() {
    this.getSheetTags()
    this.toggleBtn(this.tags[0])
    this.$store.dispatch('getRecommendSongList')
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  .btn-item {
    background-color: #333;
    border: none;
    font-size: 16px;
    color: #ddd;
    margin-bottom: 20px;

    &:hover {
      background-color: #ddd;
      color: #333;
    }
  }
  .active-item {
    color: #333;
    background-color: #ddd;
  }
}

.sheetTags {
  margin: 20px 0;
  background-color: #333;
  border-radius: 10px;

  .tag-box {
    display: flex;
    padding-left: 20px;
    padding-top: 20px;
    font-size: 20px;

    .tag-title {
      width: 60px;
    }
    .tag-item .tag-name {
      color: #ddd;
      background-color: #333;
      border: none;
      font-size: 16px;
      margin-bottom: 10px;

      &:hover {
        background-color: #ddd;
        color: #333;
      }
    }
  }
}
</style>
