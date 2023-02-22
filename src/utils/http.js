import axios from 'axios'
import router from '../router'
import { ElMessage } from 'element-plus'

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  err => {
    console.log(err)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response.status == 401) {
      ElMessage.error('登录已过期，请重新登录')
      router.push({
        path: '/login'
      })
    }
  }
)

export default axios
