<template>
    <Layout :title="'教师详情'">
        <div class="teacher-detail">
            <div class="flex">
                <div class="left">
                    <div class="pic" :style="{backgroundImage: 'url(' + data.imgUrl + ')'}"></div>
                </div>
                <div class="right">
                    <div class="name">{{ data.name }}</div>
                    <div class="flex">
                        <div class="label">学科</div>
                        <div class="value">{{ data.category }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">描述</div>
                        <div class="value">{{ data.des }}</div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    // import { queryTeacherDetail } from '@/api/service'
    import { Toast } from 'vant';
    export default {
        name: 'lessonDetail',
        data() {
            return {
                detail: ''
            }
        },
        mounted() {
            // this.getLessonDetail(this.$route.query.id)
        },
        methods: {
            getLessonDetail(id) {
                Toast.loading()
                // queryTeacherDetail({ id: id }).then((res) => {
                //     Toast.clear()
                //     this.detail = res.data
                // }).catch(() => {
                //     Toast.clear()
                // })
            }
        },
        components: {
            Layout
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .teacher-detail {
        width: 100%;
        padding: 10px;
        .flex {
            display: flex;
            .left {
                width: 80px;
            }
            right {
                flex: 1;
            }
            .label {
                width: 30px;
            }
            .value {
                flex: 1;
            }
        }
    }
</style>