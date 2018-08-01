import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
// import Layout from '../views/layout/layout'

const router =  new Router({
    routes: [
        {
            path: '',
            component: _import('home/home'),
            name: 'home',
            meta: {title: '首页', keepAlive: true}
        },
        {
            path: '/login',
            component: _import('user/login'),
            name: 'login',
            meta: {title: '登录', keepAlive: false}
        },
        {
            path: '/individual-member',
            component: _import('user/individual-member'),
            name: 'individualMember',
            meta: {title: '个人会员', keepAlive: false, needLogin: true}
        },
        {
            path: '/add-job',
            component: _import('user/components/add-job'),
            name: 'addJob',
            meta: {title: '职位新增', keepAlive: false, needLogin: true}
        },
        {
            path: '/enterpise-member',
            component: _import('user/enterpise-member'),
            name: 'enterpiseMember',
            meta: {title: '企业会员', keepAlive: false, needLogin: true},
            redirect: '/enterpise-member/enterpise-baseinfo',
            children: [
                {
                    path: '/enterpise-member/enterpise-baseinfo',
                    component: _import('user/components/enterpise-baseinfo'),
                    name: 'sBaseInfo',
                    meta: {title: '基本信息', keepAlive: false, needLogin: true}
                },
                {
                    path: '/enterpise-member/job-interview-man',
                    component: _import('user/components/job-interview-man'),
                    name: 'jobInterviewMan',
                    meta: {title: '职位/面试管理', keepAlive: false, needLogin: true}
                },
                {
                    path: '/enterpise-member/talent-pool',
                    component: _import('user/components/talent-pool'),
                    name: 'talentPool',
                    meta: {title: '企业人才库', keepAlive: false, needLogin: true}
                },
                {
                    path: '/enterpise-member/website-mail',
                    component: _import('user/components/website-mail'),
                    name: 'websiteMail',
                    meta: {title: '站内信', keepAlive: false, needLogin: true}
                }
            ]
        },
        {
            path: '/reg',
            component: _import('user/reg'),
            name: 'reg',
            meta: {title: '注册', keepAlive: false}
        },
        {
            path: '/news-home',
            component: _import('news/news-home'),
            name: 'newsHome',
            meta: {title: '新闻中心', keepAlive: true}
        },
        {
            path: '/lesson-detail',
            component: _import('education/lesson-detail'),
            name: 'lessonDetail',
            meta: {title: '课程详情', keepAlive: false}
        },
        {
            path: '/project-detail',
            component: _import('education/project-detail'),
            name: 'projectDetail',
            meta: {title: '项目详情', keepAlive: false}
        },
        {
            path: '/signUp-online',
            component: _import('education/signUp-online'),
            name: 'signUpOnline',
            meta: {title: '在线报名', keepAlive: false}
        },
        {
            path: '/certifate-query',
            component: _import('home/certifate-query'),
            name: 'certifateQuery',
            meta: {title: '证书查询', keepAlive: false}
        },
        {
            path: '/search-result',
            component: _import('home/search-result'),
            name: 'searchResult',
            meta: {title: '搜索', keepAlive: true}
        },
        {
            path: '/teacher-detail',
            component: _import('education/teacher-detail'),
            name: 'teacherDetail',
            meta: {title: '教师详情', keepAlive: false}
        },
        {
            path: '/news-list',
            component: _import('news/news-list'),
            name: 'newsList',
            meta: {title: '新闻分类列表', keepAlive: false}
        },
        {
            path: '/news-detail',
            component: _import('news/news-detail'),
            name: 'newsDetail',
            meta: {title: '新闻详情', keepAlive: false}
        },
        {
            path: '/personnel-list',
            component: _import('job/personnel-list'),
            name: 'personnelList',
            meta: {title: '招揽人才', keepAlive: false}
        },
        {
            path: '/job-list',
            component: _import('job/job-list'),
            name: 'jobList',
            meta: {title: '找工作', keepAlive: true}
        },
        {
            path: '/resume-detail',
            component: _import('job/resume-detail'),
            name: 'resumeDetail',
            meta: {title: '简历详情', keepAlive: false}
        },
        {
            path: '/job-detail',
            component: _import('job/job-detail'),
            name: 'jobDetail',
            meta: {title: '职位详情', keepAlive: false}
        },
        {
            path: '/education-training',
            component: _import('education/education-training'),
            name: 'educationTraining',
            meta: {title: '教育培训', keepAlive: false}
        },
        {
            path: '/about',
            component: _import('about/about'),
            name: 'aboutUs',
            meta: {title: '关于我们', keepAlive: true}
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.needLogin && !sessionStorage.getItem("userInfo")) {
        next({path: "/login"});
    } else {
        next()
    }
})

export default router