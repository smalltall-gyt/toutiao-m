<template>
  <div class="post-comment-container">
    <van-field
      v-model.trim="message"
      rows="4"
      type="textarea"
      maxlength="50"
      placeholder="请输入发布的内容"
      show-word-limit
      class="inp"
    />
    <van-button
      class="post-btn"
      :class="{'can-post': message !== ''}"
      @click="handlePostComment"
      :disabled="message === ''"
    >发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
import { Toast } from 'vant'

export default {
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async handlePostComment () {
      Toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      const res = await postComment({
        target: this.target,
        content: this.message,
        art_id: this.articleId
      })
      this.$emit('success', res.data.new_obj)
      this.message = ''
      Toast.success('发布成功')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
  .post-comment-container {
    display: flex;
    align-items: center;
    height: 100%;
    overflow-y: hidden;
    .inp {
      height: 100%;
      /deep/ .van-cell__value {
        height: 100%;
      }
    }
    .post-btn {
      border: none;
      width: 65px;
      &.can-post {
        color: turquoise;
      }
    }
  }
</style>
