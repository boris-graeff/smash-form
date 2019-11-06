<template>
  <div class="container">
    <canvas ref='canvas' class="canvas" />
  </div>
</template>

<script>
import ChartJS from 'chart.js'

export default {
  props: {
    character: Object
  },
  computed: {
    dataSet () {
      const weight = ((this.character.weight - 62) / (135 - 62)) * 100
      const dash = ((this.character.dash - 1.18) / (3.85 - 1.18)) * 100
      const airSpeed = ((this.character.airSpeed - 0.735) / (1.344 - 0.735)) * 100
      const gravity = ((this.character.gravity - 0.053) / (0.23 - 0.053)) * 100
      const jump = ((this.character.jump - 19.79) / (50.51 - 19.79)) * 100
      return [weight, dash, airSpeed, gravity, jump]
    }
  },
  mounted () {
    this.chart = new ChartJS(this.$refs.canvas, {
      type: 'radar',
      data: {
        labels: ['POIDS', 'DASH', 'AIR SPD', 'GRAVITE', 'SAUT'],
        datasets: [
          {
            label: '2050',
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
            fontSize: 45,
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
            stepSize: 25,
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
