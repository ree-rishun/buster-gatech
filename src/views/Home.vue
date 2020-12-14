<template>
  <div class="home">
    <h2>引っ越し先から探す</h2>

    <ul id="areaList">
      <li
        v-for="prefectures in areas"
        :key="prefectures.id"
        :class="activeList === prefectures.id ? 'active' : ''"
        @click="jampSelectCity(prefectures.id)"
      >
        {{ prefectures.name }}
      </li>
    </ul>

    <h2>ヤドカリって何が凄い？</h2>
    <div id="content_function">
      <h3>1. タップするだけでなんでもできちゃう</h3>
      <p class="background_tap">
        引っ越し先の地域を選んで、<br>街を選んで、検索結果を絞り込んで、<br>お気に入りの部屋を選んで、<br>気に入らない部屋は除外して、<br>気に入った部屋の詳細を見て…<br>
        <span class="bold">これ全部タップで出来ちゃいます！</span>
      </p>
      <h3>2. マッチングアプリ方式</h3>
      <p class="background_much">
        新居との出会いはまさにマッチング！<br>
        ヤドカリはマッチングアプリのように<br>
        「気に入った部屋 / 気に入らない部屋」<br>
        を簡単に振り分けることが出来ます。<br>
        本当に気に入った<span class="bold">運命の一部屋と結ばれるならヤドカリ</span>で探しましょう！
      </p>
    </div>

    <h2>会員ならもっとサクサク</h2>
    <div id="content_user">
      <p>
        無料の会員になって豊富な機能を活用しよう！
      </p>

      <div class="content_user__function">
        <div
          class="function_image"
          style="background-color: #ffa694">
          <img src="../assets/img/muching.png">
        </div>
        <div class="function_description">
          <p class="function_number">機能その１</p>
          <h3>マッチング機能</h3>
          <p>
            効率よくお気に入りの部屋を絞り込む最短ルート！
          </p>
        </div>
      </div>

      <div class="content_user__function">
        <div
          class="function_image"
          style="background-color: #dafb9b">
          <img src="../assets/img/pc.png">
        </div>
        <div class="function_description">
          <p class="function_number">機能その２</p>
          <h3>簡単申し込み</h3>
          <p>
            ユーザ情報を元に簡単に内見や入居申し込みができます。
          </p>
        </div>
      </div>

      <div class="content_user__function">
        <div
          class="function_image"
          style="background-color: #addcff">
          <img src="../assets/img/remote.png">
        </div>
        <div class="function_description">
          <p class="function_number">機能その３</p>
          <h3>気軽に質問</h3>
          <p>
            分からないことはコメント形式で簡単に質問できます。
          </p>
        </div>
      </div>

      <div class="content_user__link">
        <router-link
          to="/signup"
          v-if="!login">会員登録はこちら</router-link>
      </div>
    </div>

    <Toast
      v-if="toast.display"
      @hidden="toast.display = false"
      :message="toast.message"/>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import Toast from '../components/Toast'

export default {
  name: 'Home',
  components: {
    Toast
  },
  data () {
    return {
      areas: [],
      categories: [],
      activeList: '',
      login: false,
      toast: {
        message: 'hello',
        display: false
      }
    }
  },
  methods: {
    jampSelectCity (prefecturesID) {
      const self = this

      // 選択されたリストをアクティブに
      this.activeList = prefecturesID

      // 町のセレクト画面へ移動
      setTimeout(
        function () {
          self.$router.push('city/' + prefecturesID)
        },
        200
      )
    }
  },
  mounted() {
    const self = this

    // 地名一覧の取得
    firebase
      .database()
      .ref("prefectures")
      .on("child_added", snapshot => {
        const area = snapshot.val()
        console.log(area)
        self.areas.push(area)
      })

    // ログインユーザ情報の取得
    firebase.auth().onAuthStateChanged((auth) => {
      // ログイン状態を代入
      this.login = (auth !== null)
    })

    // toast
    if (Object.keys(this.$route.query).indexOf('toastMessage') !== -1) {
      console.log(this.$route.query)
      this.toast.message = this.$route.query.toastMessage
      this.toast.display = true
    }
  }
}
</script>

