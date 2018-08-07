<template lang="html">
  <ECharts :options="chartOptions" ref="chart"></ECharts>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/scatter'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

const hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']

const getSeries = (name, data) => ({
  name,
  type: 'scatter',
  data,
  symbolSize: 8,
  animationDelay: idx => idx * 2
})

const baseOptions = {
  grid: {
    top: '10%',
    right: 25,
    bottom: '25%'
  },
  legend: {
    data: ['Positive', 'Neutral', 'Negative'],
    bottom: '5%'
  },
  tooltip: {
    position: 'top',
    formatter: ({ value }) => {
      const rest = value[2]
      const { sentiment, feeling } = rest
      return `${sentiment} because you were feeling ${feeling}`
    }
  },
  xAxis: {
    type: 'time',
    splitLine: {
      lineStyle: {
        type: 'dotted'
      }
    },
    axisLabel: {
      formatter: val => moment(val).format('ddd, MMM Do')
    },
    axisLine: { show: false }
  },
  yAxis: {
    type: 'category',
    data: hours,
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dotted'
      }
    },
    axisLine: { show: false },
    axisLabel: {
      interval: 4
    }
  },
  series: []
}

export default {
  components: { ECharts },
  computed: {
    ...mapGetters([
      'positiveMoods',
      'negativeMoods',
      'neutralMoods'
    ]),
    chartOptions () {
      const toData = ({ createdAt, hour, ...rest }) => [createdAt, hour, rest]
      const positive = this.positiveMoods.map(toData)
      const negative = this.negativeMoods.map(toData)
      const neutral = this.neutralMoods.map(toData)
      const options = {
        ...baseOptions,
        series: [
          getSeries('Positive', positive),
          getSeries('Negative', negative),
          getSeries('Neutral', neutral)
        ]
      }
      return options
    }
  }
}
</script>

<style lang="css">
</style>
