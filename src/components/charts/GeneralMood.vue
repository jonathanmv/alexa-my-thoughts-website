<template lang="html">
  <ECharts :options="chartOptions" ref="chart"></ECharts>
</template>

<script>
import { mapGetters } from 'vuex'
import countBy from 'lodash/countBy'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

const getInternalSeries = data => ({
  name: 'General Mood',
  type: 'pie',
  radius: ['30%', '45%'],
  data,
  label: {
    normal: {
      position: 'center',
      formatter: '{b}: {c}',
      fontSize: 15
    }
  },
  labelLine: {
    normal: {
      show: false
    }
  }
})

const getExternalSeries = data => ({
  name: 'Particular Feeling',
  type: 'pie',
  radius: ['55%', '70%'],
  label: {
    normal: {
      formatter: '{b}: {c}'
    }
  },
  data
})

const baseOptions = {
  title: {
    text: 'General Mood'
  },
  // legend: {
  //   data: ['Positive', 'Neutral', 'Negative'],
  //   left: 'right'
  // },
  tooltip: {
    position: 'top',
    formatter: '{b} mood<br/>Reported {c} times<br />{d}%'
  },
  series: []
}

export default {
  components: { ECharts },
  computed: {
    ...mapGetters([
      'positiveMoods',
      'negativeMoods',
      'neutralMoods',
      'moodList'
    ]),
    chartOptions () {
      const toData = (name, { length: value }) => ({ name, value })
      const data = [
        toData('Positive', this.positiveMoods),
        toData('Neutral', this.neutralMoods),
        toData('Negative', this.negativeMoods)
      ]
      const toCount = moods => {
        const feelings = moods.map(({feeling}) => feeling)
        const count = countBy(feelings)
        const uniqueFeelings = Object.keys(count)
        return uniqueFeelings.map(name => ({ name, value: count[name] }))
      }
      const externalData = toCount(this.moodList)
      const options = {
        ...baseOptions,
        series: [
          getInternalSeries(data),
          getExternalSeries(externalData)
        ]
      }
      return options
    }
  }
}
</script>

<style lang="css">
</style>
