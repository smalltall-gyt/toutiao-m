<template>
  <div class="search-result-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in searchResultsList" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { searchResults } from '@/api/search'

export default {
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 搜索结果的页数
      per_page: 15, // 每页的数量
      searchResultsList: [], // 存储搜索结果的列表
      totalCount: 0 // 总的数据量
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const res = await searchResults({
        page: this.page,
        per_page: this.per_page,
        q: this.searchValue
      })
      // 加载状态结束
      this.loading = false
      this.page++
      this.totalCount = res.data.total_count
      console.log(res)
      this.searchResultsList.push(...res.data.results)
      if (this.searchResultsList.length >= this.totalCount) {
        // 数据全部加载完成
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  position: fixed;
  top: 54px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
