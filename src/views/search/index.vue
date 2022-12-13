<template>
  <div class="container">
    <div class="info-operation">
      <PlayAllDialog :list="searchResultList" style="margin-right:10px;" />
      <el-button type="info" round><i class="el-icon-download" /> 下载全部</el-button>
    </div>
    <el-table :data="searchResultList" style="width: 100%" :header-cell-style="headerCellStyle" row-class-name="rowStyle" cell-class-name="cellStyle" @row-dblclick="dblclickRow">
      <el-table-column type="index"></el-table-column>
      <el-table-column width="60">
        <template slot-scope="{row}">
          <div>
            <svg t="1668524360812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2630" v-if="row.isLove" @click="toggleSongIsLove(row)">
              <path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" p-id="2631" fill="#d81e06"></path>
            </svg>
            <svg t="1668522498470" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504" v-else @click="toggleSongIsLove(row)">
              <path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" p-id="1505" fill="#dbdbdb"></path>
            </svg>
            &nbsp;
            <i class="el-icon-download"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="音乐标题" width="330" class-name="nameStyle">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="300" class-name="singerStyle">
        <template slot-scope="{row}">
          <span v-for="item in row.artists" :key="item.id">{{item.name}} &nbsp;</span>
        </template>
      </el-table-column>
      <el-table-column prop="album.name" label="专辑">
      </el-table-column>
      <el-table-column prop="songTime" label="时间" width="60"></el-table-column>
    </el-table>

  </div>
</template>

<script>
import { search } from '@/api/common'
import dayjs from 'dayjs'
import PlayAllDialog from '@/components/playAllDialog.vue'
export default {
  name: 'search',
  components: {
    PlayAllDialog
  },
  data() {
    return {
      // 请求搜索的数据
      searchResultList: [],
      // 歌单歌曲表格css样式
      headerCellStyle: {
        color: '#999',
        'background-color': '#222',
        border: 'none'
      }
    }
  },
  methods: {
    // 用搜索关键词 获取搜索列表
    async getSearch() {
      const { keyword } = this.$route.query
      const { data } = await search(keyword)
      if (data.code === 200) {
        data.result.songs.forEach(item => {
          item.songTime = dayjs(item.duration).format('mm:ss')
          item.album.picUrl = item.album.artist.img1v1Url
          this.$set(item, 'isLove', false)
        })
        this.searchResultList = data.result.songs
      }
    },
    // 是否喜欢
    toggleSongIsLove(row) {
      row.isLove = !row.isLove
    },
    // 双击歌曲列表的某一行
    dblclickRow(row, column, event) {
      const data = {
        id: row.id,
        name: row.name,
        al: row.album,
        ar: row.artists
      }
      this.$store.commit('GETSONGINFO', data)
      this.$bus.$emit('playSong')
    }
  },
  mounted() {
    this.getSearch()
    this.$bus.$off('searchKey')
    this.$bus.$on('searchKey', () => {
      this.getSearch()
    })
  }
}
</script>

<style lang="less" scoped>
.info-operation {
  display: flex;
}
/deep/.rowStyle {
  background-color: #333;
  color: #999;

  td {
    border: none;
  }
}
/deep/.nameStyle {
  color: #ccc;
}
/deep/.singerStyle {
  font-size: 12px;
}
</style>
