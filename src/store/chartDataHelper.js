import _ from 'lodash'
import moment from 'moment'

class BaseChartHelper {
  groupBySentiment (feelings) {
    return _.groupBy(feelings, 'sentiment')
  }

  hourDayOfWeekPair (dateString) {
    const date = moment(dateString)
    // 0 - 23
    const hour = date.hour()
    // 0 (Sunday) - 6 (Saturday)
    const day = date.day()
    return [hour, day]
  }

  extendWithHourAndDay (feelings = []) {
    return feelings.map(feeling => {
      const [hour, day] = this.hourDayOfWeekPair(feeling.createdAt)
      return { ...feeling, hour, day }
    })
  }

  scatterFeelingsOverWeek (feelings) {
    throw new Error('Not implemented. This should have been overriden by a subclass.')
  }
}

class EChartsChartHelper extends BaseChartHelper {
  scatterFeelingsOverWeek (feelings) {
    // console.log(`scattering ${feelings.length} feelings`)
    const dates = feelings.map(({ createdAt }) => createdAt)
    // [hour, day]
    const pairs = dates.map(this.hourDayOfWeekPair)
    // console.log(`scattering ${pairs.length} pairs`)
    // { 1,2: 5, 0,6: 3 }
    const countsObject = _.countBy(pairs, pair => pair.join())
    // ['1,2', '0,6']
    const uniquePairs = Object.keys(countsObject)
    // [1, 2, 5]
    const data = uniquePairs.map(pair => {
      // console.log('split', pair, pair.split(',').map(Number))
      const [hour, day] = pair.split(',').map(Number)
      const amount = countsObject[pair]
      return [hour, day, amount]
    })
    return data
  }
}

export default new EChartsChartHelper()
