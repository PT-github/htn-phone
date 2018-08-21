<template>
    <Layout class="news-list" :title="'新闻中心'">
        <div class="news-detail">
            <s-slider :list="banners"></s-slider>
            <s-title :link="'news-list'" :query="query">工作动态</s-title>
            <s-news-list :list="workDynamics"></s-news-list>
            <s-title :link="'news-list'" :query="query2">通知公告</s-title>
            <s-news-list :list="NoticeList"></s-news-list>
            <s-title :link="'news-list'" :query="query3">行业资讯</s-title>
            <s-news-list :list="IndustryInfos"></s-news-list>
            <s-title :link="'news-list'" :query="query4">政策法规</s-title>
            <s-news-list :list="PoliticalAndRegulations"></s-news-list>
            <s-title :link="'news-list'" :query="query5">培训风采</s-title>
            <s-news-list :list="TrainingAndDemeanor"></s-news-list>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { sSlider, sTitle } from '@/components'
    import { queryTrainingAndDemeanor, queryPoliticalAndRegulations, queryIndustryInfos, queryNoticeList, queryWorkDynamics, queryLatestNews } from '@/api/service'
    import { sNewsList } from './components'
    import { Toast } from 'vant'
    export default {
        name: 'newsHome',
        data() {
            return {
                banners: [],
                workDynamics: [],
                TrainingAndDemeanor: [],
                PoliticalAndRegulations: [],
                IndustryInfos: [],
                NoticeList: [],
                query: {
                    title: '工作动态',
                    category: 1
                },
                query2: {
                    title: '通知公告',
                    category: 2
                },
                query3: {
                    title: '行业资讯',
                    category: 3
                },
                query4: {
                    title: '政策法规',
                    category: 4
                },
                query5: {
                    title: '培训风采',
                    category: 5
                }
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
                Promise.all([this.getTrainingAndDemeanor(), this.getPoliticalAndRegulations(), this.getIndustryInfos(), this.getNoticeList(), this.getWorkDynamics(), this.getBanners()]).then(() => {
                    setTimeout(() => {
                        Toast.clear()
                    }, 500)
                })
            },
            getNoticeList() {
                return queryNoticeList().then(res => {
                    this.NoticeList = res.list
                })
            },
            getIndustryInfos() {
                return queryIndustryInfos().then(res => {
                    this.IndustryInfos = res.list
                })
            },
            getPoliticalAndRegulations() {
                return queryPoliticalAndRegulations().then(res => {
                    this.PoliticalAndRegulations = res.list
                })
            },
            getTrainingAndDemeanor() {
                return queryTrainingAndDemeanor().then(res => {
                    this.TrainingAndDemeanor = res.list
                })
            },
            getWorkDynamics() {
                return queryWorkDynamics().then(res => {
                    this.workDynamics = res.list
                })
            },
            getBanners() {
                return queryLatestNews().then(res => {
                    this.banners = res.list
                })
            }
        },
        components: {
            Layout,
            sSlider,
            sTitle,
            sNewsList
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .news-list {

    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

