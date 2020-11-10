<template>
  <div>
    <input type="text" v-model="user.lastName" placeholder="苗字">
    <input type="text" v-model="user.firstName" placeholder="名前">
    <input type="text" v-model="user.mail" placeholder="メールアドレス">
    <input type="text" v-model="user.tel" placeholder="電話番号">
    <input type="text" v-model="user.address" placeholder="住所">

    <div></div>
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
          address: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>