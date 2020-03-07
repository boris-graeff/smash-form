<template>
  <div class="chart">
    <div class="chart-container">
      <radar-chart :character="character" :key="character.id" :lang="lang"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_CHARACTER } from '@/store'
import RadarChart from '@/components/RadarChart'

export default {
  props: {
    id: String,
    lang: {
      type: String,
      default: 'fr'
    }
  },
  computed: {
    ...mapGetters({
      getCharacter: GET_CHARACTER
    }),
    character () {
      return this.getCharacter(this.id)
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
