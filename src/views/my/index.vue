<template>
  <div class="my-container">
    <Header />
    <GridNav />
    <CellNav />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import GridNav from './components/GridNav.vue'
import CellNav from './components/CellNav.vue'

export default {
  components: {
    Header,
    GridNav,
    CellNav
  }
}
</script>

<style lang="less">
</style>
