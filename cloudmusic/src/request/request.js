import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  timeout: 5000
})

// 请求拦截
// request.interceptors.request.user(config => {
//   config.data = {
    
//   }
//   return config;
// })

// 返回拦截
request.interceptors.response.use(response => {
  // TODO: 如果未登录，那么提示先登录
  if(response.data.code == 200) {
    return response.data
  }
})

export default request;