<template>
  <div id="search_bar">
    <input
      v-model="keyWord">
    <span
      @click="search">
      検索
    </span>
  </div>
</template>

<script>
  export default {
    name: "search",
    data () {
      return {
        keyWord: ''
      }
    },
    methods: {
      search () {
        if (this.keyWord !== '') {
          // 検索結果を表示
          this.$router.push({ name: 'search', query: { keyWord: this.keyWord }})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #search_bar{
    width: 90%;
    margin-left: 5%;
  }
</style>