<template>
  <div class="container">
    <el-button type="danger" @click="dialogVisible=true" round><i class="el-icon-caret-right" /> 播放全部</el-button>
    <el-dialog title="替换播放列表" :visible.sync="dialogVisible" width="30%" :append-to-body="true" :center="true" custom-class="palyAllDialog">
      <p style="color:#333;text-align:center;">播放全部 会替代掉当前播放列表是否继续</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="playSongAll">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'playAllDialog',
  data() {
    return {
      dialogVisible: false
    }
  },
  props: ['list'],
  methods: {
    // 播放全部
    playSongAll() {
      const arr = []
      this.list.forEach(item => {
        const obj = {
          id: item.id,
          name: item.name,
          al: item.al || item.album,
          ar: item.ar || item.artists
        }
        arr.push(obj)
      })
      this.$store.commit('AllPLAYLISTINFO', arr)
      this.dialogVisible = false
      this.$bus.$emit('playSong')
    }
  }
}
</script>

<style lang="less" scoped>
// 全部播放列表遮罩层
/deep/.palyAllDialog {
  background-color: #aaa;
  border-radius: 10px;
}
</style>
