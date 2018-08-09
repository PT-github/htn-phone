<template>
    <div class="home">
        <s-header ref="headerComp"></s-header>
        <div class="container">
            <s-slider :list="posters"></s-slider>
            <s-title :link="'news-home'">新闻中心</s-title>
            <s-news :list="newsList"></s-news>
            <s-title :link="'education-training'" :query="{mode: 0}">课程培训</s-title>
            <s-lessons :list="lessons"></s-lessons>
            <s-title  :link="'education-training'" :query="{mode: 3}">优秀导师</s-title>
            <s-teachers :list="teachers"></s-teachers>
            <s-title  :link="'education-training'" :query="{mode: 2}">视频在线看</s-title>
            <s-video :list="videos"></s-video>
            <s-title :link="'job-list'">热门职位</s-title>
            <s-hunters :list="jobs"></s-hunters>
            <s-title :link="'job-list'"  :showMore="false">热门单位</s-title>
            <s-jobs :list="hunters"></s-jobs>
            <s-title :link="'personnel-list'" :query="{mode: 0}">人才列表</s-title>
            <s-talents :list="talents"></s-talents>
            <s-title :showMore="false">友情链接</s-title>
            <s-links :list="links"></s-links>
        </div>
    </div>
</template>
<script>
    import { sHeader, sSlider, sTitle } from '@/components'
    import { sNews, sLessons, sTeachers, sVideo, sHunters, sJobs, sTalents, sLinks } from './components'
    import { Toast } from 'vant'
    import { queryFriendShips,queryPoster, queryNews, queryLessons, queryTeachers, queryVideos, queryCompany, queryJobs, queryTalents } from '@/api/service'
    export default {
        name: 'home',
        data() {
            return {
                posters: [],
                newsList: [],
                lessons: [],
                teachers: [],
                videos: [],
                hunters: [],
                jobs: [],
                talents: [],
                links: []
            }
        },
        mounted() {
            this.init()
            document.querySelector('.container').addEventListener('scroll', () => {
                this.$refs['headerComp'].hideNav()
            })
        },
        methods: {
            init() {
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                })
                Promise.all([this.getFriendShips(), this.getPoster(), this.getNews(), this.getLessons(), this.getTeachers(), this.getVideos(), this.getCompany(), this.getJobs(), this.getTalents()]).then(() => {
                    setTimeout(() => {
                        Toast.clear()
                    }, 500)
                })
            },
            getFriendShips() {
                return queryFriendShips().then(res => {
                    this.links = res.list
                })
            },
            getTalents() {
                return queryTalents().then(res => {
                    this.talents = res.list
                })
            },
            getJobs() {
                return queryJobs().then(res => {
                    this.jobs = res.list
                })
            },
            getCompany() {
                return queryCompany().then(res => {
                    this.hunters = res.list
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
            sVideo,
            sHunters,
            sJobs,
            sTalents,
            sLinks
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .home {
        width: 100%;
        height: 100%;
        position: relative;
        .container {
            position: relative;
            /*top: 46px;
            left: 0;
            bottom: 0;
            right: 0;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;*/
        }
    }
</style>