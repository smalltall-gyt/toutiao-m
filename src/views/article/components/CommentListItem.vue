<template>
  <van-cell class="comment-list-item">
    <template #icon>
      <van-image
        round
        class="avatar"
        :src="comment.aut_photo"
        fit="cover"
      />
    </template>
    <template>
      <div class="aut-name">{{comment.aut_name}}</div>
      <div class="content">{{comment.content}}</div>
    </template>
    <template slots='label'>
      <div class="wrap">
        <span class="time">{{comment.pubdate | formateDateTime('MM-DD HH:mm')}}</span>
        <van-button
          round
          type="default"
          class="replay-btn"
          @click="replyClick"
          v-if="replyBtn">
          {{comment.reply_count}} 回复
        </van-button>
      </div>
    </template>
    <template #right-icon>
      <div class="good-info">
        <van-icon
          :color="comment.is_liking ? 'orange' : ''"
          :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          class="good-icon"
          @click="handleCommentLiking"
        />
        <span>{{comment.like_count}}</span>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { commentLiking, deleteCommentLiking } from '@/api/comment'

export default {
  props: {
    comment: {
      type: Object,
      required: true
    },
    replyBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async handleCommentLiking () {
      if (this.comment.is_liking) {
        await deleteCommentLiking(this.comment.com_id)
        this.$emit('changeCommentLiking', false, this.comment.com_id)
      } else {
        await commentLiking(this.comment.com_id)
        this.$emit('changeCommentLiking', true, this.comment.com_id)
      }
    },
    // 点击回复
    replyClick () {
      this.$bus.$emit('replyClick', this.comment)
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-list-item {
    .avatar {
      width: 37px;
      height: 37px;
      margin-right: 12px;
    }
    .aut-name {
      font-size: 14px;
      color: #406599;
      margin-bottom: 17px;
    }
    .content {
      font-size: 16px;
      margin-bottom: 18px;
    }
    .time {
      font-size: 12px;
      margin-right: 22px;
    }
    .replay-btn {
      height: 24px;
      background-color: #f4f5f6;
    }
    .van-button__text {
      font-size: 10px;
    }
    .good-icon {
      position: relative;
      top: 1px;
      font-size: 14px;
    }
    .wrap {
      display: flex;
      align-items: center;
    }
  }
</style>
