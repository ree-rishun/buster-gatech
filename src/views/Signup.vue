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
      <input type="email" v-model="user.mail" placeholder="メールアドレス">
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
        class="submit">
        送信
      </button>
    </label>
  </div>
</template>

<script>
  export default {
    name: "Signup",
    data(){
      return{
        user: {
          firstName: '',
          lastName: '',
          mail: '',
          tel: '',
          address: '',
          term: false,
          merumaga: true
        }
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

    input[type='text'], input[type='tel'], input[type='email']{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: 270px;
      border-bottom: solid 1px #111111;
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