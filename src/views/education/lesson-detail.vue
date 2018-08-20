<template>
    <Layout :title="'课程详情'">
        <div class="news-detail">
            <div class="title">{{title}}</div>
            <div class="content" v-html="content"></div>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryLessonDetail } from '@/api/service'
    import { Toast } from 'vant';
    export default {
        name: 'lessonDetail',
        data() {
            return {
                title: '',
                content: ''
            }
        },
        mounted() {
            this.getLessonDetail(this.$route.query.id)
        },
        methods: {
            getLessonDetail(id) {
                Toast.loading()
                queryLessonDetail({ id: id }).then((res) => {
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

<style rel="stylesheet/scss" lang="scss">
  img { width: 100%; }
</style>
