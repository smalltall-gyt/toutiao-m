<template>
  <div class="home-container">
    <div class="header">
      <button class="search-btn">
        <i class="icon icon-sousuo"></i>
        <span class="text">搜索</span>
      </button>
    </div>
    <van-tabs
      swipeable
      color="#3296fa"
      line-width="15px"
      :border="true"
    >
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <ArticleList :channel="item"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/home'
import ArticleList from './components/ArticleList.vue'

export default {
  components: {
    ArticleList
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.getUserChannels()
  },
  methods: {
    async getUserChannels () {
      const res = await getChannels()
      this.channels = res.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    width: 100%;
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 48px;
      background-color: #3296fa;
      .search-btn {
        display: flex;
        align-items: center;
        width: 227px;
        height: 33px;
        border-radius: 20px;
        background-color: #5babfb;
        justify-content: center;
        &:active {
          background-color: #4d96e0;
        }
        .icon-sousuo {
          color: #fff;
          font-size: 16px;
          vertical-align: middle;
          margin-right: 5px;
        }
        .text {
          color: #fff;
          font-size: 14px;
        }
      }
    }
    /deep/ .van-tab {
      width: 92px;
      padding: 0;
    }
    /deep/ .van-tabs__line {
      bottom: 19px;
    }
    /deep/ .van-tab__text {
      font-size: 14px;
      color: #777;
    }
    /deep/ .van-tab--active .van-tab__text{
      color: #333 ;
      font-size: 15px;
    }
    /deep/ .van-tabs__content {
      position: fixed;
      top: 90px;
      left: 0;
      right: 0;
      bottom: 50px;
      overflow-y: auto;
    }
    /deep/ .van-tabs__content .van-tab__pane {
      width: 100%;
      height: 100%;
    }
    /deep/ .van-tab {
      position: relative;
      z-index: 999;
      border-right: 1px solid rgb(240, 240, 240);
      border-bottom: 1px solid rgb(240, 240, 240);
    }
  }
</style>
