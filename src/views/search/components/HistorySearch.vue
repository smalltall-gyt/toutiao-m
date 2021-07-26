<template>
  <div class="history-search-container">
    <van-cell-group>
      <van-cell title="历史记录" class="history-search">
        <div v-if="deleteIconShow">
          <span class="text" @click="deleteAll" v-if="histories.length > 0">全部删除</span>
          <span class="text" @click="deleteIconShow = false">完成</span>
        </div>
        <template #right-icon>
          <van-icon name="delete-o" v-if="!deleteIconShow" @click="deleteIconShow = true"/>
        </template>
      </van-cell>
      <van-cell :title="item" v-for="(item, index) in histories" :key="index" @click="deleteHistory(index)">
        <template #right-icon>
          <van-icon name="close" v-if="deleteIconShow"/>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    histories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      deleteIconShow: false
    }
  },
  methods: {
    deleteHistory (index) {
      if (this.deleteIconShow) {
        // 删除状态
        this.$emit('deleteHistory', index)
      } else {
        // 搜索
        this.$emit('search', index)
      }
    },
    deleteAll () {
      this.$emit('deleteAll')
    }
  }
}
</script>

<style lang="less" scoped>
  .history-search-container {
    .history-search {
      align-items: center;
      .text {
        margin-right: 5px;
      }
    }
    .van-cell {
      align-items: center;
    }
  }
</style>
