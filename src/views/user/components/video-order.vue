<template>
    <div class="enterpise-baseinfo" >
        <van-tabs v-model="active">
            <van-tab :title="'我的视频'">
                <div class="video-category" v-for="(item, index) in videoList" :key="'category_' + index">
                    <div class="video-title">{{item.name}}</div>
                    <ul class="videoList">
                        <li @click="showVideoFun(v)" class="videoItem" v-for="(v, i) in item.child" :key="'category_' + index + '-video_' + i">
                            <div class="pic">
                                <img :src="v.imgUrl" :title="v.name">
                            </div>
                            <div class="description">
                                <div class="part-1">
                                    <div class="title">{{ v.name }}</div>
                                    <div class="click">{{ v.click }}</div>
                                </div>
                                <div class="part-2">{{ v.detail }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </van-tab>
            <van-tab :title="'我的订单'">
                <div class="table-box" v-for="(item, index) in myOrders" :key="'myOrders_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/resume-detail', query: {id: item.id}}">{{ item.content }}</router-link>
                    </div>
                    <div class="flex">
                        <div class="label">时间：</div>
                        <div class="value">{{ item.updateTime }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="deleteOrderById(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <van-popup v-model="showVideo" position="right" :overlay="false" style="width: 100%;height: 100%;">
            <van-nav-bar :title="videoData.name" left-text="返回" left-arrow @click-left="onClickLeft"/>
            <div class="exchange-pop_content">
                <s-video-play ref="sVideoPlayDom" :videoData="videoData"></s-video-play>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import sVideoPlay from '@/components/s-video-play'
    import { Tab, Tabs, Cell, CellGroup, Toast, Field, Button, Icon, ImagePreview, Popup, NavBar, Loading } from 'vant';
    import { queryCategory, queryVideoByCategory, queryMyOrder, deleteOrder } from '@/api/service'
    export default {
        name: 'videoOrder',
        data() {
            return  {
                active: 0,
                videoList: [],
                myOrders: [],
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
            Toast.loading('数据加载中...')
            Promise.all([this.getVideoByCategory(), this.getMyOrder()]).then(() => {
                Toast.clear()
            })
        },
        methods: {
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
            onClickLeft() {
                this.showVideo = false
                this.$refs['sVideoPlayDom'].pause()
            },
            deleteOrderById(id) {
                this.$toast.loading({duration: 0})
                deleteOrder({id, userId: this.$store.state.user.id}).then(res => {
                    if (res.success) {
                        this.getMyOrder().then(() => {
                            Toast.clear()
                        })
                    } else {
                        this.$toast.fail('订单记录删除失败')
                    }
                })
            },
            getMyOrder() {
                return queryMyOrder({id: this.$store.state.user.id}).then(res => {
                    if (res.list && res.list.length > 0) {
                        this.myOrders.splice(0, this.myOrders.length)
                        this.myOrders.push(...res.list)
                    }
                })
            },
            getVideoByCategory() {
                return queryCategory().then(res => {
                    let obj = {}
                    for (let i = 0; i < res.list.length; i++) {
                        obj = res.list[i]
                        obj.child = []
                        this.videoList.push(obj)
                        this.getVideo(res.list[i].id, i)
                    }
                })
            },
            async getVideo(id, i) {
                return await queryVideoByCategory({categoryId: id, userId: this.$store.state.user.id}).then(ret => {
                    this.videoList[i].child.push(...ret.list)
                })
            }
        },
        components: {
            sVideoPlay,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Cell.name]: Cell,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup,
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [NavBar.name]: NavBar,
            [Loading.name]: Loading,
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
    .table-box {
        border: 1px solid rgba(204, 204, 204, 0.5);
        border-radius: 5px;
        font-size: 14px;
        margin: 10px;
        padding: 5px 10px 10px;
        background-color: #FFF;
        .title {
            font-weight: bold;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
            margin-bottom: 5px;
            a {
                font-size: 14px;
                color: #ff7d7d;
            }
        }
        .flex {
            display: flex;
            line-height: 22px;
            .label {
                width: 80px;
            }
            .value {
                flex: 1;
                word-wrap: break-word;
                word-break: break-all;
                .button {
                    border: 1px solid #CCC;
                    border-radius: 5px;
                    padding: 0 4px;
                    font-size: 12px;
                    display: inline-block;
                    height: 22px;
                    line-height: 20px;
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .enterpise-baseinfo {
        height: 100%;
    }
    .video-title {
        font-size: 14px;
        padding: 8px 10px;
        background-color: #fbfbfb;
        font-weight: bold;
        color: #f95353;
    }
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
</style>
<style rel="stylesheet/scss" lang="scss">
    .enterpise-baseinfo {
        .van-nav-bar__text {
            color: #333;
        }
        .van-icon {
            color: #333;
        }
        .van-tabs__wrap {
            top: -1px;
        }
        .van-tabs {
            height: 100%;
        }
        .van-tabs__content {
            height: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>