<template>
  <div id="app">
    <div v-if="isLoading">Loading</div>
    <router-view v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_CHARACTERS, CHARACTERS } from '@/store'

export default {
  data () {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      characters: CHARACTERS
    })
  },
  watch: {
    characters () {
      this.isLoading = false
    }
  },
  mounted () {
    this.$store.dispatch(FETCH_CHARACTERS)
  }
}
</script>

<style lang="less">
  @font-face {
    font-family: "DFGothic";
    src: url("~@/assets/fonts/DFGothic-SU-WING-RKSJ-H.ttf") format("truetype");
  }

  body, html, h1 {
    margin: 0;
    padding: 0;
  }
</style>

<style lang="less">
#app {
  font-family: DFGothic, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}
</style>
