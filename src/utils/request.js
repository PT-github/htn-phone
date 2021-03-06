import axios from 'axios'
import { Toast } from 'vant';
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_API, // api的base_url
	timeout: 5000 // request timeout
})
/*
// request interceptor
service.interceptors.request.use(config => {
	// Do something before request is sent
	if (store.getters.token) {
		config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
	}
	return config
}, error => {
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
})
*/
// respone interceptor
service.interceptors.response.use(
	response => {
		const res = response.data;
		/**
		 * 通过response自定义success来标示请求状态
		 */
		if (res && res.success) {
			return response.data;
		} else {
            Toast(res.message)
			return Promise.reject('error');
		}
	},
	error => {
		console.log('err' + error)// for debug
        Toast(error.message)
		return Promise.reject(error)
	})

export default service
