<template>
  <div class="character" :style="{backgroundImage: `url(https://www.smashbros.com/assets_v2/img/fighter/${id}/ss_1.jpg)`}">
    <div>
      <div>
        <h1>{{ character.name }}</h1>
        <div class="details">
          <p>{{ character.description }}</p>
          <div class="pros">
            <span>+</span>
            {{ character.strength }}
          </div>
          <div class="cons">
            <span>-</span>
            {{ character.weakness }}
          </div>
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
import { GET_CHARACTER } from '@/store'
import RadarChart from '@/components/RadarChart'

export default {
  props: {
    id: String
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
    padding: 1rem;
    position: relative;
    display: flex;

    &:before {
      content: '';
      position: absolute;
      background: rgba(0,0,0,0.5);
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    > div {
      z-index: 1;
      position: relative;
      display: flex;
      flex: 1;

      > div {
        flex: 1;
        align-items: center;
      }
    }

    h1 {
      font-size: 40px;
      text-transform: uppercase;
    }
  }

  .details {
    max-width: 400px;
  }

  .pros, .cons {
    display: flex;
    align-items: center;

    span {
      font-family: monospace;
      font-size: 40px;
      border-radius: 100%;
      border: 5px solid;
      min-width: 40px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
    }
  }

  .cons {
    margin-top: 1rem;
  }

  .chart-container {
    display: flex;

    > * {
      flex: 1;
    }
  }
</style>
