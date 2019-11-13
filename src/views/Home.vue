<template>
  <div class="home">

    <ul>
      <li v-for="character in characters" :key="character.id" :style="{backgroundImage: `url(https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${character.imageId}.png)`}">
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
    background-color: #414141;
    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      width: 10%;
      height: 10vw;
      background-size: cover;
      font-family: DFGothic;
      background-position: center center;
      position: relative;
      border: 1px solid black;

      &:hover {
        opacity: 0.8;
      }

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
        align-items: flex-end;
        text-align: center;
        padding-bottom: 6px;

        text-shadow:
            -2px -2px 0 #000,
            2px -2px 0 #000,
          -2px 2px 0 #000,
          2px 2px 0 #000;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .home li {
      width: 16.666%;
      height: 16.666vw;
    }
  }

  @media screen and (max-width: 600px) {
    .home li {
      width: 25%;
      height: 25vw;
    }
  }

  @media screen and (max-width: 500px) {
    .home li {
      width: 33.333%;
      height: 33.333vw;
    }
  }
</style>
