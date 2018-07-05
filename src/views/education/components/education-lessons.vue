<template>
    <div class="education-lessons">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <ul class="lessonList">
                <li class="lessonItem" v-for="item in list" :key="item.id + '-lesson-' + category">
                    <div class="lessonItem-l name">{{ item.name }}</div>
                    <div class="lessonItem-l openDate"><span class="label">开&nbsp;&nbsp;班&nbsp;&nbsp;时&nbsp;&nbsp;间：</span>{{ item.openDate }}</div>
                    <div class="lessonItem-l classHour"><span class="label">课&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时：</span>{{ item.classHour }}</div>
                    <div class="lessonItem-l tranningFee"><span class="label">培&nbsp;&nbsp;训&nbsp;&nbsp;费&nbsp;&nbsp;用：</span>{{ item.tranningFee }}</div>
                    <div class="lessonItem-l examinationFee"><span class="label">考试及资料费：</span>{{ item.examinationFee }}</div>
                    <div class="lessonItem-l totalFee"><span class="label">合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计：</span>{{ item.totalFee }}</div>
                </li>
            </ul>
        </van-list>
    </div>
</template>
<script>
    import { queryLessonByCategory } from '@/api/service'
    import { List } from 'vant';
    export default {
        props: {
            category: {
                type: Number,
                default: null
            }
        },
        name: 'educationLessons',
        data() {
            return {
                queryOptions: {
                    pageNum: 0,
                    pageSize: 10,
                    category: null
                },
                loading: false,
                list: [],
                finished: false
            }
        },
        mounted() {
            this.queryOptions.category = this.category
        },
        methods: {
            onLoad() {
                this.loading = true
                this.queryOptions.pageNum++
                queryLessonByCategory(this.queryOptions).then(res => {
                    this.list.push(...res.list)
                    if (this.queryOptions.pageNum >= res.totalPage) {
                        this.finished = true
                    }
                    this.loading = false
                })
            }
        },
        components: {
            [List.name]: List
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .lessonList {
        margin: 0 10px;
        .lessonItem {
            border: 1px dotted #CCC;
            margin-bottom: 10px;
            width: 100%;
            display: block;
            padding: 8px;
            font-size: 13px;
            line-height: 22px;
            color: #666;
            border-radius: 4px;
            .name {
                color: #666;
                font-size: 15px;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px dotted #CCC;
                margin-bottom: 5px;
            }
            .lessonItem-l {
                .label {
                    color: #CCC;
                    display: inline-block;
                    width:95px;
                    text-align: right;
                }
            }
            &:first-child {
                margin-top: 10px
            }
        }
    }
</style>