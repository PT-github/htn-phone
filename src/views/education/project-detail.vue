<template>
    <Layout :title="'项目详情'">
        <div class="news-detail">
            <div class="title">{{title}}</div>
            <div class="content" v-html="content"></div>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryProjectDetail } from '@/api/service'
    import { Toast } from 'vant';
    export default {
        name: 'projectDetail',
        data() {
            return {
                title: '',
                content: ''
            }
        },
        mounted() {
            this.getProjectDetail(this.$route.query.id)
        },
        methods: {
            getProjectDetail(id) {
                Toast.loading()
                queryProjectDetail({ id: id }).then((res) => {
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
        width: 100%;
        background-color: #FFF;
        padding: 10px;
        .title {
            padding-bottom: 20px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
        }
    }
</style>