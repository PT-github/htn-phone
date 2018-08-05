<template>
    <Layout class="personnel-list" :title="'招揽人才'">
        <div class="personnel-selector">
            <div class="flex-auto" :class="{active: areaShow}" @click="showArea">{{ placeBelong }}</div>
            <div class="flex-auto" :class="{active: filterShow}" @click="showFilter">筛选条件</div>
        </div>
        <div class="list-box">
            <van-list v-model="loading" :finished="finished" @load="getPersons">
                <s-talents ref="talentsComp" :choosedFromTop="choosed" @choosedTalent="choosedTalent" :showCheck="true"
                           :list="list"/>
            </van-list>
        </div>
        <div class="apply all bb">
            <span class="qx" :class="{on: isSelectAll}" @click="selectAll">全选</span>
            <span class="sc bb" @click="scFun">收藏</span>
            <span class="sq" @click="applyFun">邀约面试</span>
        </div>
        <van-popup v-model="areaShow" position="bottom" :close-on-click-overlay="false">
            <van-area @cancel="hideArea" @confirm="confirmArea" :area-list="areaList" :columns-num="2" :value="value"/>
        </van-popup>
        <van-popup class="filterPopup" v-model="filterShow" position="bottom">
            <div class="filterTop clearfix">
                <div class="left" @click="cancelFilter">取消</div>
                <div class="right" @click="confirmFilter">确认</div>
            </div>
            <van-tree-select
                    :items="filters"
                    :main-active-index="mainActiveIndex"
                    :active-id="activeId"
                    @navclick="onNavClick"
                    @itemclick="onItemClick"
            />
        </van-popup>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { sTalents } from '@/views/home/components'
    import AreaList from './area';
    import {Area, Popup, TreeSelect, Toast, List} from 'vant';
    import { queryFilterOptions, queryResume, collectResumesByIds, invateInterViewByIds } from '@/api/service'

    export default {
        name: 'personnelList',
        mounted() {
            this.getFilters()
        },
        data() {
            return {
                isSelectAll: false,
                choosed: [],
                loading: false,
                finished: false,
                mainActiveIndex: 0,
                placeBelong: '归属地',
                filterShow: false,
                areaShow: false,
                value: '430100',
                queryOptions: {
                    sex: '',
                    releaseDate: '',
                    expectedSalary: '',
                    wrokLife: '',
                    education: '',
                    city: '',
                    pageNum: 0,
                    pageSize: 20,
                    mode: this.$route.query.mode
                },
                queryOptionsTemp: {
                    sex: '',
                    releaseDate: '',
                    expectedSalary: '',
                    wrokLife: '',
                    education: ''
                },
                keySets: ['sex','releaseDate','expectedSalary','wrokLife','education'],
                filters: [
                    {
                        text: '性别',
                        key: 'sex',
                        children: []
                    }, {
                        text: '发布日期',
                        key: 'releaseDate',
                        children: []
                    }, {
                        text: '期望月薪',
                        key: 'expectedSalary',
                        children: []
                    }, {
                        text: '工作年限',
                        key: 'wrokLife',
                        children: []
                    }, {
                        text: '学历',
                        key: 'education',
                        children: []
                    }
                ],
                list: []
            }
        },
        computed: {
            areaList() {
                return AreaList
            },
            activeId() {
                let id = this.queryOptionsTemp[this.keySets[this.mainActiveIndex]]
                return id ? id : 0
            }
        },
        methods: {
            applyFun() {
                if (this.choosed.length > 0) {
                    if (!this.$store.state.user.isLogin) {
                        Toast('请先登录')
                        setTimeout(() =>{
                            this.$router.push('/login')
                        }, 500)
                        return;
                    }
                    Toast.loading()
                    invateInterViewByIds({ids: this.choosed.join(','), userId: this.$store.state.user.id}).then(res => {
                        Toast.clear()
                        if (res.success) {
                            Toast('邀约面试成功')
                        } else {
                            Toast('邀约面试失败')
                        }
                    })
                } else {
                    Toast('请至少选择一份简历')
                }
            },
            scFun() {
                if (this.choosed.length > 0) {
                    if (!this.$store.state.user.isLogin) {
                        Toast('请先登录')
                        setTimeout(() =>{
                            this.$router.push('/login')
                        }, 500)
                        return;
                    }
                    Toast.loading('收藏中...')
                    collectResumesByIds({ids: this.choosed.join(','), userId: this.$store.state.user.id}).then(res => {
                        Toast.clear()
                        if (res.success) {
                            Toast('简历收藏成功')
                        } else {
                            Toast('简历收藏失败')
                        }
                    })
                } else {
                    Toast('请至少选择一份简历')
                }
            },
            selectAll() {
                if (!this.isSelectAll) {
                    this.isSelectAll = true
                    this.$refs['talentsComp'].selectAll()
                } else {
                    this.isSelectAll = false
                    this.$refs['talentsComp'].reverseSelectAll()
                }
            },
            choosedTalent(list) {
                console.log(list)
                this.choosed = list
            },
            getPersons() {
                // mode 0 非高级人才 1 高级人才
                this.loading = true
                this.queryOptions.pageNum++
                queryResume(this.queryOptions).then((res) => {
                    if (res.list && res.list.length > 0) {
                        if (this.queryOptions.pageNum === 1) {
                            this.list.splice(0, this.list.length)
                            this.list.push(...res.list)
                        } else {
                            this.list.push(...res.list)
                        }
                    } else {
                        this.finished = true
                    }
                    if (this.queryOptions.pageNum === res.totalPage) {
                        this.finished = true
                    }
                    this.loading = false
                }).catch((error) => {
                    console.log(error, '获取人才失败')
                    this.loading = false
                })
            },
            confirmFilter() {
                this.filterShow = false
                this.queryOptions.sex = this.queryOptionsTemp.sex
                this.queryOptions.releaseDate = this.queryOptionsTemp.releaseDate
                this.queryOptions.expectedSalary = this.queryOptionsTemp.expectedSalary
                this.queryOptions.wrokLife = this.queryOptionsTemp.wrokLife
                this.queryOptions.education = this.queryOptionsTemp.education
            },
            cancelFilter() {
                this.filterShow = false
                this.queryOptionsTemp.sex = this.queryOptions.sex
                this.queryOptionsTemp.releaseDate = this.queryOptions.releaseDate
                this.queryOptionsTemp.expectedSalary = this.queryOptions.expectedSalary
                this.queryOptionsTemp.wrokLife = this.queryOptions.wrokLife
                this.queryOptionsTemp.education = this.queryOptions.education
            },
            onNavClick(index) {
                this.mainActiveIndex = index
            },
            onItemClick(data) {
                this.queryOptionsTemp[this.keySets[this.mainActiveIndex]] = data.id
            },
            showFilter() {
                this.filterShow = !this.filterShow
            },
            hideArea() {
                this.areaShow = false
            },
            showArea() {
                this.areaShow = !this.areaShow
            },
            confirmArea(array) {
                this.areaShow = false
                if (array.length > 0) {
                    this.placeBelong = array[array.length - 1].name
                    this.value = array[array.length - 1].code
                }
            },
            getFilters() {
                Toast.loading({mask: true, message: '加载中...'})
                queryFilterOptions().then(res => {
                    if (res.data) {
                        for (let i = 0; i < this.filters.length; i++) {
                            if (res.data[this.filters[i].key]) {
                                for (let j = 0; j < res.data[this.filters[i].key].length; j++) {
                                    if (j === 0) {
                                        this.filters[i].children.push({
                                            id: 0,
                                            text: '所有'
                                        })
                                    }
                                    this.filters[i].children.push({
                                        id: res.data[this.filters[i].key][j].id,
                                        text: res.data[this.filters[i].key][j].name
                                    })
                                }
                            }
                        }
                    }
                    this.$nextTick(() => {
                        Toast.clear()
                    })
                }).catch((error) => {
                    console.log(error)
                    Toast.clear()
                })
            }
        },
        components: {
            sTalents,
            [Area.name]: Area,
            [Popup.name]: Popup,
            [TreeSelect.name]: TreeSelect,
            [List.name]: List,
            Layout
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .personnel-list {
        .apply {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            z-index: 2;
            padding: 8px 5px;
            display: flex;
            font-size: 14px;
            line-height: 40px;
            .qx {
                width: 60px;
                height: 40px;
                margin-right: 5px;
                position: relative;
                padding-left: 31px;
                &:before {
                    content: '';
                    position: absolute;
                    width: 22px;
                    height: 20px;
                    left: 10px;
                    top: 50%;
                    margin-top: -10px;
                    background-image: url(/static/imgs/icon_radio.png);
                    background-size: 70px auto;
                    background-repeat: no-repeat;
                }
            }
            .qx.on {
                &:before {
                    background-position: -23px 0;
                }
            }
            .sc {
                width: 90px;
                height: 40px;
                border: 1px solid #ff7e3e;
                color: #ff7e3e;
                margin-right: 5px;
                border-radius: 5px;
                position: relative;
                padding-left: 40px;
                &:before {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    left: 14px;
                    top: 50%;
                    margin-top: -10px;
                    background-image: url(/static/imgs/icon_sc.png);
                    background-size: 20px auto;
                    background-repeat: no-repeat;
                }
            }
            .sq {
                flex: 1;
                height: 40px;
                background-color: #ff7e3e;
                color:#FFF;
                border-radius: 5px;
                text-align: center;
            }
        }
        .list-box {
            z-index: 1;
            position:absolute;
            top: 35px;
            left: 0;
            right: 0;
            bottom: 50px;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
        }
        .personnel-selector {
            position: fixed;
            top: 46px;
            z-index: 2;
            left: 0;
            right: 0;
            height: 35px;
            line-height: 35px;
            display: flex;
            text-align: center;
            font-size: 14px;
            border-bottom: 1px solid #e5e5e5;

            .flex-auto {
                flex: 1;
                &:after {
                    content: '▼';
                    color: #333;
                }
                &:first-child {
                    border-right: 1px solid #e5e5e5;
                }
            }
            .flex-auto.active {
                &:after {
                    content: '▲';
                }
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .filterPopup {
        height: 260px;
        .filterTop {
            height: 40px;
            border-bottom: 1px solid #e5e5e5;
            .left, .right {
                font-size: 16px;
                color: #38f;
                padding: 0 15px;
                height: 40px;
                line-height: 40px;
            }
            .left {
                float: left;
            }
            .right {
                float: right;
            }
        }
        .van-tree-select {
            height: 220px !important;
        }
        .van-tree-select__content {
            height: 220px !important;
        }
    }
</style>