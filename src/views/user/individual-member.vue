<template>
    <Layout class="member-center" :title="'个人会员'" :rightText="'退出'" @onClickRight="onClickRight" :showRightText="true">
        <div class="member-center_content">
            <router-view></router-view>
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop">基本信息</van-tabbar-item>
            <van-tabbar-item icon="records">简历/职位管理</van-tabbar-item>
            <van-tabbar-item icon="gold-coin">视频/订单</van-tabbar-item>
            <van-tabbar-item icon="chat" :info="info">站内信</van-tabbar-item>
        </van-tabbar>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryCounts} from '@/api/service'
    import { Toast, Tabbar, TabbarItem } from 'vant'
    export default {
        name: 'individualMember',
        watch: {
            active(v) {
                if (v === 1) {
                    this.$router.push('/individual-member/talent-work')
                } else if (v === 2) {
                    this.$router.push('/individual-member/video-order')
                } else if (v === 3) {
                    this.$router.push({path: '/individual-member/website-mail', query: {count: this.count}})
                    this.$nextTick(() => {
                        this.count = 0
                    })
                } else if (v === 0) {
                    this.$router.push('/individual-member/individual-baseinfo')
                }
            },
            '$route.path': function() {
                if (this.$route.path.indexOf('individual-baseinfo') !== -1) {
                    this.active = 0
                } else if (this.$route.path.indexOf('talent-work') !== -1) {
                    this.active = 1
                } else if (this.$route.path.indexOf('video-order') !== -1) {
                    this.active = 2
                } else {
                    this.active = 3
                }
            }
        },
        computed: {
            info() {
                return this.count > 0 ? this.count : ''
            }
        },
        data() {
            return {
                active: 0,
                timer: null,
                count: 0
            }
        },
        mounted() {
            if (this.$route.path.indexOf('individual-baseinfo') !== -1) {
                this.active = 0
            } else if (this.$route.path.indexOf('talent-work') !== -1) {
                this.active = 1
            } else if (this.$route.path.indexOf('video-order') !== -1) {
                this.active = 2
            } else {
                this.active = 3
            }
            this.getCounts()
        },
        methods: {
            getCounts() {
                this.timer = setInterval(() => {
                    if (this.$store.state.user.id) {
                        queryCounts(this.$store.state.user.id).then(res => {
                            console.log(res)
                            this.count = res.data.count
                            if (res.data.count > 0) {
                                this.$store.dispatch('setCount', true)
                            }
                        })
                    } else {
                        clearInterval(this.timer)
                    }
                }, 5000)
            },
            onClickRight() {
                clearInterval(this.timer)
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

