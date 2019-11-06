<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { FETCH_CHARACTERS } from '@/store';

export default {
  mounted() {
    this.$store.dispatch(FETCH_CHARACTERS);
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
