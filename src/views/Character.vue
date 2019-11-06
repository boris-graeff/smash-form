<template>
  <div class="character" :style="{backgroundImage: `url(https://www.smashbros.com/assets_v2/img/fighter/${name}/ss_1.jpg)`}">
    <div>
      <h1>{{ name }}</h1>
      <radar-chart :character="character" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_CHARACTER } from '@/store'
import RadarChart from '@/components/RadarChart'

export default {
  props: {
    name: String
  },
  computed: {
    ...mapGetters({
      getCharacter: GET_CHARACTER
    }),
    character () {
      return this.getCharacter(this.name)
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
    min-height: 100vh;
    color: white;
    padding: 1rem;
    position: relative;

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
    }

    h1 {
      font-size: 40px;
      text-transform: uppercase;
    }
  }
</style>
