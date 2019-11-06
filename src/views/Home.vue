<template>
  <div class="home">

    <ul>
      <li v-for="character in characters" :key="character.id" :style="{backgroundImage: `url(https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${character.id}.png)`}">
        <router-link :to="{ name: 'character', params: { id: character.id }}">
          {{ character.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CHARACTERS } from '@/store'

export default {
  computed: {
    ...mapGetters({
      characters: CHARACTERS
    })
  }
}
</script>

<style scoped lang="less">
  .home {
    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      width: 10vw;
      height: 10vw;
      background-size: cover;
      font-family: DFGothic;
      background-color: #414141;
      background-position: center center;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        background: rgba(0,0,0,0.1);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }

      > a {
        position: relative;
        z-index: 1;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
