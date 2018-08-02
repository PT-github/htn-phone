<template>
    <div class="enterpise-baseinfo" >
        <van-tabs v-model="active">
            <van-tab :title="'基本信息'">
                <van-cell-group :border="false">
                    <van-cell title="登录名" :value="userInfo.account" />
                    <van-cell title="昵称" :value="userInfo.nickname"/>
                    <van-cell title="头像" @click="showPic(userInfo.imgUrl)">
                        <van-icon slot="right-icon" name="browsing-history" class="van-cell__right-icon" />
                    </van-cell>
                    <van-cell title="真实姓名" :value="userInfo.truename"/>
                    <van-cell title="生日" :value="userInfo.birth"/>
                    <van-cell title="手机" :value="userInfo.tel"/>
                    <van-cell title="手机是否验证" :value="userInfo.telIsValidate === 1 ? '是' : '否'"/>
                    <van-cell title="邮箱" :value="userInfo.mail"/>
                    <van-cell title="邮箱是否验证" :value="userInfo.mailIsValidate === 1 ? '是' : '否'"/>
                    <van-cell title="是否绑定微信" :value="userInfo.bindMxChat === 1 ? '是' : '否'"/>
                    <van-cell title="我的邀请码" :value="userInfo.invitedCode"/>
                </van-cell-group>
            </van-tab>
            <van-tab :title="'我的积分'" style="background-color: #FFF;">
                <van-cell-group>
                    <van-cell title="当前积分" :value="totalIncome">
                        <van-icon slot="right-icon" @click="showExchangePopup" name="exchange-record" class="van-cell__right-icon" />
                    </van-cell>
                    <van-cell title="兑换明细" value="查看" @click="showExchangeRecord"/>
                </van-cell-group>
            </van-tab>
            <van-tab :title="'我的收益'">
                <van-cell-group>
                    <van-cell title="总收益" :value="incomeObj.totalIncome" >
                        <van-icon slot="right-icon" @click="showIncomeRecord(0)" name="browsing-history" class="van-cell__right-icon" />
                    </van-cell>
                    <van-cell title="本季度收益" :value="incomeObj.currentIncome">
                        <van-icon slot="right-icon" @click="showIncomeRecord(1)" name="browsing-history" class="van-cell__right-icon" />
                    </van-cell>
                    <van-cell title="当前级别" :value="incomeObj.level"/>
                </van-cell-group>
            </van-tab>
        </van-tabs>
        <van-popup v-model="showExchange" position="right" :overlay="false" style="width: 100%;height: 100%;">
            <van-nav-bar title="兑换记录" left-text="返回" left-arrow @click-left="onClickLeft"/>
            <div class="exchange-pop_content">
                <div class="table-box" v-for="(item, index) in scoreList" :key="'scoreList_' + index">
                    <div class="title">
                        兑换时间：{{ item.time }}
                    </div>
                    <div class="flex">
                        <div class="label">积分描述：</div>
                        <div class="value">{{ item.des }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">兑换积分：</div>
                        <div class="value">{{ item.score }}</div>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="showExchangeProduct" position="right" style="width: 100%;height: 100%;z-index: 100" :overlay="false">
            <van-nav-bar title="可兑换商品" left-text="返回" left-arrow @click-left="onClickLeft"/>
            <div class="exchange-pop_content">
                <template v-if="show">
                    <van-loading color="black" type="spinner" :size="'20px'" style="display:block;margin: 10px auto;"/>
                </template>
                <div class="table-box" v-show="!show" v-for="(item, index) in lessionList" :key="'lessionList_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/lesson-detail', query: {id: item.id}}">{{ item.name }}</router-link>
                    </div>
                    <div class="flex">
                        <div class="label">开班时间：</div>
                        <div class="value">{{ item.openDate }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">课时：</div>
                        <div class="value">{{ item.classHour }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">积分：</div>
                        <div class="value">{{ item.score }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="exchangeLessonFun(item.id, item.score)">兑换</span>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="showIncome" position="right" style="width: 100%;height: 100%;z-index: 100" :overlay="false">
            <van-nav-bar title="收益明细" left-text="返回" left-arrow @click-left="onClickLeft"/>
            <div class="exchange-pop_content">
                <template v-if="showIncomeLoading">
                    <van-loading color="black" type="spinner" :size="'20px'" style="display:block;margin: 10px auto;"/>
                </template>
                <template v-if="!showIncomeLoading">
                    <van-tabs v-model="type">
                        <van-tab title="所有">
                            <div class="table-box" v-for="(item, index) in totalIncomeList" :key="'totalIncomeList_' + index">
                                <div class="title">
                                    时间：{{ item.time }}
                                </div>
                                <div class="flex">
                                    <div class="label">收益金额：</div>
                                    <div class="value">{{ item.money }}</div>
                                </div>
                                <div class="flex">
                                    <div class="label">收益描述：</div>
                                    <div class="value">{{ item.des }}</div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="本季度">
                            <div class="table-box" v-for="(item, index) in currentIncomeList" :key="'currentIncomeList_' + index">
                                <div class="title">
                                    时间：{{ item.time }}
                                </div>
                                <div class="flex">
                                    <div class="label">收益金额：</div>
                                    <div class="value">{{ item.money }}</div>
                                </div>
                                <div class="flex">
                                    <div class="label">收益描述：</div>
                                    <div class="value">{{ item.des }}</div>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </template>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import { Tab, Tabs, Cell, CellGroup, Toast, Field, Button, Icon, ImagePreview, Popup, NavBar, Loading } from 'vant';
    import { queryMyBaseInfo, queryScore, queryScoreLessons, exchangeLesson, queryIncome, queryAllIncomeList, queryQuarterIncome } from '@/api/service'
    export default {
        name: 'enterpiseBaseinfo',
        data() {
            return  {
                active: 0,
                userInfo: {},
                scoreList: [],
                lessionList: [],
                currentIncomeList: [],
                totalIncomeList: [],
                totalIncome: 0,
                showExchange: false,
                showExchangeProduct: false,
                show: false,
                showIncome: false,
                showIncomeLoading: false,
                incomeObj: {},
                type: 0
            }
        },
        mounted() {
            Toast.loading('数据加载中...')
            Promise.all([this.getMessage(), this.getScore(), this.getIncome()]).then(() => {
                Toast.clear()
            })
        },
        methods: {
            showIncomeRecord(type) {
                this.type = type
                this.showIncome = true
                if (this.totalIncomeList.length <= 0 || this.currentIncomeList.length <= 0) {
                    this.showIncomeLoading = true
                    Promise.all([this.getAllIncomeList(), this.getQuarterIncomeList()]).then(() => {
                        this.showIncomeLoading = false
                    })
                }
            },
            getAllIncomeList() {
                return queryAllIncomeList({id: this.$store.state.user.id}).then(res => {
                    if (res.list && res.list.length > 0) {
                        this.totalIncomeList.splice(0, this.totalIncomeList.length)
                        this.totalIncomeList.push(...res.list)
                    }
                })
            },
            getQuarterIncomeList() {
                return queryQuarterIncome({id: this.$store.state.user.id}).then(res => {
                    if (res.list && res.list.length > 0) {
                        this.currentIncomeList.splice(0, this.currentIncomeList.length)
                        this.currentIncomeList.push(...res.list)
                    }
                })
            },
            getIncome() {
                return queryIncome({id: this.$store.state.user.id}).then(res => {
                    this.incomeObj = res.data
                })
            },
            showExchangePopup() {
                this.showExchangeProduct = true
                if (this.lessionList.length <= 0) {
                    this.show = true
                    this.getLessons().then(() => {
                        this.$nextTick(() => {
                            this.show = false
                        })
                    })
                }
            },
            exchangeLessonFun(id, score) {
                Toast.loading({duration: 0})
                exchangeLesson({id, userId: this.$store.state.user.id}).then(res => {
                    Toast.clear()
                    if (res.success) {
                        this.$toast('课程兑换成功')
                        this.totalIncome = this.totalIncome - score
                    } else {
                        this.$toast('课程兑换失败：' + res.message)
                    }
                })
            },
            getLessons() {
                return queryScoreLessons().then(res => {
                    this.lessionList.push(...res.list)
                })
            },
            onClickLeft() {
                this.showExchange = false
                this.showExchangeProduct = false
                this.showIncome = false
            },
            showExchangeRecord() {
                this.showExchange = true
            },
            showPic(url) {
                ImagePreview([url])
            },
            getScore() {
                return queryScore(this.$store.state.user.id).then(res => {
                    let data = res.data
                    this.totalIncome = data.totalIncome
                    this.scoreList.splice(0, this.scoreList.length)
                    this.scoreList.push(...data.scoreList)
                })
            },
            getMessage() {
                return queryMyBaseInfo(this.$store.state.user.id).then(res => {
                    this.userInfo = res.data
                })
            }
        },
        components: {
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
    .enterpise-baseinfo {
        height: 100%;
        .company-pic {
            img {
                max-width: 95%;
                display: block;
                margin: 10px auto;
            }
        }
        .submit {
            .van-button--small {
                width: 94%;
                margin: 10px 3%;
            }
        }
        .table-box-container {
            background-color: #FFF;
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
            background-color: rgba(239, 239, 239, .5);
        }
    }
</style>