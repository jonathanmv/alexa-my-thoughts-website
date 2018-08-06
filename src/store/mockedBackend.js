import MockAdapter from 'axios-mock-adapter'

const {
  BACKEND_URL
} = process.env

export default axios => {
  const mock = new MockAdapter(axios)

  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  mock.onGet(/https:\/\/api\.amazon\.com\/user\/profile.+/).reply(200, {
    user_id: 'amzn1.account.AGJEO4PCZGVV6OAHZ7GDYNHYKZUQ',
    name: 'jonathan',
    email: 'jonathanmv@outlook.com'
  })

  mock.onGet('/authorize').reply(200, {
    accessToken: 'Atza|IwEBIAyqvPsdC4i1gHzUSFrMBdpfr45dU8O1HpXDgDDywoJh8IySpVq0d3kllSeEiu3oAZIdllYHRuL6731UqPGDCf8hORt68PTIZS1y2ZNnWw_hIjViFrqlS_NZ8NmXOUGqZUeb05gdBM1cx04YWJZssRXGq91iojUKGbcHLktaaA_cxplUeMulL-0zwqWC-YbUhgP3YrsvGLnnR4N9v23cI5cww7sz1-BaEYpvL7iYab4CgZZvXQ2ytoAqeaIcXsW30lxWmKXW4QG5msMaQI3P5vpZ5KtKSKcfvI-uT3S8bgIXSww4EO_lpVb1TKbq9tf7PkRLTVXVl7LXX-y3ewAWTh7FIn9Q0mObJq4Nv51AwJNoLLqYWquKnYpTmUlLSjl-56cq1CsrrhXxQ8IPZ2Kjz6P8mTmY8rmGukOcNzCDYmyHQQpfAaC_X8sh7kpN1w1dTtQfW_0gPO6W3fV8UxbkS-KFNL1C1TNLxWEQBgvLb4AtH8E04PwOloOQ5lr1fnWmd9OY8a5m8iGXvYncJiz5ni6CgVcBVXwp92K4R9FFE73ggBvnKxeyA8hRthk25LuWMnU',
    tokenType: 'bearer',
    expiresIn: '3600',
    scope: 'profile'
  })

  // eslint-disable-next-line
  const moodList = [{"createdAt":"2018-07-27T09:59:11.545Z","feeling":"great","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T09:59:54.018Z","feeling":"fantastic","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T14:33:35.743Z","feeling":"tired","sentiment":"negative","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T15:30:50.623Z","feeling":"good","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T16:17:40.403Z","feeling":"great","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T16:18:11.368Z","feeling":"great","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T19:34:05.345Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T19:35:30.520Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T19:35:52.280Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T19:35:55.287Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T19:37:03.980Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T19:37:14.419Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T19:37:42.820Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T19:37:50.659Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T20:53:28.216Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-27T20:54:19.896Z","feeling":"test","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-28T15:07:52.418Z","feeling":"wonderful","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-28T15:59:24.708Z","feeling":"wonderful","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-07-28T16:30:57.583Z","feeling":"excited","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-04T21:03:11.929Z","feeling":"very good","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-04T21:03:43.770Z","feeling":"very good","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-04T22:58:59.148Z","userId":"jonathanmv@outlook.com","sentiment":"neutral"},{"createdAt":"2018-08-04T22:59:17.968Z","feeling":"fine","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-04T23:27:29.783Z","feeling":"very good","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-05T07:06:32.192Z","feeling":"OK","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-05T17:37:45.898Z","feeling":"good","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-05T20:16:46.210Z","userId":"jonathanmv@outlook.com","sentiment":"neutral"},{"createdAt":"2018-08-05T21:04:59.381Z","feeling":"overwelmed","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-05T22:25:05.882Z","feeling":"happy","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-06T08:30:48.269Z","feeling":"energetic","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-06T12:25:57.119Z","feeling":"good","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-06T15:17:00.642Z","feeling":"happy","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-06T16:45:25.395Z","feeling":"fine","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-06T18:38:55.842Z","feeling":"fine","sentiment":"positive","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-06T19:28:35.930Z","feeling":"OK","sentiment":"neutral","userId":"jonathanmv@outlook.com"},{"createdAt":"2018-08-06T20:08:41.602Z","feeling":"happy","sentiment":"positive","userId":"jonathanmv@outlook.com"}]
  mock.onGet(BACKEND_URL + '/feeling').reply(200, moodList)
}
