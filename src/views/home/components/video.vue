<template>
    <div class="video lr" v-if="list.length > 0">
        <div class="flex">
            <div class="video-item" @click="showVideoFun(item)" v-for="(item, index) in list" :key="'s-video' + index">
                <div class="pic">
                    <img :src="item.imgUrl" :alt="item.name">
                </div>
                <div class="title">{{ item.name }}</div>
            </div>
        </div>
        <van-popup v-model="showVideo" position="right" :overlay="false" style="width: 100%;height: 100%;">
            <van-nav-bar :title="videoData.name" left-text="返回" left-arrow @click-left="onClickLeft"/>
            <div class="exchange-pop_content">
                <s-video-play ref="sVideoPlayDom" :videoData="videoData"></s-video-play>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import {Popup, NavBar} from 'vant';
    import sVideoPlay from '@/components/s-video-play'
    export default {
        name: 'sVideo',
        props: {
            list: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
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
            }
        },
        components: {
            [Popup.name]: Popup,
            [NavBar.name]: NavBar,
            sVideoPlay
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .exchange-pop_content {
        position: absolute;
        top: 46px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .video {
        margin-top: 10px;
        .flex {
            display: flex;
            .video-item {
                flex: 1;
                &:first-child {
                    margin-right: 10px;
                }
                .title {
                    text-align: center;
                    color: #515151;
                    font-size: 10px;
                    line-height: 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .pic {
                    width: 100%;
                    height: 133px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

