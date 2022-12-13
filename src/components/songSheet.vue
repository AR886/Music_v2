<template>
  <div class="container">
    <el-card shadow="always" class="songSheet">
      <div slot="header" class="songSheet-title">
        <span @click="toRecommendSongs">
          {{title}}
        </span>
      </div>
      <div class="songSheet-list">
        <div class="songSheet-item" v-for="item in list" :key='item.id' @click="toPlayList(item)">
          <!-- 图片 -->
          <div class="songSheet-item-img">
            <img :src="item.picUrl">
          </div>
          <!-- 名称 -->
          <span class="songSheet-item-name">{{item.name}}</span>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'songSheet',
  props: {
    list: {
      type: Array,
      require: true
    },
    title: {
      type: String
    }
  },
  methods: {
    toPlayList(data) {
      this.$router.push({
        path: 'playList',
        name: 'playList',
        query: {
          id: data.id
        }
      })
    },
    toRecommendSongs() {
      this.$router.push({
        path: 'explore',
        name: 'explore'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.songSheet {
  margin: 20px 0;
  background-color: #333;
  border: none;
  /deep/.el-card__header {
    border: none;
  }
  .songSheet-title {
    font-size: 20px;
    color: #ccc;
    margin-bottom: -30px;

    span {
      cursor: pointer;
    }
  }
  .songSheet-title:hover {
    color: #ddd;
  }
  .songSheet-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .songSheet-item {
      width: 200px;
      height: 240px;
      cursor: pointer;
      margin-bottom: 20px;

      .songSheet-item-img {
        width: 100%;
        height: 200px;
        box-shadow: 0px 0px 5px #aaa;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 10px;
        img {
          width: 100%;
        }
      }
      .songSheet-item-name {
        color: #aaa;
        font-size: 14px;
      }
      .songSheet-item-name:hover {
        color: #ccc;
      }
    }
  }
}
</style>
