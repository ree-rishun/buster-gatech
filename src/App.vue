<template>
  <v-app style="background: none">
    <nav>
      <h1 @click="$router.push('/')">yadokari</h1>
      <span
        id="user_icon"
        v-if="userID === ''"
        @click="$router.push('/signup')"
        title="ユーザ登録">
      </span>
      <span
        id="user_icon__active"
        v-else
        @click="$router.push('/mypage')"
        title="マイページ">
      </span>
    </nav>
    <div id="searchBar">
      <Search/>
    </div>
    <router-view></router-view>
    <img
      class="footer_design"
      src="./assets/img/city.png">
    <footer>
      <ul>
        <li><router-link to="/">ホーム</router-link></li>
        <li><router-link to="/signup">会員登録</router-link></li>
        <li><router-link to="/term">利用規約</router-link></li>
      </ul>
      <p>
        &copy;2020 yadkari
      </p>
    </footer>
  </v-app>
</template>

<script>
import Search from './components/Search'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

export default {
  name: 'App',

  components: {
    Search
  },
  data: () => ({
    userID: ''
  }),
  updated() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user :')
      console.log(user)
      if (user) {
        console.log('if')
        const uid = user.uid;
        this.userID = uid
      } else {
        console.log('else')
        this.userID = ''
      }
    })
  }
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');

  html, body{
    background: #e7e7e7;
    font-family: 'Kosugi Maru', sans-serif;
  }

  nav{
    position: relative;
    text-align: center;
    background-color: #fcdc4a;
  }

  // ロゴ
  h1{
    display: inline-block;
    width: 100px;
    height: 70px;
    background-image: url("assets/img/logo.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 65px;
    user-select: none;
    color: rgba(0,0,0,0);
    vertical-align: top;
  }

  // アイコン
  #user_icon, #user_icon__active{
    position: absolute;
    display: inline-block;
    top: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 60px;
    border: solid 2px #111111;
    background-color: #ffffff;
    background-image: url("assets/img/user.png");
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: auto 40px;
    vertical-align: top;
  }
  #user_icon__active{
    background-image: url("assets/img/user_active.png");
  }

  // 検索バー
  #searchBar{
    width: 90vw;
    margin: 15px 0 10px 5vw;
  }

  // フッター上の画像
  .footer_design{
    width: 60%;
    margin: 10px 20% 0;
  }

  // フッタースタイル
  footer{
    width: 100%;
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

    // コピーライト
    p{
      text-align: center;
    }
  }
</style>
