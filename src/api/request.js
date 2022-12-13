import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

request.interceptors.response.use((reason) => {
  NProgress.done()
  return reason
})
export default request
