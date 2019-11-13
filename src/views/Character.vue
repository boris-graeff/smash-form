<template>
  <div class="character" :style="{backgroundImage: `url(https://www.smashbros.com/assets_v2/img/fighter/${character.imageId}/ss_1.jpg)`}">
    <header>
      <div>
        <router-link :to="{name: 'home'}">
          <img src="@/assets/icons/home.svg" alt="Home" />
        </router-link>
        <h1>{{ character.index }}. {{ character.name }}</h1>
      </div>
      <nav>
        <router-link :to="{name: 'character', params: { id: previousCharacter.id}}">
          <img src="@/assets/icons/previous.svg" alt="Previous" />
          {{ previousCharacter.name }}
        </router-link>
        <router-link :to="{name: 'character', params: { id: nextCharacter.id}}">
          {{ nextCharacter.name }}
          <img src="@/assets/icons/next.svg" alt="Next" />
        </router-link>
      </nav>
    </header>

    <div class="main">
      <div class="details">
        <p>{{ character.description }}</p>
        <p>{{ character.feeling }}</p>
        <div class="pros">
          <img src="@/assets/icons/pros.svg" alt="Pros" />
          {{ character.strength || 'coming soon' }}
        </div>
        <div class="cons">
          <img src="@/assets/icons/cons.svg" alt="Cons" />
          {{ character.weakness || 'coming soon' }}
        </div>
      </div>

      <div class="chart-container">
        <radar-chart :character="character" :key="character.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_CHARACTER, GET_NEXT_CHARACTER, GET_PREVIOUS_CHARACTER } from '@/store'
import RadarChart from '@/components/RadarChart'

export default {
  props: {
    id: String
  },
  computed: {
    ...mapGetters({
      getCharacter: GET_CHARACTER,
      getNextCharacter: GET_NEXT_CHARACTER,
      getPreviousCharacter: GET_PREVIOUS_CHARACTER
    }),
    character () {
      return this.getCharacter(this.id)
    },
    nextCharacter () {
      return this.getNextCharacter(this.id)
    },
    previousCharacter () {
      return this.getPreviousCharacter(this.id)
    }
  },
  components: {
    RadarChart
  }
}
</script>

<style scoped lang="less">
  .character {
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
    padding: 2vw;
    position: relative;
    display: flex;
    flex-direction: column;

    &:before {
      content: '';
      position: absolute;
      background: rgba(0,0,0,0.5);
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    > * {
      z-index: 1;
      position: relative;
    }

    > div {
      display: flex;
      flex: 1;

      > div {
        align-items: center;
      }
    }

    h1 {
      font-size: 40px;
      text-transform: uppercase;
    }

    header > div:first-child {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      a {
        margin-right: 1rem;
      }
    }

    nav {
      a {
        display: inline-block;
        padding: 6px;
        font-family: DFGothic;

        &:hover {
          opacity: 0.9;
        }

        + a {
          margin-left: 1rem;
        }
      }
      img {
        vertical-align: middle;
      }
    }
  }

  .details {
    max-width: 400px;
    width: 100%;
  }

  .pros, .cons {
    display: flex;
    align-items: center;

    img {
      min-width: 40px;
      width: 40px;
      margin-right: 1rem;
    }
  }

  .cons {
    margin-top: 1rem;
  }

  .chart-container {
    flex: 1;
  }

  @media screen and (max-width: 1000px) {
   .character > div {
     display: block;
   }
  }
</style>