<style scoped lang="scss">
  h2{
    margin-top: 20px;
    text-align: center;

    @media screen and (min-width: 960px) {
      font-size: 2rem;
    }
  }
  $delay: .2s;
  #areaList{
    display: block;
    width: 90%;
    text-align: center;
    margin:5px 0 10px 5%;
    li{
      display: inline-block;
      width: auto;
      height: 30px;
      line-height: 13px;
      margin: 10px 5px;
      padding: 10px 12px;
      border-radius: 50px;
      font-size: 13px;
      font-weight: bolder;
      background: #fcdc4a;
      color: #111111;
      cursor: pointer;
      font-family: 'Kosugi Maru', sans-serif;
      -webkit-transition: all $delay ease;
      -moz-transition: all $delay ease;
      -o-transition: all $delay ease;
      transition: all  $delay ease;
    }
    .active{
      background: #9f9f9f;
    }
  }

  // ヤドカリって何が凄い？
  #content_function{
    width: 90%;
    margin-left: 5%;

    @media screen and (min-width: 960px) {
      width: 60%;
      margin-left: 20%;
    }
    h3{
      margin-top: 10px;
      font-size: 1rem;

      @media screen and (min-width: 960px) {
        font-size: 1.5rem;
      }
    }
    p{
      padding-right: 30%;
      width: 100%;
      font-size: 0.8rem;
      line-height: 1.5rem;
      margin: 5px 0 30px;
      background-repeat: no-repeat;
      background-position: center right 4vw;
      background-size: 20vw auto;

      @media screen and (min-width: 960px) {
        font-size: 1.2rem;
        line-height: 1.8rem;
        background-size: auto 7vw;
      }
      .bold{
        font-size: 0.9rem;
        font-weight: bold;
        background: #ffdf4a;
        padding: 0 5px;

        @media screen and (min-width: 960px) {
          font-size: 1.3rem;
        }
      }
    }

    .background_tap{
      background-image: url("../assets/img/searchSmartphone.png");
    }
    .background_much{
      background-image: url("../assets/img/muching_fin.png");
    }
  }

  // 会員ならもっとサクサク
  #content_user{
    display: inline-block;
    width: 90%;
    margin: 5px 0 20px 5%;
    p{
      text-align: center;
      line-height: 1.2rem;
      font-size: 0.9rem;

      @media screen and (min-width: 960px) {
        line-height: 1.5rem;
        font-size: 1rem;
      }
    }
    .content_user__function{
      display: inline-block;
      width: 60%;
      text-align: left;
      vertical-align: top;
      margin-top: 20px;
      margin-left: 20%;

      @media screen and (min-width: 960px) {
        width: 40%;
        margin-left: 30%;
      }

      .function_image{
        display: block;
        height: 80px;
        text-align: center;
        background: #ffffff;
        padding-top: 10px;
        border-radius: 10px 10px 0 0;
        img{
          display: inline-block;
          height: 100%;
        }
      }
      .function_description{
      }
      h3{
        width: 100%;
        font-size: 1rem;
        line-height: 1rem;
        text-align: left;

        @media screen and (min-width: 960px) {
          line-height: 2rem;
          font-size: 1.4rem;
        }
      }
      p{
        font-size: 0.8rem;
        text-align: left;

        @media screen and (min-width: 960px) {
          font-size: 1rem;
        }
      }
      .function_number{
        font-size: 0.7rem;
        color: #888888;
        margin: 0;
        @media screen and (min-width: 960px) {
          font-size: .9rem;
        }
      }
    }
    .content_user__link{
      text-align: center;
    }
  }
</style>
