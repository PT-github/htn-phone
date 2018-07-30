<template>
    <Layout class="news-list" :title="'个人会员'" :rightText="'退出'" @onClickRight="onClickRight">

    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryTrainingAndDemeanor, queryPoliticalAndRegulations, queryIndustryInfos, queryNoticeList, queryWorkDynamics, queryLatestNews } from '@/api/service'
    // import { sNewsList } from './components'
    import { Toast } from 'vant'
    export default {
        name: 'individualMember',
        data() {
            return {

            }
        },
        mounted() {
            this.init()
        },
        methods: {
            onClickRight() {
                Toast.loading()
                this.$store.dispatch('LogOut').then(() => {
                    Toast.clear()
                    window.location.href = '/'
                })
            }
        },
        components: {
            Layout,
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

