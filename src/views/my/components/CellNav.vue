<template>
  <div class="cell-nav-container">
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/user/chat" />
    <van-button
      type="default"
      block
      class="logout-btn"
      v-if="user"
      @click="logout"
      >退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '退出确认',
        message: '确认退出吗?'
      }).then(() => {
      // on confirm
        this.$store.commit('user/setUser', null)
      }).catch(() => {
      // on cancel
      })
    }
  }
}
</script>

<style scoped lang="less">
.cell-nav-container {
  margin-top: 5px;
  .logout-btn {
    margin-top: 5px;
    .van-button__text {
      color: #d86262;
    }
  }
}
</style>
