import api from './api'

let service = api

if (process.env.DEV) {
  import('./mock')
    .then(mock => {
      service = mock.default
    })
}

export const getService = () => service
