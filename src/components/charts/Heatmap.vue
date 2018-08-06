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

const hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
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
    formatter: ({ value }) => {
      const [hour, day, amount] = value
      return `${amount} report${amount === 1 ? '' : 's'} on ${days[day]}s at ${hours[hour]}`
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
