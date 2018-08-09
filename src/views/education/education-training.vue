<template>
    <Layout class="education-training" :title="'教育培训'" @onClickRight="onClickRight" :rightText="'报名'" :showRightText="true">
        <div class="lessons-box" v-show="active === 0">
            <van-tabs v-model="lessonActive">
                <van-tab v-for="item in category" :title="item.name" :key="'category' + item.id">
                    <education-lessons :category="item.id"></education-lessons>
                </van-tab>
            </van-tabs>
        </div>
        <div class="project-box" v-show="active === 1">
            <ul class="projectList">
                <li class="projectList-li" v-for="item in projects" :key="'project' + item.id">
                    <router-link tag="a" :to="{ path: '/project-detail', query: {id: item.id} }">{{ item.name }}</router-link>
                </li>
            </ul>
        </div>
        <div class="video-box" v-show="active === 2">
            <van-tabs v-model="videoActive">
                <van-tab v-for="item in videoCategory" :title="item.name" :key="'video-category' + item.id">
                    <lesson-video :category="item.id"></lesson-video>
                </van-tab>
            </van-tabs>
        </div>
        <div class="project-box" v-if="active === 3">
            <education-teacher></education-teacher>
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="cart">课程培训</van-tabbar-item>
            <van-tabbar-item icon="exchange">培训项目</van-tabbar-item>
            <van-tabbar-item icon="play">培训视频</van-tabbar-item>
            <van-tabbar-item icon="contact">培训老师</van-tabbar-item>
        </van-tabbar>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { Tabbar, TabbarItem, Tab, Tabs, Toast } from 'vant';
    import { educationLessons, lessonVideo, educationTeacher } from './components';
    import { queryLessonCategory, queryProject, queryCategory } from '@/api/service'
    export default {
        name: 'educationTraining',
        data() {
            return {
                active: 0,
                category: [],
                lessonActive: 0,
                projects: [],
                videoActive: 0,
                videoCategory: []
            }
        },
        watch: {
            active(v) {
                if (v === 0 && this.category.length === 0) {
                    this.getCategory()
                } else if (v === 1 && this.projects.length === 0) {
                    this.getProject()
                } else if (v === 2 && this.videoCategory.length === 0) {
                    this.getVideoCategory()
                }
            }
        },
        mounted() {
            this.active = this.$route.query.mode ? parseInt(this.$route.query.mode) : 0
            console.log(this.active)
            if (this.active === 0 && this.category.length === 0) {
                this.getCategory()
            } else if (this.active === 1 && this.projects.length === 0) {
                this.getProject()
            } else if (this.active === 2 && this.videoCategory.length === 0) {
                this.getVideoCategory()
            }
        },
        methods: {
            onClickRight() {
                this.$router.push({path: '/signUp-online'})
            },
            getVideoCategory() {
                Toast.loading()
                queryCategory().then(res => {
                    Toast.clear()
                    this.videoCategory = res.list
                }).catch(error => {
                    Toast.clear();
                    console.log('获取视频分类接口失败', error.message)
                })
            },
            getProject() {
                Toast.loading()
                queryProject().then(res => {
                    Toast.clear()
                    this.projects = res.list
                }).catch(error => {
                    Toast.clear();
                    console.log('获取培训项目接口失败', error.message)
                })
            },
            getCategory() {
                queryLessonCategory().then(response => {
                    if (response.success) {
                        this.category.push(...response.list)
                    }
                })
            }
        },
        components: {
            educationLessons,
            educationTeacher,
            lessonVideo,
            Layout,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .projectList {
        .projectList-li {
            display: block;
            margin: 0 10px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            border-bottom: 1px solid #CCC;
            padding-left: 6px;
            a {
                display: block;
                color: #333;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .education-training {
        .layout-concent {
            padding-bottom: 46px;
        }
    }
</style>
