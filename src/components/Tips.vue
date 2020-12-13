<template>
  <div
    id="tips"
    @click="tipsBreak">
    <div
      id="tips_window"
      @click.stop="">
      <h2>{{ tips.word }}とは？</h2>
      <p>
        {{ tips.description }}
      </p>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Tips',
    props: {
      tipsID: null
    },
    data () {
      return {
        tips: {}
      }
    },
    methods: {
      tipsBreak () { // 終了処理
        this.$emit('tips_break')
      }
    },
    mounted () {
      // チップスの情報取得
      const self = this
      console.log(this.tipsID)
      firebase
        .database()
        .ref('tips/' + this.tipsID)
        .on('value', snapshot => {
          const tips = snapshot.val()
          // チップスを登録
          self.tips = tips
        })
    }
  }
</script>

<style scoped lang="scss">
  #tips{
    position: fixed;
    z-index: 150;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.7);
  }
  #tips_window{
    width: 76vw;
    height: auto;
    margin: 15vh 0 0 10vw;
    padding: 20px 2vw 100px;
    border-radius: 20px;
    background-color: #ffffff;
    background-image: url("../assets/img/teacher.png");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: auto 80px;

    h2{
      text-align: center;
      font-size: 1.2rem;
    }
    p{
      margin-top: 20px;
      font-size: 1rem;
    }
  }
</style>