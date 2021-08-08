<template>
  <div class="comment-list-container">
    <h2 class="all-comments-title">全部{{isReply ? '回复' : '评论'}}</h2>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Comment-list-item
        v-for="(item, index) in comments"
        :key="index"
        :comment="item"
        @changeCommentLiking="changeCommentLiking"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentListItem from './CommentListItem'

export default {
  components: {
    CommentListItem
  },
  mounted () {
    this.$bus.$on('addComment', (data) => {
      this.comments.unshift(data)
    })
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      comments: [],
      total: 0
    }
  },
  props: {
    // 文章id 或者 评论id
    source: {
      type: [Number, Object, String],
      required: true
    },
    isReply: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 134496
    onLoad () {
      this.loadComments()
    },
    async loadComments () {
      const res = await getComments({
        type: this.isReply ? 'c' : 'a',
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })
      this.comments.push(...res.data.results)
      this.loading = false
      this.total = res.data.total_count
      this.$emit('changeCount', this.total)
      if (res.data.results.length) {
        this.offset = res.data.last_id
      }
      if (this.comments.length >= this.total) {
        this.finished = true
      }
    },
    changeCommentLiking (bool, commentId) {
      if (bool) {
        const comment = this.comments.find(item => item.com_id === commentId)
        comment.is_liking = bool
        comment.like_count += 1
      } else {
        const comment = this.comments.find(item => item.com_id === commentId)
        comment.is_liking = bool
        comment.like_count -= 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-list-container {
    .all-comments-title {
      padding: 28px 17px;
      font-size: 16px;
      border-top: 1px solid rgb(226, 226, 226);
    }
  }
</style>
