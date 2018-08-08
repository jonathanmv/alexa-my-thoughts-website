import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from 'amazon-cognito-identity-js'

const {
  USER_POOL_ID: UserPoolId,
  USER_POOL_CLIENT_ID: ClientId,
  USER_POOL_REGION: region
} = process.env

const poolData = {
  UserPoolId,
  ClientId,
  region
}
const auth = new CognitoUserPool(poolData)

const toUsername = email => email.replace('@', '-at-')

export default {
  registerUser ({ email, password }) {
    const attributeEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: email
    })

    const username = toUsername(email)
    return new Promise((resolve, reject) => {
      auth.signUp(username, password, [attributeEmail], null, (error, result) => {
        if (error) {
          return reject(error)
        }
        return resolve({ username, email })
      })
    })
  },
  validateUserCode ({ email, userCode }) {
    const Username = toUsername(email)
    const user = new CognitoUser({ Username, Pool: auth })
    return new Promise((resolve, reject) => {
      user.confirmRegistration(userCode, true, (error, result) => {
        if (error) {
          return reject(error)
        }
        return resolve(result)
      })
    })
  }
}
