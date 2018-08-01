<template>
    <Layout class="add-job" :title="'职位新增'">
        <van-cell-group style="margin-top: -1px;">
            <van-field label="职位名称" v-model="form.name" placeholder="请输入职位名称" required clearable/>
            <van-field label="招聘人数" v-model="form.num" placeholder="请输入招聘人数"  required clearable/>
            <van-cell title="工作地点" :value="placeBelong" @click="areaShow = true" is-link required/>
            <van-cell title="月薪范围" :value="expectedSalaryFormat[form.expectedSalary]" @click="expectedSalaryShow = true" is-link required/>
            <van-cell title="学历要求" :value="educationFormat[form.education]" @click="educationShow = true" is-link required/>
            <van-cell title="工作年限" :value="workLifeFormat[form.wrokLife]" @click="wrokLifeShow = true" is-link required/>
            <van-field label="职位描述" type="textarea" autosize v-model="form.desc" placeholder="请输入职位描述"  required clearable/>
        </van-cell-group>
        <van-actionsheet v-model="expectedSalaryShow" :actions="expectedSalaryActions" />
        <van-actionsheet v-model="educationShow" :actions="educationActions" />
        <van-actionsheet v-model="wrokLifeShow" :actions="workLifeActions" />
        <van-popup v-model="areaShow" position="bottom" :close-on-click-overlay="false">
            <van-area @cancel="hideArea" @confirm="confirmArea" :area-list="areaList" :columns-num="2" :value="form.cities"/>
        </van-popup>
        <div class="submit">
            <van-button size="small" type="primary" @click="submit">提交</van-button>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { Toast, Field, Button, Cell, CellGroup, Area, Popup, Actionsheet } from 'vant';
    import { queryFilterOptions, addCompanyJob } from '@/api/service'
    import AreaList from '@/views/job/area';
    export default {
        name: 'addJob',
        computed: {
            expectedSalaryFormat() {
                let temp = {}
                this.filterOptions.expectedSalary.forEach(function(item) {
                    temp[item.id] = item.name
                })
                return temp
            },
            expectedSalaryActions() {
                var tempArray = [], _this = this
                this.filterOptions.expectedSalary.forEach(function(item) {
                    tempArray.push(Object.assign(item, {
                        callback: _this.selSalary
                    }))
                })
                return tempArray
            },
            educationFormat() {
                let temp = {}
                this.filterOptions.education.forEach(function(item) {
                    temp[item.id] = item.name
                })
                return temp
            },
            educationActions() {
                var tempArray = [], _this = this
                this.filterOptions.education.forEach(function(item) {
                    tempArray.push(Object.assign(item, {
                        callback: _this.selEducation
                    }))
                })
                return tempArray
            },
            workLifeFormat() {
                let temp = {}
                this.filterOptions.wrokLife.forEach(function(item) {
                    temp[item.id] = item.name
                })
                return temp
            },
            workLifeActions() {
                var tempArray = [], _this = this
                this.filterOptions.wrokLife.forEach(function(item) {
                    tempArray.push(Object.assign(item, {
                        callback: _this.selWorkLife
                    }))
                })
                return tempArray
            },
            areaList() {
                return AreaList
            },
        },
        data() {
            return  {
                expectedSalaryShow: false,
                educationShow: false,
                wrokLifeShow: false,
                areaShow: false,
                placeBelong: '长沙市',
                form: {
                    name: '',
                    num: '',
                    cities: '430100',
                    expectedSalary: '',
                    education: '',
                    wrokLife: '',
                    desc: ''
                },
                filterOptions: {
                    expectedSalary: [],
                    wrokLife: [],
                    education: []
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            submit() {
                if (!this.form.name) {
                    Toast('请填写职位名称')
                    return
                }
                if (!this.form.num) {
                    Toast('请填写招聘人数')
                    return
                }
                if (!this.form.expectedSalary) {
                    Toast('请选择职位月薪范围')
                    return
                }
                if (!this.form.education) {
                    Toast('请选择职位学历要求')
                    return
                }
                if (!this.form.wrokLife) {
                    Toast('请选择职位所需工作年限要求')
                    return
                }
                if (!this.form.name) {
                    Toast('请填写职位描述')
                    return
                }
                Toast.loading()
                addCompanyJob(Object.assign(this.form, {
                    id: this.$store.state.user.id
                })).then(res => {
                    Toast.clear()
                    if (res.success) {
                        Toast.success('职位新增成功')
                        this.form.name = ''
                        this.form.num = ''
                        this.form.cities = '430100'
                        this.form.expectedSalary = ''
                        this.form.education = ''
                        this.form.wrokLife = ''
                        this.form.desc = ''
                    } else {
                        Toast.fail('职位新增失败')
                    }
                })
            },
            selEducation(item) {
                this.form.education = item.id
                this.educationShow = false
            },
            selWorkLife(item) {
                this.form.wrokLife = item.id
                this.wrokLifeShow = false
            },
            selSalary(item) {
                this.form.expectedSalary = item.id
                this.expectedSalaryShow = false
            },
            hideArea() {
                this.areaShow = false
            },
            confirmArea(array) {
                this.areaShow = false
                if (array.length > 0) {
                    this.placeBelong = array[array.length - 1].name
                    this.form.cities = array[array.length - 1].code
                }
            },
            getData() {
                Toast.loading('数据加载中...')
                queryFilterOptions().then(res => {
                    Toast.clear()
                    this.filterOptions.expectedSalary.push(...res.data.expectedSalary)
                    this.filterOptions.wrokLife.push(...res.data.wrokLife)
                    this.filterOptions.education.push(...res.data.education)
                })
            },
        },
        components: {
            Layout,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Area.name]: Area,
            [Popup.name]: Popup,
            [Actionsheet.name]: Actionsheet,
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .add-job {
        .submit {
            .van-button--small {
                width: 94%;
                margin: 10px 3%;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .add-job {
        .van-cell__right-icon::before {
            transform: rotate(90deg);
        }
    }
</style>