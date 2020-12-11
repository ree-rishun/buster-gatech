<template>
  <div>
    <h2>ユーザ登録</h2>

    <label>
      <input type="text" v-model="user.lastName" placeholder="苗字">
    </label>
    <label>
      <input type="text" v-model="user.firstName" placeholder="名前">
    </label>
    <label>
      <input type="email" v-model="user.email" placeholder="メールアドレス">
    </label>
    <label>
      <input type="password" v-model="user.password" placeholder="パスワード">
    </label>
    <label>
      <input type="tel" v-model="user.tel" placeholder="電話番号（任意）">
    </label>
    <label>
      <input type="text" v-model="user.address" placeholder="住所（任意）">
    </label>
    <label>
      <input type="checkbox" v-model="user.merumaga"> メルマガに登録します。
    </label>
    <label>
      <input type="checkbox" v-model="user.term"> <router-link to="/term">利用規約</router-link>に同意します。
    </label>

    <label>
      <button
        class="submit"
        @click="registerSubmit">
        登録
      </button>
    </label>

    <label>
      <router-link
        to="/signin">
        既に登録されている方はこちら
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
    name: "Signup",
    data(){
      return{
        user: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          tel: '',
          address: '',
          term: false,
          merumaga: true
        }
      }
    },
    methods: {
      registerSubmit () { // 会員登録処理

        // パスワードが6文字以上か？
        // e-mailのフォーマット確認

        // Authenticationへの登録
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then((user) => {

            // 新規ユーザ作成
            firebase
              .database()
              .ref('users/' + user.user.uid)
              .set({
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                mail: this.user.email,
                tel: this.user.tel,
                address: this.user.address,
                merumaga: this.user.merumaga,
                UID: user.user.uid,
                evalution: {
                  like: [],
                  nope: []
                }
              })

            // ログイン
            firebase
              .auth()
              .signInWithEmailAndPassword(this.user.email, this.user.password)
              .then((user) => {
                console.log(user)

                // ホームへ移動
                this.$router.push('/');
              })
              .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log('ERROR CODE : ' + errorCode)
                console.log(errorMessage)
              })

            // ホームへ移動
            this.$router.push('/');
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
    width: 80px;
    border-radius: 35px;
    background: #fcdc4a;
    color: #111111;
    font-weight: bold;
  }
</style>