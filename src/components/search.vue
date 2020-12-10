<template>
  <div id="search_bar">
    <input
      type="text"
      v-model="keyWord">
    <span
      id="search_button"
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
  $textbox-height: 30px;

  #search_bar{
    display: block;
    width: 100%;
    height: $textbox-height;
    line-height: $textbox-height;
    padding: 0 0 0 15px;
    border: solid 2px #111111;
    border-radius: $textbox-height;
  }

  input[type="text"]{
    display: inline-block;
    width: calc(100% - 35px);
    height: $textbox-height - 4px;
    line-height: $textbox-height - 4px;
    margin: 0;
    padding: 0;
    vertical-align: top;

    // フォーカス時のスタイルを無効化
    &:focus{
      outline: none;
      border: none;
    }
  }
  #search_button{
    display: inline-block;
    height: $textbox-height - 4px;
    width: $textbox-height - 4px;
    background-image: url("../assets/img/search.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    user-select: none;
    color: rgba(0, 0, 0, 0);
  }
</style>