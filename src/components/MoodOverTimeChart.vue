<template lang="html">
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <ECharts :options="chartOptions" ref="chart"></ECharts>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/scatter'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

const getSeries = data => ({
  name: 'Punch Card',
  type: 'scatter',
  data,
  symbolSize: val => val[2] * 5,
  animationDelay: idx => idx * 2
})

const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p']
const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']
const baseOptions = {
  title: {
    text: 'Punch Card of Github',
    link: 'https://github.com/pissang/echarts-next/graphs/punch-card'
  },
  legend: {
    data: ['Punch Card'],
    left: 'right'
  },
  tooltip: {
    position: 'top',
    formatter: function (params) {
      return params.value[2] + ' commits in ' + hours[params.value[0]] + ' of ' + days[params.value[1]]
    }
  },
  grid: {
    left: 2,
    bottom: 10,
    right: 10,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: hours,
    boundaryGap: false,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#bbb',
        type: 'dashed'
      }
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {
    type: 'category',
    data: days,
    axisLine: {
      show: false
    }
  },
  series: [getSeries()]
}

export default {
  components: { ECharts },
  computed: {
    ...mapGetters([
      'moodScatteredOverWeek'
    ]),
    chartOptions () {
      const options = {
        ...baseOptions,
        series: [getSeries(this.moodScatteredOverWeek)]
      }
      return options
    }
  }
}
</script>

<style lang="css">
</style>
