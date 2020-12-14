<template>
  <div>
    <h2>ログイン</h2>

    <label>
      <input type="email" v-model="user.email" placeholder="メールアドレス">
    </label>
    <label>
      <input type="password" v-model="user.password" placeholder="パスワード">
    </label>

    <label>
      <button
        class="submit"
        @click="signin">
        ログイン
      </button>
    </label>

    <label>
      <router-link
        to="/signup">
        まだ登録されていない方はこちら
      </router-link>
    </label>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import 'firebase/storage'
  import 'firebase/database'

  export default {
    name: "Signin",
    data(){
      return{
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signin () {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.password)
          .then((user) => {
            console.log(user)

            // ホームへ移動
            // 遷移
            this.$router.push(
              { path: '/',
                query: {
                  toastMessage: 'ログインしました'
                }
              })
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log('ERROR CODE : ' + errorCode)
            console.log(errorMessage)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  h2{
    text-align: center;
  }

  label{
    display: block;
    text-align: center;
    padding: 10px 0;

    input[type='text'], input[type='tel'], input[type='email'], input[type='password']{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: 270px;
      border-bottom: solid 1px #111111;

      &:focus{
        outline: none;
        border: none;
        border-bottom: solid 1px #0080ff;
      }
    }
  }

  // 送信ボタン
  .submit{
    height: 35px;
    width: 120px;
    border-radius: 35px;
    background: #fcdc4a;
    color: #111111;
    font-weight: bold;
  }
</style>