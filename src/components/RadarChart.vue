<template>
  <div>
    <canvas ref='canvas' />
  </div>
</template>

<script>
import ChartJS from 'chart.js'

const WEIGHT = { min: 62, max: 135 }
const DASH = { min: 1.5375, max: 2.42 }
const RUN_SPEED = { min: 1.18, max: 3.85 }
const AIR_SPEED = { min: 0.735, max: 1.344 }
const GRAVITY = { min: 0.053, max: 0.23 }
const JUMP = { min: 19.79, max: 50.51 }

const all = [WEIGHT, DASH, RUN_SPEED, AIR_SPEED, JUMP, GRAVITY]
all.forEach(el => {
  el.min = el.min - ((el.max - el.min) / 10)
})

const labels = {
  fr: ['POIDS', 'DASH', 'RUN SPD', 'AIR SPD', 'GRAVITE', 'SAUT'],
  en: ['WEIGHT', 'DASH', 'RUN SPD', 'AIR SPD', 'GRAVITY', 'JUMP']
}

export default {
  props: {
    character: Object,
    lang: {
      type: String,
      default: 'fr'
    }
  },
  computed: {
    dataSet () {
      let { weight, dash, runSpeed, airSpeed, gravity, jump } = this.character
      if ([weight, dash, runSpeed, airSpeed, gravity, jump].includes('pas encore')) return []

      weight = ((weight - WEIGHT.min) / (WEIGHT.max - WEIGHT.min)) * 100
      dash = ((dash - DASH.min) / (DASH.max - DASH.min)) * 100
      runSpeed = ((runSpeed - RUN_SPEED.min) / (RUN_SPEED.max - RUN_SPEED.min)) * 100
      airSpeed = ((airSpeed - AIR_SPEED.min) / (AIR_SPEED.max - AIR_SPEED.min)) * 100
      gravity = ((gravity - GRAVITY.min) / (GRAVITY.max - GRAVITY.min)) * 100
      jump = ((jump - JUMP.min) / (JUMP.max - JUMP.min)) * 100

      return [weight, dash, runSpeed, airSpeed, gravity, jump]
    }
  },
  mounted () {
    const fontSize = window.innerWidth < 800 ? 24 : 45

    this.chart = new ChartJS(this.$refs.canvas, {
      type: 'radar',
      data: {
        labels: labels[this.lang],
        datasets: [
          {
            borderWidth: 6,
            pointRadius: 0,
            fill: true,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            data: this.dataSet
          }
        ]
      },
      options: {
        legend: false,
        scale: {
          pointLabels: {
            fontSize,
            fontFamily: 'DFGothic',
            fontColor: 'white'
          },
          gridLines: {
            lineWidth: 6,
            color: 'white'
          },
          angleLines: {
            display: false
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 34,
            display: false
          }
        }
      }
    })
  }
}
</script>

<style scoped lang="less">
  .container, .canvas {
    margin: auto;
  }
</style>
