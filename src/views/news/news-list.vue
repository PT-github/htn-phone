<template>
    <Layout class="news-list" :title="title">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="news-detail">
            <van-list v-model="loading" :finished="finished" @load="getData" >
                <s-news-list :list="list"></s-news-list>
            </van-list>
        </van-pull-refresh>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryNewsListByCategory } from '@/api/service'
    import { sNewsList } from './components'
    import { PullRefresh, List } from 'vant'
    export default {
        name: 'newsList',
        computed: {
            title() {
                return this.$route.query.title
            },
            category() {
                return this.$route.query.category
            }
        },
        data() {
            return {
                list: [],
                isLoading: false,
                loading: false,
                finished: false,
                pageNum: 0,
                pageSize: 10
            }
        },
        methods: {
            onRefresh() {
                this.pageNum = 0
                this.finished = false
                this.list.splice(0, this.list.length)
                this.getData()
            },
            getData() {
                this.loading = true
                this.pageNum++
                console.log(JSON.stringify({pageNo: this.pageNum, pageSize: this.pageSize, category: this.category}))
                queryNewsListByCategory({pageNo: this.pageNum, pageSize: this.pageSize, category: this.category}).then(res => {
                    if (res.list.length > 0) {
                        this.list.push(...res.list)
                    } else {
                        this.finished = true
                    }
                    if (res.totalPage === this.pageNum) {
                        this.finished = true
                    }
                    this.isLoading = false
                    this.loading = false
                })
            }
        },
        components: {
            Layout,
            [PullRefresh.name]: PullRefresh,
            [List.name]: List,
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

