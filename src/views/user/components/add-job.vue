<template>
    <Layout class="add-job" :title="'职位新增'">
        <van-cell-group style="margin-top: -1px;">
            <van-field label="职位名称" v-model="form.name" placeholder="请输入职位名称" required clearable/>
            <van-field label="招聘人数" v-model="form.num" placeholder="请输入招聘人数"  required clearable/>
            <van-cell title="工作地点" :value="form.cities" @click="" is-link required/>
            <van-cell title="月薪范围" :value="form.expectedSalary" is-link required/>
            <van-cell title="学历要求" :value="form.education" is-link required/>
            <van-cell title="工作年限" :value="form.wrokLife" is-link required/>
            <van-field label="职位描述" type="textarea" autosize v-model="form.desc" placeholder="请输入职位描述"  required clearable/>
        </van-cell-group>
        <van-actionsheet v-model="expectedSalaryShow" :actions="expectedSalaryActions" />
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { Toast, Field, Button, Cell, CellGroup } from 'vant';
    import { queryFilterOptions, addCompanyJob } from '@/api/service'
    export default {
        name: 'jobInterviewMan',
        computed: {
            expectedSalaryActions() {
                this.filterOptions.expectedSalary.forEach()
            }
        },
        data() {
            return  {
                expectedSalaryShow: false,
                form: {
                    name: '',
                    num: '',
                    cities: '',
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
            getData() {
                Toast.loading('数据加载中...')
                queryFilterOptions().then(res => {
                    Toast.clear()
                    this.filterOptions.expectedSalary.push(...res.data.expectedSalary)
                    this.filterOptions.wrokLife.push(...res.data.wrokLife)
                    this.filterOptions.education.push(...res.data.education)
                    this.filterOptions.placeBelong.push(...res.data.placeBelong)
                })
            },
        },
        components: {
            Layout,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
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