import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:2010/v1'
})


http.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token != null) {
    config.headers['Authorization'] = token;
  }
  return config
})

export default http