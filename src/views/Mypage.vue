<template>
  <div>
    <h2>こんにちは、{{ user.lastName + user.firstName }} さん</h2>



    <button>ログアウト</button>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Mypage',
    data () {
      return {
        user: {}
      }
    },
    methods: {

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
  h2{
    text-align: center;
  }
</style>