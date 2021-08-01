<template>
  <div class="article-container">
    <div class="header">
      <div class="left-icon" @click="$router.back()">
        <i class="icon icon-youjiantou"></i>
      </div>
      <div class="title" v-if="titleIsShow">
        <div class="left">
          <van-image
            class="avatar"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
          />
          <span class="author">有点凉</span>
        </div>
        <div class="right">
          <van-button
            round
            type="info"
            icon="plus"
            class="unfollow-btn"
            v-if="article.is_followed"
            @click="followAuthor"
          >关注</van-button>
          <van-button
            round
            class="follow-btn"
            v-else
          >已关注</van-button>
        </div>
      </div>
      <div class="right-icon">
        <van-icon name="ellipsis" />
      </div>
    </div>
    <div class="article-content">
      <h1 class="article-title">{{article.title}}</h1>
      <div class="author-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            :src="article.aut_photo"
            fit="cover"
          />
          <div class="author-text">
            <div class="author">{{article.aut_name}}</div>
            <div class="time">{{article.pubdate | formatRelativeTime}}</div>
          </div>
        </div>
        <div class="right">
          <van-button
            round
            type="info"
            icon="plus"
            class="unfollow-btn"
            v-if="!article.is_followed"
            @click="followAuthor"
            :disabled="isFollowLoading"
          >关注</van-button>
          <van-button
            round
            class="follow-btn"
            v-else
            @click="followAuthor"
            :disabled="isFollowLoading"
          >已关注</van-button>
        </div>
      </div>
      <div ref="articleMain"
        class="article-main markdown-body"
        v-html="article.content">
      </div>
      <CommentList :source="$route.params.art_id" @changeCount="commentsCount = $event"/>
    </div>
    <div class="footer">
      <van-button round type="default" class="write-comment-btn" @click="isPostShow=true">写评论</van-button>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? 'orange' : ''"
        class="icons"
        @click="onLike"
      />
      <van-icon name="comment-o" class="icons" :badge="commentsCount" />
      <van-icon
        :color="article.is_collected ? 'orange' : ''"
        :name="article.is_collected ? 'star' : 'star-o'"
        class="icons"
        @click="onCollect"
      />
      <van-icon name="share-o" class="icons" />
    </div>
    <!-- 发布评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{height: '20%'}"
    >
      <PostComment @success="postCommentSuccess" :target="$route.params.art_id"/>
    </van-popup>
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
    >
      <ReplyList
        v-if="isReplyShow"
        :replyInfo="replyInfo"
        @close="isReplyShow=false"
        @changeReplyNum="changeReplyNum"
      />
    </van-popup>
  </div>
</template>

<script>
import '@/styles/github-markdown.css'
import { getArticleDetail } from '@/api/home'
import {
  follow,
  unfollow,
  collectArticle,
  deleteCollectArticle,
  onLikeArticle,
  deleteLikeArticle
} from '@/api/article'
import { ImagePreview, Toast } from 'vant'
import CommentList from './components/CommentList'
import PostComment from './components/PostComment'
import ReplyList from './components/ReplyList'

export default {
  components: {
    CommentList,
    PostComment,
    ReplyList
  },
  data () {
    return {
      titleIsShow: false,
      article: {},
      imgsArr: [], // 存储文章图片
      isFollowLoading: false,
      isCollectLoading: false,
      isLikeLoading: false,
      isPostShow: false, // 发布评论的弹出框是否显示
      commentsCount: 0, // 评论数量
      isReplyShow: false,
      replyInfo: null
    }
  },
  created () {
    this.loadArtile()
  },
  mounted () {
    this.$bus.$on('replyClick', (data) => {
      this.isReplyShow = true
      this.replyInfo = data
    })
  },
  methods: {
    async loadArtile () {
      const res = await getArticleDetail(this.$route.params.art_id)
      this.article = res.data
      this.$nextTick(() => {
        const { articleMain } = this.$refs
        const imgs = articleMain.getElementsByTagName('img')
        for (let i = 0; i < imgs.length; i++) {
          this.imgsArr.push(imgs[i].src)
          imgs[i].addEventListener('click', () => {
            ImagePreview({
              images: this.imgsArr,
              startPosition: i
            })
          }, false)
        }
      })
    },
    // 点击关注按钮
    async followAuthor () {
      this.isFollowLoading = true
      this.article.is_followed = !this.article.is_followed
      if (this.article.is_followed) {
        await follow(this.article.aut_id)
      } else {
        await unfollow(this.article.aut_id)
      }
      this.isFollowLoading = false
    },
    // 点击收藏
    async onCollect () {
      if (this.isCollectLoading) {
        return
      }
      this.isCollectLoading = true
      this.article.is_collected = !this.article.is_collected
      if (this.article.is_collected) {
        // 收藏
        await collectArticle(this.article.art_id)
        Toast.success('收藏成功')
      } else {
        // 取消收藏
        await deleteCollectArticle(this.article.art_id)
      }
      this.isCollectLoading = false
    },
    // 点击点赞
    async onLike () {
      if (this.isLikeLoading) {
        return
      }
      this.isLikeLoading = true
      if (this.article.attitude === -1) {
        await onLikeArticle(this.article.art_id)
        Toast.success('点赞成功')
        // 喜欢
        this.article.attitude = 1
      } else if (this.article.attitude === 1) {
        // 不喜欢
        await deleteLikeArticle(this.article.art_id)
        this.article.attitude = -1
      }
      this.isLikeLoading = false
    },
    // 发布评论成功
    postCommentSuccess (data) {
      this.$bus.$emit('addComment', data)
      this.isPostShow = false
      this.commentsCount += 1
    },
    changeReplyNum () {
      this.replyInfo.reply_count += 1
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  background-color: #fff;
  .header {
    position: relative;
    display: flex;
    height: 48px;
    width: 100%;
    background-color: #f5f5f5;
    align-items: center;
    .left-icon {
      position: absolute;
      left: 10px;
      .icon {
        color: #333333;
      }
    }
    .title {
      height: 100%;
      width: 280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        .avatar {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
        .author {
          font-size: 14px;
          color: #3a3a3a;
          margin-left: 8px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .unfollow-btn
        .follow-btn {
          height: 25px;
          font-size: 12px;
        }
        .follow-btn {
          min-width: 74px;
        }
      }
    }
    .right-icon {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
    }
  }
  .article-content {
    position: fixed;
    top: 48px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    .article-title {
      padding: 24px 15px;
      font-size: 20px;
      color: #3a3a3a;
      box-sizing: border-box;
    }
    .author-info {
      display: flex;
      padding: 0 15px;
      box-sizing: border-box;
      justify-content: space-between;
      margin-bottom: 27px;
      .left {
        display: flex;
        .avatar {
          width: 35px;
          height: 35px;
        }
        .author-text {
          margin-left: 8px;
          .author {
            font-size: 14px;
            color: #333333;
          }
          .time {
            font-size: 14px;
            color: #d1d1d1;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .unfollow-btn,
        .follow-btn {
          height: 25px;
          font-size: 12px;
        }
        .follow-btn {
          min-width: 74px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    height: 44px;
    left: 0;
    right: 0;
    border-top: 1px solid #d8d8d8;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 19px;
    .write-comment-btn {
      width: 142px;
      height: 21px;
      margin-right: 33px;
    }
    .icons:not(:last-of-type) {
      margin-right: 24px;
    }
  }
}
.markdown-body {
  padding: 14px;
}
ul {
  list-style: unset;
}
</style>
