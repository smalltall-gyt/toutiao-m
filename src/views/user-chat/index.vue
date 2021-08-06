<template>
  <div class="user-chat-container">
    <NavBar>
      <template #left>
        <van-icon
          name="arrow-left"
          class="left-icon"
          @click="onClickLeft"/>
      </template>
      <template #center>
        <div class="title">小智同学</div>
      </template>
    </NavBar>
    <!-- 消息区 -->
    <van-cell-group class="message-wrapper" ref="messageWrapper">
      <van-cell
        v-for="(item, index) in messages"
        :key="index"
        :value="item.msg"
      />
    </van-cell-group>
    <!-- 发送信息 -->
    <div class="send-message">
      <van-field v-model="message" placeholder="请输入消息" class="inp"/>
      <van-button type="primary" class="send-btn" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
// import io from 'socket.io-client'

export default {
  components: {
    NavBar
  },
  created () {
    // const socket = io('http://ttapi.research.itcast.cn/app/socket.io/')
    // this.socket = socket
    // socket.on('connect', () => {
    //   console.log('连接成功')
    // })
    // socket.on('disconnect', () => {
    //   console.log('断开连接')
    // })
    // // 监听服务器返回的数据
    // socket.on('message', (data) => {
    //   console.log(data)
    // })
  },
  data () {
    return {
      message: '',
      socket: null, // 通信对象
      messages: [], // 存储聊天记录
      returnMsg: ['你好', '你说得对', '都可以', '好的', '哈哈哈哈哈', '今天天气不错']
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 发送信息
    sendMessage () {
      // 模拟聊天
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.messages.push(data)
      this.$nextTick(() => {
        const { messageWrapper } = this.$refs
        messageWrapper.querySelector('.van-cell:last-of-type').scrollIntoView()
      })
      this.message = ''
      this.returnMessage()
      // this.socket.emit('message', {
      //   msg: this.message,
      //   timestamp: Date.now()
      // })
    },
    returnMessage () {
      const random = Math.round(Math.random() * 5)
      setTimeout(() => {
        this.messages.push({
          msg: this.returnMsg[random],
          timestamp: Date.now()
        })
        this.$nextTick(() => {
          const { messageWrapper } = this.$refs
          messageWrapper.querySelector('.van-cell:last-of-type').scrollIntoView()
        })
      }, Math.floor(Math.random() * (5000 - 1000) + 1000))
    }
  }
}
</script>

<style lang="less" scoped>
  .user-chat-container {
    .left-icon {
      font-size: 16px;
      vertical-align: middle;
      color: #fff;
    }
    .title {
      font-size: 16px;
      color: #fff;
    }
    .message-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 44px;
      top: 45px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      background-color: #fff;
      .inp {
        flex-basis: 287px;
      }
      .send-btn {
        flex-basis: 60px;
      }
    }
    .van-cell::after{
      border-bottom: none;
    }
  }
</style>
