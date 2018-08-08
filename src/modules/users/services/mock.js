// To be used in DEV only
const { DEV } = process.env
if (!DEV) {
  throw new Error('This service is suppossed to be used during development only')
}

// eslint-disable-next-line
const cognitoSignUpUserResponse = {"user":{"username":"jonathanmv-at-outlook.com","pool":{"userPoolId":"us-east-1_d1oxqzK3J","clientId":"4b58nojtpr7flm1jfeufd4t4tb","client":{"endpoint":"https://cognito-idp.us-east-1.amazonaws.com/","userAgent":"aws-amplify/0.1.x js"},"advancedSecurityDataCollectionFlag":true,"storage":{"loglevel:webpack-dev-server":"WARN"}},"Session":null,"client":{"endpoint":"https://cognito-idp.us-east-1.amazonaws.com/","userAgent":"aws-amplify/0.1.x js"},"signInUserSession":null,"authenticationFlowType":"USER_SRP_AUTH","storage":{"loglevel:webpack-dev-server":"WARN"}},"userConfirmed":false,"userSub":"ad7b7d50-9c55-4524-8354-294c9734cbf4"}

export default {
  registerUser (user) {
    console.log(`mock registerUser`, user)
    return new Promise(resolve => {
      setTimeout(() => resolve(user), 2000)
    })
  },
  validateUserCode ({ email, userCode }) {
    console.log(`mock validateUserCode`, { email, userCode })
    return new Promise(resolve => {
      setTimeout(() => resolve('SUCCESS'), 1000)
    })
  }
}
