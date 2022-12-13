<template>
  <div class="container">
    <div class="song-item" v-for="item in list" :key="item.id" @click="toPlayList(item)">
      <div class="song-img">
        <img :src="item.coverImgUrl">
      </div>
      <span class="song-name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'exploreSongSheet',
  props: {
    list: {
      type: Array
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
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #333;
  border-radius: 20px;
  margin-top: 20px;
}
.song-item {
  width: 200px;
  height: 240px;
  cursor: pointer;
  padding: 10px;

  .song-img {
    width: 100%;
    height: 200px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 3px #ccc;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .song-name {
    color: #ccc;
    font-size: 14px;
    overflow: hidden;

    &:hover {
      color: #fff;
    }
  }
}
</style>
