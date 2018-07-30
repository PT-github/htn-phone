<template>
    <Layout class="member-center" :title="'企业会员'" :rightText="'退出'" @onClickRight="onClickRight" :showRightText="true">
        <div class="member-center_content">
            <router-view></router-view>
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop">基本信息</van-tabbar-item>
            <van-tabbar-item icon="records">职位/面试管理</van-tabbar-item>
            <van-tabbar-item icon="gold-coin">企业人才库</van-tabbar-item>
            <van-tabbar-item icon="chat" info="20">站内信</van-tabbar-item>
        </van-tabbar>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryTrainingAndDemeanor, queryPoliticalAndRegulations, queryIndustryInfos, queryNoticeList, queryWorkDynamics, queryLatestNews } from '@/api/service'
    import { Toast, Tabbar, TabbarItem } from 'vant'
    export default {
        name: 'individualMember',
        watch: {
            active(v) {
                if (v === 1) {
                    this.$router.push('/enterpise-member/job-interview-man')
                }
            }
        },
        data() {
            return {
                active: 0
            }
        },
        mounted() {

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
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .member-center_content {
        height: calc(100% - 50px);
        /*
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;*/
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

