<template>
  <div class="reply-list-container">
    <van-nav-bar
      :title="`${replyInfo.reply_count}条回复`"
      @click-left="onClickLeft"
      class="nav"
    >
      <van-icon name="cross" slot="left" @click="closePop"/>
    </van-nav-bar>
    <div class="reply-content">
      <CommentListItem :comment="replyInfo" :replyBtn="false"/>
      <CommentList :isReply="true" :source="replyInfo.com_id"/>
    </div>
    <div class="footer">
      <van-button
        type="default"
        round
        class="post-reply-btn"
        block
        size="small"
        @click="isPostShow = true"
      >发布回复</van-button>
    </div>
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{height: '20%'}"
    >
      <PostComment
        @success="postCommentSuccess"
        :target="replyInfo.com_id"
        :articleId="$route.params.art_id"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentListItem from './CommentListItem'
import CommentList from './CommentList'
import PostComment from './PostComment'

export default {
  props: {
    replyInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false
    }
  },
  components: {
    CommentListItem,
    CommentList,
    PostComment
  },
  methods: {
    onClickLeft () {},
    closePop () {
      this.$emit('close')
    },
    postCommentSuccess (data) {
      this.$bus.$emit('addComment', data)
      this.isPostShow = false
      this.$emit('changeReplyNum')
    }
  }
}
</script>

<style lang="less" scoped>
  .reply-list-container {
    height: 100vh;
    .nav {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
    }
    .van-icon {
      font-size: 16px;
    }
    .reply-content {
      position: fixed;
      top: 46px;
      left: 0;
      right: 0;
      bottom: 53px;
      background-color: #fff;
      overflow-y: auto;
    }
    .footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 10px 30px;
      box-sizing: border-box;
      border-top: 1px solid #ccc;
      background-color: #fff;
    }
  }
</style>
