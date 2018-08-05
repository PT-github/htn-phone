<template>
    <div class="lesson-video">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <ul class="videoList">
                <li class="videoItem" @click="showVideoFun(item)" v-for="item in list" :key="item.id + '-video-' + category">
                    <div class="pic">
                        <img :src="item.imgUrl" :alt="item.name">
                    </div>
                    <div class="description">
                        <div class="part-1">
                            <div class="title">{{ item.name }}</div>
                            <div class="click">{{ item.click }}</div>
                        </div>
                        <div class="part-2">{{ item.detail }}</div>
                    </div>
                </li>
            </ul>
        </van-list>
        <van-popup v-model="showVideo" position="right" :overlay="false" style="width: 100%;height: 100%;">
            <van-nav-bar :title="videoData.name" left-text="返回" left-arrow @click-left="onClickLeft"/>
            <div class="exchange-pop_content">
                <s-video-play ref="sVideoPlayDom" :videoData="videoData"></s-video-play>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import { queryVideoByCategory } from '@/api/service'
    import { List, NavBar, Popup } from 'vant';
    import sVideoPlay from '@/components/s-video-play'
    export default {
        props: {
            category: {
                type: Number,
                default: null
            }
        },
        name: 'lessonVideo',
        data() {
            return {
                queryOptions: {
                    pageNum: 0,
                    pageSize: 10,
                    category: null
                },
                loading: false,
                list: [],
                finished: false,
                showVideo: false,
                videoData: {
                    videoUrl: '',
                    videoPic: '',
                    name: '',
                    click: '',
                    detail: ''
                }
            }
        },
        mounted() {
            this.queryOptions.category = this.category
        },
        methods: {
            onClickLeft() {
                this.showVideo = false
                this.$refs['sVideoPlayDom'].pause()
            },
            showVideoFun(item) {
                console.log(item)
                this.videoData.videoUrl = item.videoUrl
                this.videoData.videoPic = item.videoPic
                this.videoData.name = item.name
                this.videoData.click = item.click
                this.videoData.detail = item.detail
                this.$nextTick(() => {
                    this.showVideo = true
                })
            },
            onLoad() {
                console.log('===' + this.queryOptions.pageNum)
                this.loading = true
                this.queryOptions.pageNum++
                queryVideoByCategory(this.queryOptions).then(res => {
                    this.list.push(...res.list)
                    if (this.queryOptions.pageNum >= res.totalPage) {
                        this.finished = true
                    }
                    this.loading = false
                })
            }
        },
        components: {
            [List.name]: List,
            [Popup.name]: Popup,
            [NavBar.name]: NavBar,
            sVideoPlay
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
                            width: 40px;
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