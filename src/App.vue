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

  body, html, ul {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  h1, h2 {
    font-family: DFGothic;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>

<style lang="less">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  font-size: 18px;
}
</style>
