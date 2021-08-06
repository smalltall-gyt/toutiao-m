<template>
  <div id="app">
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['cachePages'])
  }
}
</script>

<style lang="less">
</style>
