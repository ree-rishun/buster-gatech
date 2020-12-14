<template>
  <div>
    <router-view
      v-for="(page, index) in breadcrumb_list"
      :key="index">
      {{page}}
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    data () {
      return{
        breadcrumb_list: '',
        path: ''
      }
    },

  }
</script>

<style scoped lang="scss">

</style>