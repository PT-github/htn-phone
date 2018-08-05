import Vue from 'vue';
import router from './router'
import store from './store'
import './permission' // permission control
process.env.NODE_ENV === 'development' && require('./mock') // simulation data

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'video.js/dist/lang/zh-CN'
Vue.use(VueVideoPlayer)

import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
import App from './App.vue';
new Vue({
  el: '#app',
    router,
    store,
  render: h => h(App)
});
