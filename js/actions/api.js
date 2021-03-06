import _ from 'lodash'
import * as axios from 'axios'

export const STAGING_BASE_URL = 'http://localhost:8080/api'
export const PROD_BASE_URL = 'http://localhost:8080/api'
export const VERSION = '1.0.0'
//TODO: add localhost?

//TODO: figure out how to determine staging, prod, dev...
let baseUrl = STAGING_BASE_URL //PROD_BASE_URL
let version = VERSION
let accessToken = null

export function assignAccessToken(token) {
  accessToken = token
}

export function post(path, data) {
  return axios.post(baseUrl + path, data)
}

export function get(path, params) {
  return axios.get(baseUrl + path, params)
}

export function del(path) {
  return axios.delete(baseUrl + path)
}

export function put(path, data) {
  return axios.put(baseUrl + path, data)
}

axios.interceptors.request.use(
  function (config) {
    var headers = { 'Content-Type': 'application/json', 'Accept-Version': version}
    if(accessToken)
      headers['Authorization'] = 'Bearer ' + accessToken
    config['headers'] = headers
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
