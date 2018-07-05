<template>
    <div class="lesson-video">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <ul class="videoList">
                <li class="videoItem" v-for="item in list" :key="'teacher-' + item.id">
                    <div class="pic">
                        <img :src="item.imgUrl" :alt="item.name">
                    </div>
                    <div class="description">
                        <div class="part-1">
                            <div class="title">{{ item.name }}</div>
                            <div class="click">{{ item.subject }}</div>
                        </div>
                        <div class="part-2">{{ item.detail }}</div>
                    </div>
                </li>
            </ul>
        </van-list>
    </div>
</template>
<script>
    import { queryTeachersByPage } from '@/api/service'
    import { List } from 'vant';
    export default {
        name: 'educationTeacher',
        data() {
            return {
                queryOptions: {
                    pageNum: 0,
                    pageSize: 10
                },
                loading: false,
                list: [],
                finished: false
            }
        },
        methods: {
            onLoad() {
                this.loading = true
                this.queryOptions.pageNum++
                queryTeachersByPage(this.queryOptions).then(res => {
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
    .lesson-video {
        .videoList {
            padding: 8px 10px;
            .videoItem {
                display: flex;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px dotted #CCC;
                .pic {
                    width: 108px;
                    img {
                        width: 108px;
                        height: 108px;
                        display: block;
                        margin: 0;
                    }
                }
                .description {
                    flex: 1;
                    font-size: 14px;
                    margin-left: 8px;
                    .part-1 {
                        display: flex;
                        .title {
                            flex: 1;
                            font-weight: bold;
                        }
                        .click {
                            width: 100px;
                            text-align: right;
                        }
                    }
                    .part-2 {
                        margin-top: 3px;
                        text-indent: 28px;
                        word-wrap: break-word;
                        word-break: break-all;
                    }
                }
            }
        }
    }
</style>