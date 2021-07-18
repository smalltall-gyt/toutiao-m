<template>
  <div class="login-container">
    <NavBar>
      <template #left>
        <i class="icon icon-guanbi"></i>
      </template>
      <template #center>
        <h2 class="login-text">注册 / 登录</h2>
      </template>
    </NavBar>
    <van-form
      validate-first
      @failed="onFailed"
      @submit="handleLogin"
      :show-error-message='false'
      :show-error='false'
      ref="loginForm"
    >
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          icon-prefix="icon"
          left-icon="shouji"
          placeholder="手机号"
          :rules="phoneRules"
          name="phone"
        />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="icon"
          left-icon="yanzhengma"
          placeholder="验证码"
          :rules="codeRules"
          name="code"
        >
          <template #button>
            <van-count-down :time="60000" v-if="isShow" @finish="handleFinish">
              <template #default="timeData">
                <div class="count-down">{{timeData.seconds}}S</div>
              </template>
            </van-count-down>
            <van-button size="small"
              type="primary"
              color="#ededed"
              round
              class="code-btn"
              @click.prevent="getCode"
              v-else
              :disabled='btnDisabled'
            >
            发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button type="primary"
        block
        color="#6db4fb"
        class="login-btn">
        登录</van-button>
      </div>
    </van-form>
    <div class="tip">
      <p>登录账户请使用: 17090086870</p>
      <p>密码请使用: 246810</p>
    </div>
    <div class="login-footer">
      <span>隐私条款</span>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { login, getCode } from '@/api/login'
import { Toast } from 'vant'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      phoneRules: [
        { required: true, message: '请输入手机号' },
        { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' }
      ],
      codeRules: [
        { required: true, message: '请输入验证码' },
        { pattern: /^\d{6}$/, message: '验证码格式错误' }
      ],
      timeData: {
        seconds: 60
      },
      isShow: false,
      btnDisabled: false
    }
  },
  methods: {
    async handleLogin () {
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.user)
        console.log(res)
        if (res.message === 'OK') {
          Toast.clear(true)
          this.$router.push('/')
          this.$store.commit('user/setUser', res.data)
          Toast.success('登录成功')
        }
      } catch (error) {
        Toast.clear(true)
        Toast.fail('登录失败，手机号或者验证码错误，请重新输入')
      }
    },
    onFailed (errorInfo) {
      Toast({
        position: 'top',
        message: errorInfo.errors[0].message
      })
    },
    getCode () {
      const { loginForm } = this.$refs
      loginForm.validate('phone').then(async res => {
        this.btnDisabled = true
        // 发送请求 进入倒计时
        try {
          await getCode(this.user.mobile)
          this.isShow = true
        } catch (err) {
          Toast({
            position: 'top',
            message: '发送太频繁了，请稍后重试'
          })
          this.btnDisabled = false
        }
      }).catch(err => {
        Toast({
          position: 'top',
          message: err.message
        })
      })
      this.btnDisabled = false
    },
    handleFinish () {
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  width: 375px;
  height: 100vh;
  .login-text {
    font-size: 16px;
    color: #fff;
    font-weight: 300;
  }
  .icon-guanbi {
    font-size: 12px;
    color: #fff;
  }
  .van-cell {
    align-items: center;
  }
  .code-btn {
    color: #666 !important;
  }
  .login-btn-wrap {
    padding: 25px 14px;
    box-sizing: border-box;
    .login-btn {
      border-radius: 8px;
    }
    .van-button__text {
      font-size: 15px;
    }
  }
  .login-footer {
    position: absolute;
    bottom: 26px;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: 13px;
    color: #666666;
  }
  .count-down {
    text-align: center;
    background-color: rgb(237, 237, 237);
    border-radius: 30px;
    width: 78px;
    height: 32px;
    line-height: 32px;
    color: rgb(161, 161, 161);
  }
  .tip {
    p {
      font-size: 12px;
      color: rgb(146, 146, 146);
      text-align: center;
    }
  }
}
</style>
