<template lang="html">
  <ECharts :options="chartOptions" ref="chart"></ECharts>
</template>

<script>
import { mapGetters } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/heatmap'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'

const getSeries = data => ({
  name: 'Reports',
  type: 'heatmap',
  data,
  label: { normal: { show: true } },
  itemStyle: {
    emphasis: {
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
})

const hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const baseOptions = {
  tooltip: {
    position: 'top',
    formatter: ({ value }) => {
      const [hour, day, amount] = value
      return `${amount} report${amount === 1 ? '' : 's'} on ${days[day]}, ${hours[hour]}`
    }
  },
  grid: {
    top: '10%',
    right: 25,
    bottom: '25%'
  },
  xAxis: {
    type: 'category',
    data: hours,
    splitArea: { show: false },
    axisLine: { show: false },
    axisTick: {
      alignWithLabel: true
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dotted'
      }
    }
  },
  yAxis: {
    type: 'category',
    data: days,
    splitArea: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dotted'
      }
    }
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '5%'
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
