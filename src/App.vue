<template>
  <v-app>
    <nav>
      <v-autocomplete
        rounded
        solo
      ></v-autocomplete>
    </nav>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
