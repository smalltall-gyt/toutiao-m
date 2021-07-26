<template>
  <div class="home-container">
    <div class="header">
      <button class="search-btn" @click="toSearch">
        <i class="icon icon-sousuo"></i>
        <span class="text">搜索</span>
      </button>
    </div>
    <van-tabs
      swipeable
      color="#3296fa"
      line-width="15px"
      :border="true"
      v-model="activeChannel"
    >
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <ArticleList :channel="item"/>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <i slot="nav-right" class="icon icon-gengduo" @click="channelEditShow = true"></i>
    </van-tabs>
    <van-popup
      v-model="channelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      round
      :style="{ height: '100%' }"
      get-container="body"
    >
      <EditChannel :channels="channels"
        :activeIndex="activeChannel"
        @addChannel="addChannel"
        @removeChannel="removeChannel"
        @changeChannel="changeChannel"
      />
    </van-popup>
  </div>
</template>

<script>
import { getChannels, addChannel, deleteChannel } from '@/api/home'
import ArticleList from './components/ArticleList.vue'
import EditChannel from './components/EditChannel.vue'
import { mapState } from 'vuex'
import { set, get } from '@/utils/localStorage'

export default {
  components: {
    ArticleList,
    EditChannel
  },
  data () {
    return {
      channels: [],
      channelEditShow: false,
      activeChannel: 0
    }
  },
  created () {
    if (this.user) {
      this.getUserChannels()
    } else {
      const localChannels = get('user-channels')
      if (localChannels) {
        this.channels = localChannels
      } else {
        // 获取推荐的频道
        this.getUserChannels()
      }
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    async getUserChannels () {
      const res = await getChannels()
      this.channels = res.data.channels
    },
    async addChannel (channel) {
      this.channels.push(channel)
      // 持久化操作
      if (this.user) {
        await addChannel({
          channels: [{
            id: channel.id,
            seq: this.channels.length
          }]
        })
      } else {
        set('user-channels', this.channels)
      }
    },
    async removeChannel (index) {
      if (index < this.activeChannel) {
        this.activeChannel -= 1
      }
      const delArr = this.channels.splice(index, 1)
      if (this.user) {
        await deleteChannel(delArr[0].id)
      } else {
        set('user-channels', this.channels)
      }
    },
    changeChannel (index) {
      this.channelEditShow = false
      this.activeChannel = index
    },
    // 跳转到搜索页面
    toSearch () {
      this.$router.push('/search')
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
    /deep/ .van-tab {
      position: relative;
      z-index: 999;
      border-right: 1px solid rgb(240, 240, 240);
      border-bottom: 1px solid rgb(240, 240, 240);
    }
    /deep/ .van-tabs__nav--complete {
      padding-left: unset;
      padding-right: unset;
    }
    .icon-gengduo {
      font-size: 18px;
      position: fixed;
      right: 2px;
      height: 43px;
      line-height: 43px;
      z-index: 1000;
      padding: 0 5px;
      background-color: rgba(255, 255, 255, .9);
      border-left: 1px solid #f0f0f0;
    }
    .placeholder {
      width: 30px;
      height: 43px;
      flex-shrink: 0;
    }
  }
</style>
