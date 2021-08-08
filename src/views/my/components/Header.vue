<template>
  <div class="header-container">
    <template v-if="user">
      <div class="user-info">
        <div class="user-info-left">
          <van-image
            class="avatar"
            width="68"
            height="68"
            round
            fit="cover"
            :src="currentUser.photo"
          />
          <span class="username">{{currentUser.name}}</span>
        </div>
        <van-button type="default" size="mini" round @click="editProfile">编辑资料</van-button>
      </div>
      <van-grid :border="false">
        <van-grid-item text="头条">
          <span slot="icon">{{currentUser.art_count}}</span>
        </van-grid-item>
        <van-grid-item text="关注">
          <span slot="icon">{{currentUser.follow_count}}</span>
        </van-grid-item>
        <van-grid-item text="粉丝">
          <span slot="icon">{{currentUser.fans_count}}</span>
        </van-grid-item>
        <van-grid-item text="获赞">
          <span slot="icon">{{Math.abs(currentUser.like_count)}}</span>
        </van-grid-item>
      </van-grid>
    </template>
    <template v-else>
      <van-grid :column-num="1" class="unlogin-wrapper" :border="false">
        <van-grid-item text="登录 / 注册">
          <img slot="icon" src="../assets/头像.png" alt="" class="to-login-img" @click="toLogin">
        </van-grid-item>
      </van-grid>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  computed: {
    ...mapState('user', ['user'])
  },
  data () {
    return {
      currentUser: {}
    }
  },
  created () {
    // 获取当前用户信息
    if (this.user) {
      this.handleGetCurrentUser()
    }
  },
  methods: {
    toLogin () {
      console.log(1)
      this.$router.push({
        name: 'login',
        query: {
          redirect: '/my'
        }
      })
    },
    async handleGetCurrentUser () {
      const res = await getCurrentUser()
      this.currentUser = res.data
    },
    // 编辑资料
    editProfile () {
      this.$router.push('/user/profile')
    }
  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  background-image: url('../assets/logo.png');
  background-repeat: no-repeat;
  background-size: cover;
  .user-info {
    width: 100%;
    height: 115px;
    display: flex;
    padding: 35px 16px 0;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    .user-info-left {
      display: flex;
      align-items: center;
      .username {
        margin-left: 12px;
        color: #fff;
        font-size: 15px;
      }
      .avatar {
        border: 1px solid #fff;
        box-sizing: border-box;
      }
    }
    /deep/ .van-button {
      font-size: 10px;
      padding: 0 5px;
      color: #666666;
    }
  }
  /deep/ .van-grid-item__content {
    background-color: transparent;
    color: #fff;
  }
  /deep/ .van-grid-item__text {
    color: #fff;
  }
  .to-login-img {
    width: 68px;
    height: 68px;
  }
  .unlogin-wrapper {
    padding-top: 54px;
    padding-bottom: 32px;
    /deep/ .van-grid-item__text {
      font-size: 14px;
    }
  }
}
</style>
