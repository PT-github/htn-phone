<template>
    <div class="home">
        <s-header></s-header>
        <div class="container">
            <s-slider :list="posters"></s-slider>
            <s-title :link="'news'">新闻中心</s-title>
            <s-news :list="newsList"></s-news>
            <s-title :link="'lessons'">课程培训</s-title>
            <s-lessons :list="lessons"></s-lessons>
            <s-title :link="'teachers'">优秀导师</s-title>
            <s-teachers :list="teachers"></s-teachers>
            <s-title :link="'video'">视频在线看</s-title>
            <s-video :list="videos"></s-video>
            <s-title :link="'hunter'">热门招聘单位</s-title>
            <s-title :link="'job'">热门职位</s-title>
            <s-title :link="'talents'">人才列表</s-title>
            <s-title :showMore="false">友情链接</s-title>
        </div>
    </div>
</template>
<script>
    import { sHeader, sSlider, sTitle } from '@/components'
    import { sNews, sLessons, sTeachers, sVideo } from './components'
    import { Toast } from 'vant'
    import { queryPoster, queryNews, queryLessons, queryTeachers, queryVideos } from '@/api/service'
    export default {
        name: 'home',
        data() {
            return {
                posters: [],
                newsList: [],
                lessons: [],
                teachers: [],
                videos: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                })
                Promise.all([this.getPoster(), this.getNews(), this.getLessons(), this.getTeachers(), this.getVideos()]).then(() => {
                    setTimeout(() => {
                        Toast.clear()
                    }, 500)
                })
            },
            getVideos() {
                return queryVideos().then(res => {
                    this.videos = res.list
                })
            },
            getTeachers() {
                return queryTeachers().then(res => {
                    this.teachers = res.list
                })
            },
            getLessons() {
                return queryLessons().then(res => {
                    this.lessons = res.list
                })
            },
            getPoster() {
                return queryPoster().then(res => {
                    this.posters = res.list
                })
            },
            getNews() {
                return queryNews().then(res => {
                    this.newsList = res.list
                })
            }
        },
        components: {
            sHeader,
            sSlider,
            sTitle,
            sNews,
            sLessons,
            sTeachers,
            sVideo
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .home {
        width: 100%;
        height: 100%;
        position: relative;
        .container {
            position: absolute;
            top: 46px;
            left: 0;
            bottom: 0;
            right: 0;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>