import helper from '@/store/chartDataHelper'
import listMoodResponse from '../data/listMoodResponse.json'

// const {
//   groupBySentiment,
//   hourDayOfWeekPair,
//   scatterFeelingsOverWeek
// } = helper

const { moodList } = listMoodResponse

describe('store chartDataHelper', () => {
  const timezoneCorrection = new Date().getTimezoneOffset() / 60

  it('should return an object with properties named as unique sentiments', () => {
    const group = helper.groupBySentiment(moodList)
    const actual = Object.keys(group).sort()
    const expected = ['positive', 'negative', 'neutral'].sort()
    expect(actual).toEqual(expected)
  })

  it('should get the hour/day-of-week pair from a date', () => {
    const date = '2018-07-27T09:59:11.545Z'
    const expected = [9 - timezoneCorrection, 5]
    const actual = helper.hourDayOfWeekPair(date)
    expect(actual).toEqual(expected)
  })

  it('should get datasets with x and y datapoints', () => {
    const feelings = [
      { createdAt: '2018-07-27T09:35:11.545Z', sentiment: 'positive' },
      { createdAt: '2018-07-27T09:59:11.545Z', sentiment: 'positive' },
      { createdAt: '2018-07-28T15:59:11.545Z', sentiment: 'negative' },
      { createdAt: '2018-07-29T20:59:11.545Z', sentiment: 'neutral' }
    ]

    const actual = helper.scatterFeelingsOverWeek(feelings)
    const expected = [
      [9 - timezoneCorrection, 5, 2],
      [15 - timezoneCorrection, 6, 1],
      [20 - timezoneCorrection, 0, 1]
    ]

    expect(actual).toEqual(expected)
  })
})
