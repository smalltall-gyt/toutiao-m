<template>
  <div class="search-suggestion-container">
    <van-cell-group>
      <van-cell v-for="(item, index) in searchList"
      :key="index"
      @click="showResult(item)"
      icon="search">
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      required: true
    },
    searchValue: {
      type: String,
      required: true
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchValue, 'gi')
      return str.replace(reg, `<span style="color:red">${this.searchValue}</span>`)
    },
    showResult (item) {
      this.$emit('showResult', item)
    }
  }
}
</script>

<style>

</style>
