<template>
  <div class="grid-nav-container">
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <i slot="icon" class="icon icon-shoucang shoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="icon icon-lishi lishi"></i>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
  .grid-nav-container {
    .shoucang {
      color: #eb5253;
    }
    .lishi {
      color: #ff9d1d;
    }
    /deep/ .van-grid-item__text {
      font-size: 14px;
      color: #333;
    }
    /deep/ .van-grid-item__icon-wrapper {
      margin-bottom: 5px;
    }
  }
</style>
