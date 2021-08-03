<template>
  <div class="edit-name-container">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      rows="3"
      type="textarea"
      maxlength="8"
      placeholder="请输入昵称"
      show-word-limit
      v-model="message"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import { Toast } from 'vant'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  methods: {
    // 点击取消
    onClickLeft () {
      // 关闭弹出层
      this.$emit('closeEditNamePopup')
    },
    async onClickRight () {
      if (!this.message) {
        console.log(1)
        Toast('昵称不能为空')
        return
      }
      Toast.loading({
        message: '保存中...',
        forbidClick: true
      })
      try {
        await updateUserProfile({
          name: this.message
        })
        this.$emit('closeEditNamePopup')
        this.$emit('input', this.message)
        Toast.success('保存成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          Toast('昵称已存在')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .edit-name-container {
    .van-cell {
      background-color: unset;
      /deep/ .van-cell__value {
        background-color: #fff;
        padding: 10px;
      }
    }
  }
</style>
