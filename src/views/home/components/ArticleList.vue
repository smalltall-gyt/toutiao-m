<template>
  <div class="article-list-container">
    <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
    success-text="更新成功"
    success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem v-for="(item,index) in list" :key="index" :article="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/home'
import { Toast } from 'vant'
import ArticleItem from '@/components/ArticleItem.vue'

export default {
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pre_timestamp: null
    }
  },
  methods: {
    // 上拉加载更多
    async onLoad () {
      await this.getCurrentArticles()
      this.loading = false
    },
    // 下拉刷新
    async onRefresh () {
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      const data = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        withtop: 1
      })
      this.list.unshift(...data.data.results)
      this.loading = false
      this.refreshing = false
      Toast(`更新了${data.data.results.length}条数据`)
    },
    // 获取数据
    async getCurrentArticles () {
      if (!this.pre_timestamp) {
        const nowDate = Date.now()
        this.pre_timestamp = nowDate
      }
      const data = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.pre_timestamp,
        withtop: 1
      })
      this.list.push(...data.data.results)
      if (data.data.results.length < 10) {
        this.finished = true
      } else {
        this.pre_timestamp = data.data.pre_timestamp
      }
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .article-list-container {
    width: 100%;
    height: 100%;
  }
</style>
