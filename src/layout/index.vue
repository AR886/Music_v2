<template>
  <div class="container">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main class="main">
        <router-view></router-view>

      </el-main>
      <!-- 回到顶部 -->
      <el-backtop :bottom="100">
        <div class="backTop">
          UP
        </div>
      </el-backtop>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/commonHeader'
import Footer from '@/components/commonFooter'
export default {
  name: 'layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 80%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

// 回到顶部
.backTop {
  height: 100%;
  width: 100%;
  background-color: #333;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #ccc;
  border-radius: 50%;
}
</style>
