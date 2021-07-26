<template>
  <div class="edit-channel-container">
    <div class="my-channel-container">
      <div class="my-channel-header">
        <h4 class="title">我的频道</h4>
        <van-button round type="default"
          class="edit-btn"
          @click="removeIconShow = true"
          v-if="!removeIconShow"
        >编辑</van-button>
        <van-button round type="default"
          class="edit-btn"
          @click="removeIconShow = false"
          v-else
        >
        完成</van-button>
      </div>
      <ul class="my-channel-wrap">
        <li class="my-channel-item"
          v-for="(item,index) in channels"
          :key="index"
          @click="editMyChannel(index)"
        >
          <div class="content" :class="{active: activeIndex === index}">{{item.name}}</div>
          <i class="icon icon-guanbi" v-show="removeIconShow && index !== 0"></i>
        </li>
      </ul>
    </div>
    <div class="recommend-channel-container">
      <div class="recommend-channel-header">
        <h4 class="title">频道推荐</h4>
      </div>
      <ul class="recommend-channel-wrap">
        <li class="recommend-channel-item"
          v-for="(item,index) in getRecommendChannels"
          :key="index"
          @click="addChannel(item)"
        >
          <div class="content">
            <van-icon name="plus" />
            <span class="text">{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/home'
import { Toast } from 'vant'

export default {
  props: {
    channels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      removeIconShow: false
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    // 获取所有的频道列表
    async getChannels () {
      const res = await getAllChannels()
      this.allChannels = res.data.channels
      console.log(res)
    },
    // 添加频道
    addChannel (channel) {
      this.$emit('addChannel', channel)
    },
    // 编辑我的频道
    editMyChannel (index) {
      if (this.removeIconShow) {
        // 说明是编辑状态
        if (index === 0) {
          Toast('该频道无法删除')
          return
        }
        this.removeChannel(index)
      } else {
        // 跳转频道
        this.changeChannel(index)
      }
    },
    // 删除频道
    removeChannel (index) {
      this.$emit('removeChannel', index)
    },
    // 跳转频道
    changeChannel (index) {
      this.$emit('changeChannel', index)
    }
  },
  computed: {
    // 获取推荐频道
    getRecommendChannels () {
      return this.allChannels.filter((item) => {
        return !this.channels.find((channel) => channel.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .edit-channel-container {
    padding: 55px 10px 0;
    box-sizing: border-box;
    .my-channel-container {
      margin-bottom: 14px;
      .my-channel-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        padding:0 10px;
        box-sizing: border-box;
        .title {
          font-size: 16px;
          font-weight:500;
          color: #333333;
        }
        .edit-btn {
          min-width: 54px;
          height: 24px;
          font-size: 12px;
          color: #f86363;
          border-color: #f86363;
        }
      }
      .my-channel-wrap {
        display: flex;
        flex-wrap: wrap;
        padding-left: 10px;
        box-sizing: border-box;
        .my-channel-item {
          position: relative;
          flex-basis: 25%;
          margin-bottom: 14px;
          padding-right: 10px;
          box-sizing: border-box;
          .content {
            background-color: #f4f5f6;
            text-align: center;
            line-height: 43px;
            font-size: 14px;
            color: #222222;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-radius: 4px;
            &.active {
              color: #f86363;
            }
          }
          .icon-guanbi {
            position: absolute;
            border: 1px solid rgb(129, 129, 129);
            border-radius: 50%;
            color: rgb(129, 129, 129);
            font-size: 10px;
            padding:2px;
            right: 0;
            top: 0;
            box-sizing: border-box;
            transform: translateX(-30%) translateY(-50%);
          }
        }
      }
    }
    .recommend-channel-container {
      padding: 0 10px;
      box-sizing: border-box;
      .title {
        font-size: 16px;
        font-weight:500;
        color: #333333;
      }
      .recommend-channel-header {
        margin-bottom: 25px;
      }
      .recommend-channel-wrap {
        display: flex;
        flex-wrap: wrap;
        .recommend-channel-item {
          flex: 0 0 auto;
          flex-basis: 25%;
          padding-right: 10px;
          margin-bottom: 14px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .content {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f4f5f6;
            line-height: 43px;
            font-size: 14px;
            color: #222222;
            overflow: hidden;
            border-radius: 4px;
            .text {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .van-icon {
      font-size: 12px;
    }
  }
</style>
