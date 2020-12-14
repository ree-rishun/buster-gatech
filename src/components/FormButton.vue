<template>
  <div id="form_button">
    <div
      id="form_button_button"
      @click="redirectForm">
      内見・入居のご相談
    </div>
  </div>
</template>

<script>
  export default {
    name: 'formButton',
    props: {
      roomID: null
    },
    methods: {
      redirectForm () {
        this.$router.push('/room/' + this.roomID + '/form')
      }
    }
  }
</script>

<style scoped lang="scss">
  #form_button{
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 80px;
    background: #333333;
    text-align: center;
  }
  #form_button_button{
    display: inline-block;
    width: 230px;
    height: 50px;
    margin-top: 15px;
    padding-right: 40px;
    line-height: 50px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 1rem;
    background-color: #fcdc4a;
    background-image: url("../assets/img/smartphone.png");
    background-repeat: no-repeat;
    background-position: bottom right 4%;
    background-size: auto 45px;
    cursor: pointer;
    user-select: none;
  }
</style>