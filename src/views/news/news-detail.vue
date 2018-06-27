<template>
    <Layout :title="'新闻详情'">
        <div class="news-detail lr">
            <div class="title">{{title}}</div>
            <div class="content" v-html="content"></div>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryNewsDetail } from '@/api/service'
    import { Toast } from 'vant'
    export default {
        name: 'newsDetail',
        computed: {
            newsId() {
                return this.$route.params.newsId
            }
        },
        data() {
            return {
                title: '',
                content: ''
            }
        },
        mounted() {
            this.getNewsDetail(this.$route.query.id)
        },
        methods: {
            getNewsDetail() {
                Toast.loading()
                queryNewsDetail({ id: this.newsId }).then((res) => {
                    Toast.clear()
                    this.title = res.data.title
                    this.content = res.data.content
                }).catch(() => {
                    Toast.clear()
                })
            }
        },
        components: {
            Layout
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .news-detail {
        .title {
            font-size: 16px !important;;
            color: #333 !important;;
            text-align: center !important;;
            line-height: 50px !important;;
            font-weight: bold !important;;
        }
        .content {
            font-size: 14px !important;
            color: #666 !important;;
            line-height: 25px !important;;
            img {
                max-width: 100% !important;
                display: block;
                margin: 0 auto;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

