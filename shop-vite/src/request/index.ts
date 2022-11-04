import axios, { AxiosInstance } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: '/api'
})

export default service
