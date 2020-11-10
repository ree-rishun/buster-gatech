<template>
  <div>
    <div class="login_button">Googleでログイン</div>
    <div class="login_button">Facebookでログイン</div>
    <div class="login_button">メールアドレスでログイン</div>
    <router-view name="signup">アカウントをお持ちでない方</router-view>
  </div>
</template>

<script>
  export default {
    name: "signin"
  }
</script>

<style scoped>
.login_button{
  width: 300px;
  height: 50px;
  line-height: 50px;
  background: #42b983;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
}
</style>