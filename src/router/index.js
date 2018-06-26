import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
// import Layout from '../views/layout/layout'

export default new Router({
    routes: [
        {
            path: '',
            component: _import('home/home'),
            name: 'home',
            meta: {title: '首页', keepAlive: true}
        },
        {
            path: '/news-home',
            component: _import('news/news-home'),
            name: 'newsHome',
            meta: {title: '新闻中心', keepAlive: true}
        }
    ]
})
