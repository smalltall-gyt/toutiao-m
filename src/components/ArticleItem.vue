<template>
  <div class="article-item-container">
    <template v-if="article.cover.type === 0">
      <h3 class="article-title">{{ article.title }}</h3>
      <div class="article-info">
        <span class="article-aut">{{ article.aut_name }}</span>
        <span class="article-comment">{{ article.comm_count }}评论</span>
        <span class="article-date">{{ article.pubdate | formatRelativeTime }}</span>
      </div>
    </template>
    <template v-else-if="article.cover.type === 1">
      <div class="type-2">
        <div class="left">
          <h3 class="article-title van-multi-ellipsis--l3">{{ article.title }}</h3>
          <div class="article-info">
            <span class="article-aut">{{ article.aut_name }}</span>
            <span class="article-comment">{{ article.comm_count }}评论</span>
            <span class="article-date">{{ article.pubdate | formatRelativeTime }}</span>
          </div>
        </div>
        <div class="right">
          <van-image
            class="article-image"
            fit="cover"
            :src="article.cover.images[0]"
          />
        </div>
      </div>
    </template>
    <template v-else-if="article.cover.type === 3">
      <h3 class="article-title">{{ article.title }}</h3>
      <div class="images-list">
        <van-image
            class="article-image image-type-3"
            fit="cover"
            :src="image"
            v-for="(image,index) in article.cover.images"
            :key="index"
          />
      </div>
      <div class="article-info">
        <span class="article-aut">{{ article.aut_name }}</span>
        <span class="article-comment">{{ article.comm_count }}评论</span>
        <span class="article-date">{{ article.pubdate | formatRelativeTime }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item-container {
  border-bottom: 1px solid rgb(233, 233, 233);
  padding: 10px 16px;
  background-color: #fff;
  position: relative;
  .article-title {
    font-size: 16px;
    color: #272727;
    font-weight: 300;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .article-info {
    font-size: 12px;
    color: #b4b4b4;
    .article-aut {
      margin-right: 12px;
    }
    .article-comment {
      margin-right: 12px;
    }
  }
  .type-2 {
    display: flex;
    width: 100%;
    .left {
      width: 225px;
      margin-right: 15px;
    }
  }
  .icon-guanbi {
    position: absolute;
    bottom: 12px;
    right: 10px;
    font-size: 8px;
    color: #cfcfcf;
  }
  .article-image {
    width: 114px;
    height: 73px;
  }
  .image-type-3 {
    &:not(:last-child) {
      padding-right: 4px;
      box-sizing: border-box;
    }
  }
}
</style>
