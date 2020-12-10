<template>
  <v-app style="background: none">
    <h1>yadokari</h1>
    <div id="searchBar">
      <Search/>
    </div>
    <router-view></router-view>
    <footer>
      <ul>
        <li><router-link to="/">ホーム</router-link></li>
        <li>会員登録</li>
        <li>利用規約</li>
      </ul>
    </footer>
  </v-app>
</template>

<script>
import Search from './components/Search'

export default {
  name: 'App',

  components: {
    Search
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
  body{
    background: #e7e7e7;
  }

  // ロゴ
  h1{
    display: inline-block;
    width: 100%;
    height: 80px;
    background-image: url("assets/img/logo.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 70px;
    user-select: none;
    color: rgba(0,0,0,0);
  }

  // 検索バー
  #searchBar{
    width: 90vw;
    margin-left: 5vw;
  }

  // フッタースタイル
  footer{
    width: 100%;
    margin-top: 20px;
    padding-top: 20px;
    background: #d8d8d8;

    // フッターナビゲーション
    ul{
      text-align: center;
      li{
        display: inline-block;
        width: 80px;
        height: 40px;
        font-weight: bold;

        :link, :visited{
          text-decoration: none;
          color: #111111;
        }
      }
    }
  }
</style>
