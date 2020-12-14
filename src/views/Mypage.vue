<template>
  <div>
    <h2>こんにちは、{{ user.lastName + user.firstName }} さん</h2>

    <!--
    <label>
      <button
        class="list_button"
        @click="$router.push({name: 'search', query: { mode: 'like' }})"><span class="list_button__like"></span>お気に入り</button>
    </label>

    <label>
      <button
        class="list_button"
        @click="$router.push({name: 'search', query: { mode: 'nope' }})"><span class="list_button__nope"></span>除外</button>
    </label>

    <label>
      <button
        class="list_button"><span class="list_button__setting"></span>ユーザ情報の変更</button>
    </label>
    -->

    <label>
      <button
        class="logout"
        @click="logout">ログアウト</button>
    </label>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Mypage',
    data () {
      return {
        user: {
          lastName: '',
          firstName: ''
        }
      }
    },
    methods: {
      logout () {
        firebase.auth().signOut()
        // 遷移
        this.$router.push(
          { path: '/',
            query: {
              toastMessage: 'ログアウトしました'
            }
          })
      }
    },
    mounted () {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid)

          firebase
            .database()
            .ref('users/' + uid)
            .once('value').then((snapshot) => {
            const userData = snapshot.val()

            this.user = userData
          })
        } else {
          console.log('logout')
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  // タイトル
  h2{
    text-align: center;
  }

  // ログアウトボタン
  label{
    display: block;
    text-align: center;
    width: 100%;
    margin: 20px 0;

    // メニューボタン
    .list_button{
      background: #ffffff;
      width: 90%;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;

      // アイコン表示
      span{
        display: inline-block;
        width: 35px;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;
      }
      .list_button__like{
        background-image: url('../assets/img/like_bk.png');
        background-size: auto 18px;
      }
      .list_button__nope{
        background-image: url('../assets/img/nope_bk.png');
        background-size: auto 13px;
      }
      .list_button__setting{
        background-image: url('../assets/img/pc.png');
        background-size: auto 40px;
      }
    }
    // ログアウトボタン
    .logout{
      color: #ff4441;
      text-decoration: underline;
    }
  }
</style>