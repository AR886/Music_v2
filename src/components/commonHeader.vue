<template>
  <div class="container">
    <!-- 左侧 返回前进 -->
    <div class="left">
      <el-button icon="el-icon-arrow-left" size="mini" round @click="backOrForward(-1)"></el-button>
      <el-button icon="el-icon-arrow-right" size="mini" round @click="backOrForward(1)"></el-button>
    </div>
    <!-- 中间 跳转 -->
    <div class="center">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#222" text-color="#fff" :default-active="$route.path" active-text-color="#ffd04b" router>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/explore">发现</el-menu-item>
        <el-menu-item index="/musicStore">音乐库</el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧 搜索 用户头像 -->
    <div class="right">
      <el-popover placement="bottom" width="400" trigger="focus" :visible-arrow="false" popper-class="searchListBox">
        <!-- 搜索历史 -->
        <div class="searchHistory">
          <div>搜索历史 <i class="el-icon-delete" style="margin-left:10px;"></i></div>
          <div class="searchTags">
            <el-tag closable size="small" type="info" class="searchTag" v-for="item in searchHistoryList" :key="item.id">{{item}}</el-tag>
          </div>
        </div>
        <div class="searchList">
          <div class="listTitle">热搜榜</div>
          <ul class="list">
            <li class="list-item" v-for="(item,index) in searchHotDetail" :key="index" @click="hotSearch(item)">
              <div class="wordOrScore">
                <span class="word">{{item.searchWord}}</span> <span class="score">{{item.score}}</span>
              </div>
              <div class="content">{{item.content}}</div>
            </li>
          </ul>
        </div>
        <!-- 搜索框 -->
        <el-input placeholder="搜索" prefix-icon="el-icon-search" class="right_search" v-model="searchKey" slot="reference" @keyup.enter.native="searchSong" ref="search" />
      </el-popover>
      <!-- 头像 -->
      <div class="userInfo">
        <el-dropdown trigger="click">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <el-dropdown-menu slot="dropdown" class="user_dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>登录</el-dropdown-item>
            <el-dropdown-item>GitHub 仓库</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { searchHotDetail } from '@/api/common'
export default {
  name: 'commonHeader',
  data() {
    return {
      // 搜索关键词
      searchKey: '',
      // 热搜列表
      searchHotDetail: [],
      // 搜索历史标签列表
      searchHistoryList: []
    }
  },
  methods: {
    // 控制页面前进 / 后退
    backOrForward(n) {
      this.$router.go(n)
    },
    // 获取热搜列表（详细）
    async getSearchHotDetail() {
      const { data } = await searchHotDetail()
      try {
        if (data.code === 200) {
          this.searchHotDetail = data.data
        }
      } catch (error) {
        this.$message(error)
      }
    },
    // 添加搜索标签
    addHistoryTag() {
      const { searchHistoryList, searchKey } = this
      if (!searchHistoryList.every(item => item !== searchKey)) {
        this.searchHistoryList = searchHistoryList.filter(item => item !== searchKey)
      }
      this.searchHistoryList.unshift(searchKey)
    },
    // 搜索
    searchSong() {
      if (this.searchKey) {
        this.addHistoryTag()
        this.$refs.search.blur()
        this.$router.push({
          path: 'search',
          query: {
            keyword: this.searchKey.trim(),
            time: new Date().getTime()
          }
        })
        this.$bus.$emit('searchKey')
      }
    },
    hotSearch(data) {
      this.searchKey = data.searchWord
      this.searchSong()
      this.$refs.search.blur()
    }
  },
  mounted() {
    this.getSearchHotDetail()
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 左侧
  .left {
    button {
      background-color: #333;
      border: none;
    }
    button:hover {
      border: 1px solid #666;
    }
  }
  // 中间
  .center {
    .el-menu-demo {
      border: none;
      .el-menu-item {
        font-size: 18px;
      }
    }
  }

  // 右侧
  .right {
    display: flex;
    align-items: center;
    // 搜索框
    .right_search {
      margin-right: 15px;
      border-radius: 20px;
      overflow: hidden;

      /deep/.el-input__inner {
        background-color: #333;
        border: 1px solid #333;
        color: aliceblue;
      }
    }

    // 用户信息 和下拉菜单
    .userInfo {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
.user_dropdown {
  background-color: #333;
  border: 1px solid #333;

  .el-dropdown-menu__item {
    color: #fff;
  }
  .el-dropdown-menu__item:hover {
    color: #333;
  }
}
</style>

<style lang="less">
// 搜索盒子
.searchListBox {
  background-color: #333;
  height: 500px;
  border: none;
  color: #ccc;

  // 搜索历史
  .searchHistory {
    height: 100px;

    // 搜素标签盒子
    .searchTags {
      width: 100%;
      height: 80px;
      margin-top: 10px;

      .searchTag {
        margin-right: 10px;
        border: 1px solid #aaa;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        background-color: #333;
        color: #999;
        &:hover {
          color: #ccc;
        }
      }
    }
  }

  // 热搜榜
  .searchList {
    width: 100%;
    height: 400px;

    .listTitle {
      font-size: 18px;
    }

    .list {
      margin: 10px 0 0 10px;
      height: 360px;
      overflow: auto;

      // 修改滚动条样式
      &::-webkit-scrollbar {
        width: 3px;
        height: 1px;
      }

      .list-item {
        margin-left: 8px;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        &:hover {
          cursor: pointer;
          background-color: #222223;
        }

        .word {
          font-size: 16px;
          font-weight: bold;
          color: #ddd;
        }
        .score {
          color: #777;
          margin-left: 20px;
        }
        .content {
          color: #aaa;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
