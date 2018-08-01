<template>
    <div class="enterpise-baseinfo" >
        <van-tabs v-model="active">
            <van-tab :title="'职位管理'">
                <div class="table-box" v-for="(item, index) in jobList" :key="'job-list_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/job-detail', query: {id: item.id}}">{{ item.job }}</router-link></div>
                    <div class="flex">
                        <div class="label">浏览：</div>
                        <div class="value">{{ item.lookNums }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">应聘：</div>
                        <div class="value">{{ item.applyNums }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">状态：</div>
                        <div class="value">{{ item.status }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">发布日期：</div>
                        <div class="value">{{ item.pubTime }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <template v-if="item.statusCode === 1">
                                <span @click="refreshJob(item.id)">刷新</span>
                            </template>
                            <template v-if="item.statusCode === 0 || item.statusCode === 2">
                                <span @click="publishJob(item.id)">发布</span>
                            </template>
                            <template v-if="item.statusCode === 1">
                                <span @click="revokeJob(item.id)">撤回</span>
                            </template>
                            <span @click="deleteJob(item.id)">删除</span>
                        </div>
                    </div>
                </div>
                <div class="add-btn">
                    <router-link tag="a" :to="'/add-job'">+</router-link>
                </div>
            </van-tab>
            <van-tab :title="'面试邀请'">
                <div class="table-box" v-for="(item, index) in interviewList" :key="'interview-list_' + index">
                    <div class="title">
                        {{ item.name }}</div>
                    <div class="flex">
                        <div class="label">职位：</div>
                        <div class="value">{{ item.job }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">状态：</div>
                        <div class="value">{{ item.status }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">面试日期：</div>
                        <div class="value">{{ item.interviewTime }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="deleteInterview(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'简历收藏记录'">
                <div class="table-box" v-for="(item, index) in collectList" :key="'interview-list_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/resume-detail', query: {id: item.id}}">{{ item.resumeName }}</router-link></div>
                    <div class="flex">
                        <div class="label">姓名：</div>
                        <div class="value">{{ item.name }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="deleteCollect(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
    import { Tab, Tabs, Toast, Field, Button } from 'vant';
    import { deleteInterviewById, deleteCollectById, queryCollectList, queryInterviewList, queryPubJobs, refreshCompanyJob, publishCompanyJob, revokeCompanyJob, deleteCompanyJob } from '@/api/service'
    export default {
        name: 'jobInterviewMan',
        data() {
            return  {
                active: 0,
                jobList: [],
                interviewList: [],
                collectList: []
            }
        },
        mounted() {
            Toast.loading('加载中...')
            Promise.all([this.getPubJobs(), this.getInterviewList(), this.getCollectList()]).then(() => {
                this.$nextTick(() => {
                    Toast.clear()
                })
            })
        },
        methods: {
            deleteCollect(id) {
                this.$toast.loading()
                deleteCollectById({id}).then(res => {
                    if (res.success) {
                        this.$toast('取消收藏职位成功')
                        setTimeout(() => {
                            this.getCollectList()
                        }, 500)
                    } else {
                        this.$toast('取消收藏职位失败')
                    }
                })
            },
            deleteInterview(id) {
                this.$toast.loading()
                deleteInterviewById({id}).then(res => {
                    if (res.success) {
                        this.$toast('面试记录删除成功')
                        setTimeout(() => {
                            this.getInterviewList()
                        }, 500)
                    } else {
                        this.$toast('面试记录删除失败')
                    }
                })
            },
            publishJob(id) {
                this.$toast.loading()
                publishCompanyJob({id}).then(res => {
                    if (res.success) {
                        this.$toast('职位发布成功')
                        setTimeout(() => {
                            this.getData()
                        }, 500)
                    } else {
                        this.$toast('职位发布失败')
                    }
                })
            },
            revokeJob(id) {
                this.$toast.loading()
                revokeCompanyJob({id}).then(res => {
                    if (res.success) {
                        this.$toast('职位撤回成功')
                        setTimeout(() => {
                            this.getData()
                        }, 500)
                    } else {
                        this.$toast('职位撤回失败')
                    }
                })
            },
            deleteJob(id) {
                this.$toast.loading()
                deleteCompanyJob({id}).then(res => {
                    if (res.success) {
                        this.$toast('职位删除成功')
                        setTimeout(() => {
                            this.getData()
                        }, 500)
                    } else {
                        this.$toast('职位删除失败')
                    }
                })
            },
            refreshJob(id) {
                this.$toast.loading()
                refreshCompanyJob({id}).then(res => {
                    Toast.clear()
                    if (res.success) {
                        this.$toast('职位刷新成功')
                        setTimeout(() => {
                            this.getData()
                        }, 500)
                    } else {
                        this.$toast('职位刷新失败')
                    }

                })
            },
            getInterviewList() {
                return queryInterviewList({id: this.$store.state.user.id}).then(res => {
                    this.interviewList.splice(0, this.interviewList.length)
                    this.interviewList.push(...res.list)
                })
            },
            getCollectList() {
                return queryCollectList({id: this.$store.state.user.id}).then(res => {
                    this.collectList.splice(0, this.collectList.length)
                    this.collectList.push(...res.list)
                })
            },
            getPubJobs() {
                return queryPubJobs({
                    id: this.$store.state.user.id
                }).then(res => {
                    this.jobList.splice(0, this.jobList.length)
                    if (res.list && res.list.length > 0) {
                        this.jobList.push(...res.list)
                    }
                })
            },
        },
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Field.name]: Field,
            [Button.name]: Button,
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .enterpise-baseinfo {
        height: 100%;
        .add-btn {
            background-color: #f44;
            width: 35px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            border-radius: 100px;
            position: fixed;
            right: 30px;
            bottom: 75px;
            a {
                color: #FFF;
                font-size: 30px;
            }
        }
        .table-box {
            border: 1px solid rgba(204, 204, 204, 0.5);
            border-radius: 5px;
            font-size: 14px;
            margin: 10px;
            padding: 5px 10px 10px;
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
        .submit {
            .van-button--small {
                width: 94%;
                margin: 10px 3%;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .enterpise-baseinfo {
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
            background-color: #FFF;
        }
    }
</style>