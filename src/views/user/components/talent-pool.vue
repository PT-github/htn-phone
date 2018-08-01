<template>
    <div class="enterpise-baseinfo" >
        <van-tabs v-model="active">
            <van-tab :title="'应聘记录'">
                <div class="table-box" v-for="(item, index) in applyRecordList" :key="'applyRecordList_' + index">
                    <div class="title">
                        {{ item.name }}
                    </div>
                    <div class="flex">
                        <div class="label">应聘职位：</div>
                        <div class="value">{{ item.job }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">应聘时间：</div>
                        <div class="value">{{ item.date }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">状态：</div>
                        <div class="value">{{ item.status }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="deleteApply(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'自有人才库'">
                <div class="table-box" v-for="(item, index) in ownTalentList" :key="'ownTalentList_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/resume-detail', query: {id: item.id}}">{{ item.name }}</router-link></div>
                    <div class="flex">
                        <div class="label">学历：</div>
                        <div class="value">{{ item.education }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">经验：</div>
                        <div class="value">{{ item.workExperience }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">状态：</div>
                        <div class="value">{{ item.status }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="deleteOwnTalant(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'网站人才库'">
                <div class="table-box" v-for="(item, index) in netWorkTalentList" :key="'netWorkTalentList-list_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/resume-detail', query: {id: item.id}}">{{ item.name }}</router-link></div>
                    <div class="flex">
                        <div class="label">学历：</div>
                        <div class="value">{{ item.education }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">经验：</div>
                        <div class="value">{{ item.workExperience }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">状态：</div>
                        <div class="value">{{ item.status }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="deleteNetWorkTalent(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
    import { Tab, Tabs, Toast, Field, Button } from 'vant';
    import { deleteNetWorkTalentList, deleteOwnTalentList, deleteApplyRecordList, queryApplyRecordList, queryOwnTalentList, queryNetWorkTalentList } from '@/api/service'
    export default {
        name: 'talentPool',
        data() {
            return  {
                active: 0,
                applyRecordList: [],
                ownTalentList: [],
                netWorkTalentList: []
            }
        },
        mounted() {
            Toast.loading('加载中...')
            Promise.all([this.getApplyRecordList(), this.getOwnTalentList(), this.getNetWorkTalentList()]).then(() => {
                this.$nextTick(() => {
                    Toast.clear()
                })
            })
        },
        methods: {
            deleteApply(id) {
                this.$toast.loading()
                deleteApplyRecordList({id}).then(res => {
                    if (res.success) {
                        this.$toast('删除应聘记录成功')
                        setTimeout(() => {
                            this.getApplyRecordList()
                        }, 500)
                    } else {
                        this.$toast('删除应聘记录失败')
                    }
                })
            },
            deleteOwnTalant(id) {
                this.$toast.loading()
                deleteOwnTalentList({id}).then(res => {
                    if (res.success) {
                        this.$toast('自有人才库删除成功')
                        setTimeout(() => {
                            this.getOwnTalentList()
                        }, 500)
                    } else {
                        this.$toast('自有人才库删除失败')
                    }
                })
            },
            deleteNetWorkTalent(id) {
                this.$toast.loading()
                deleteNetWorkTalentList({id}).then(res => {
                    if (res.success) {
                        this.$toast('网站人才库删除成功')
                        setTimeout(() => {
                            this.getNetWorkTalentList()
                        }, 500)
                    } else {
                        this.$toast('网站人才库删除失败')
                    }
                })
            },
            getApplyRecordList() {
                return queryApplyRecordList({id: this.$store.state.user.id}).then(res => {
                    this.applyRecordList.splice(0, this.applyRecordList.length)
                    this.applyRecordList.push(...res.list)
                })
            },
            getOwnTalentList() {
                return queryOwnTalentList({id: this.$store.state.user.id}).then(res => {
                    this.ownTalentList.splice(0, this.ownTalentList.length)
                    this.ownTalentList.push(...res.list)
                })
            },
            getNetWorkTalentList() {
                return queryNetWorkTalentList({
                    id: this.$store.state.user.id
                }).then(res => {
                    this.netWorkTalentList.splice(0, this.netWorkTalentList.length)
                    this.netWorkTalentList.push(...res.list)
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