<template lang="html">
  <ECharts :options="chartOptions" ref="chart"></ECharts>
</template>

<script>
import { mapGetters } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/scatter'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

const getSeries = data => ({
  name: 'Reports',
  type: 'scatter',
  data,
  symbolSize: val => val[2] * 5,
  animationDelay: idx => idx * 2
})

const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p']
const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']
const baseOptions = {
  title: {
    text: 'How often you report your mood',
    link: 'https://github.com/pissang/echarts-next/graphs/punch-card'
  },
  legend: {
    data: ['Reports'],
    left: 'right'
  },
  tooltip: {
    position: 'top',
    formatter: function ({ value }) {
      const [hour, day, amount] = value
      return `${amount} report${amount === 1 ? '' : 's'} on ${days[day]}s at ${hours[hour]}m`
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
      const reports = this.moodScatteredOverWeek
      const options = {
        ...baseOptions,
        series: [getSeries(reports)]
      }
      return options
    }
  }
}
</script>

<style lang="css">
</style>
