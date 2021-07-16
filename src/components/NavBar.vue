<template>
  <div class="navbar-container">
    <div class="navbar-left">
      <slot name="left"></slot>
    </div>
    <div class="navbar-center">
      <slot name="center"></slot>
    </div>
    <div class="navbar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .navbar-container {
    display: flex;
    justify-content: space-between;
    width: 375px;
    height: 45px;
    background-color: #3296fa;
    align-items: center;
    .navbar-left {
      margin-left: 16px;
    }
    .navbar-right {
      margin-right: 16px;
    }
  }
</style>
