<template>
  <div id="search_bar">
    <v-autocomplete
      placeholder="キーワードで検索"
      rounded
      solo/>
  </div>
</template>

<script>
  export default {
    name: "search"
  }
</script>

<style scoped lang="scss">
  #search_bar{
    width: 90%;
    margin-left: 5%;
  }
</style>