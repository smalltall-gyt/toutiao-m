<template>
  <div class="search-container">
    <div class="header">
      <form action="/">
        <van-search
          v-model="searchValue"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @focus="onFocus"
          @input="onInput"
        />
      </form>
    </div>
     <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-value="searchValue"/>
    <!-- 搜索联想 -->
    <SearchSuggestion
      v-else-if="searchValue"
      :search-list="searchList"
      :search-value="searchValue"
      @showResult="showResult"
    />
    <!-- 搜索历史 -->
    <HistorySearch
      v-else
      :histories="historySearchList"
      @deleteHistory="deleteHistory"
      @search="handleSearch"
      @deleteAll="deleteAll"
    />
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion'
import HistorySearch from './components/HistorySearch'
import SearchResult from './components/SearchResult'
import debounce from '@/utils/debounce'
import { searchSuggestion, searchHistories, deleteAllHistories } from '@/api/search'
import { set, get } from '@/utils/localStorage'
import { mapState } from 'vuex'

export default {
  components: {
    SearchSuggestion,
    HistorySearch,
    SearchResult
  },
  data () {
    return {
      searchValue: '', // 搜索的内容
      isResultShow: false, // 搜索结果是否显示
      searchList: [], // 联想建议列表
      historySearchList: [] // 历史搜索记录
    }
  },
  created () {
    this.loadSearchHistories()
  },
  methods: {
    // 显示搜索结果
    onSearch () {
      this.isResultShow = true
      this.pushHistorySearch(this.searchValue)
    },
    onCancel () {
      this.$router.back()
    },
    onFocus () {
      this.isResultShow = false
    },
    onInput: debounce(async function () {
      if (this.searchValue === '') {
        return
      }
      const res = await searchSuggestion(this.searchValue)
      this.searchList = res.data.options
      console.log(this.searchList)
    }, 500),
    // 显示搜索结果
    showResult (item) {
      this.searchValue = item
      this.isResultShow = true
      this.pushHistorySearch(item)
    },
    // 往本地添加历史记录
    pushHistorySearch (item) {
      const index = this.historySearchList.indexOf(item)
      if (index !== -1) {
        // 说明已经有了
        this.historySearchList.splice(index, 1)
      }
      this.historySearchList.unshift(item)
      // 存储到本地
      set('history-search', this.historySearchList)
    },
    // 获取历史记录
    async loadSearchHistories () {
      // 判断是否已经登录
      if (this.user) {
        const res = await searchHistories()
        this.historySearchList = res.data.keywords
        console.log(res)
      } else {
        this.historySearchList = get('history-search') || []
      }
    },
    // 删除历史记录
    deleteHistory (index) {
      this.historySearchList.splice(index, 1)
      set('history-search', this.historySearchList)
    },
    // 非删除状态下点击搜索历史
    handleSearch (index) {
      this.searchValue = this.historySearchList[index]
      this.isResultShow = true
      this.pushHistorySearch(this.searchValue)
    },
    // 删除全部历史记录
    async deleteAll () {
      if (this.user) {
        // 登录过
        await deleteAllHistories()
        this.loadSearchHistories()
      } else {
        this.historySearchList = []
        set('history-search', this.historySearchList)
      }
    }
  },
  computed: {
    ...mapState('user', ['user'])
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .header {
    width: 100%;
    background-color: #3296fa;
    .van-search {
      background-color: unset;
    }
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
