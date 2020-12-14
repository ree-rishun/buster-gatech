<template>
  <div id="toast">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      message: null
    },
    mounted () {
      const self = this
      setTimeout(
        function () {
          console.log(self.message)
          self.$emit('hidden')
        },
        3000
      )
    }
  }
</script>

<style scoped>
  #toast{
    position: fixed;
    z-index: 300;
    bottom: 10px;
    left: calc((100% - 200px) / 2);
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background-color: #fcdc4a;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 40px;
    text-align: center;
    box-shadow: 0 5px 5px 3px rgba(0,0,0,0.2);
  }
</style>