<template>
  <div>
    <h2>内見・入居のご相談</h2>

    <label>
      <p>相談内容</p>
      <select
        v-model="request.category">
        <option value="preview">内見に関するご相談・予約</option>
        <option value="move">入居に関するご相談</option>
        <option value="cost">初期費用に関して詳しく知りたい</option>
        <option value="ohter">その他</option>
      </select>

      <label
        v-if="!request.user.check">
        <p>連絡用メールアドレス</p>
        <input
          type="text"
          v-model="request.email"
          placeholder="example@example">
      </label>

      <label>
        <p>補足事項（任意）</p>
        <textarea
          v-model="request.option"></textarea>
      </label>

      <label>
        <button
          class="submit"
          @click="submitForm">
          送信
        </button>
      </label>
    </label>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'SendForm',
    data () {
      return {
        request: {
          category: 'preview',
          option: '',
          email: '',
          roomID: '',
          user: {
            check: false,
            uid: ''
          }
        }
      }
    },
    methods: {
      submitForm () {
        // 新規ユーザ作成
        firebase
          .database()
          .ref('requests/')
          .push(this.request)

        // 遷移
        this.$router.push(
          { path: '/',
            query: {
              toastMessage: '送信完了しました'
            }
        })
      }
    },
    mounted () {
      // 部屋ナンバーの取得
      this.request.roomID = this.$route.params.id

      // ログインユーザ情報の取得
      firebase.auth().onAuthStateChanged((auth) => {
        // ログイン状態を代入
        this.request.user.check = (auth !== null)
        // ログイン中の場合ユーザ情報を取得
        if (auth) {
          this.request.user.uid = auth.uid
        }
      })
    }
  }
</script>


<style scoped lang="scss">
  h2{
    text-align: center;
  }

  // 入力フォームスタイル
  label{
    display: block;
    text-align: center;
    padding: 10px 0;

    input[type='text'], input[type='tel'], input[type='email'], input[type='password']{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: 90%;
      border-bottom: solid 1px #111111;

      &:focus{
        outline: none;
        border: none;
        border-bottom: solid 1px #0080ff;
      }

      // エラー時のスタイル
      &.error_input{
        border-bottom: solid 1px #ff536a;
      }
    }
    textarea{
      width: 90%;
      height: 100px;
      padding: 5px;
      border: solid 1px #111111;
      border-radius: 3px;
    }
    p{
      width: 90%;
      margin: 20px 0 0 5%;
      text-align: left;
    }
  }

  select{
    display: inline-block;
    width: 90%;
    height: 40px;
    padding: 5px;
    border: solid 1px #111111;
    border-radius: 3px;
  }

  // 送信ボタン
  .submit, .submit_disable{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    width: 80px;
    border-radius: 35px;
    background: #fcdc4a;
    color: #111111;
    font-weight: bold;
  }
  .submit_disable{
    background: #9f9f9f;
  }
</style>
