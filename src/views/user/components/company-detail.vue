<template>
    <Layout :title="'企业明细'">
        <div class="enterpise-baseinfo" >
            <van-tabs v-model="active">
                <van-tab :title="'基本信息'">
                    <van-cell-group :border="false">
                        <van-cell title="公司名称" :value="companyData.companyName" />
                        <van-cell title="公司规模" :value="companyData.companySize"/>
                        <van-cell title="公司性质" :value="companyData.natureOfCompany"/>
                        <van-cell title="法人" :value="companyData.legalPerson"/>
                        <van-cell title="公司注册地" :value="companyData.regSite"/>
                        <van-cell title="联系方式" :value="companyData.contact"/>
                        <van-cell title="联系人" :value="companyData.contacts"/>
                    </van-cell-group>
                </van-tab>
                <van-tab :title="'公司图片'">
                    <div class="company-pic">
                        <template v-if="companyData.imgUrls && companyData.imgUrls.length > 0" v-for="item in companyData.imgUrls">
                            <img :src="item" alt="">
                        </template>
                    </div>
                </van-tab>
                <van-tab :title="'营业执照'">
                    <div class="company-pic">
                        <template v-if="companyData.businessLicense && companyData.businessLicense.length > 0" v-for="item in companyData.businessLicense">
                            <img :src="item" alt="">
                        </template>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { Tab, Tabs, Cell, CellGroup, Toast, Field, Button } from 'vant';
    import { queryCompanyMessage, modifyCompanyPassword } from '@/api/service'
    export default {
        name: 'compay-detail',
        data() {
            return  {
                active: 0,
                companyData: {},
                confirmPwd: '',
                modifyPwd: '',
                password: '',
            }
        },
        mounted() {
            this.getCompanyMessage()
        },
        methods: {
            getCompanyMessage() {
                Toast.loading('数据加载中...')
                queryCompanyMessage(this.$route.query.id).then(res => {
                    Toast.clear()
                    this.companyData = res.data
                })
            },
        },
        components: {
            Layout,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Cell.name]: Cell,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup,
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
            background-color: rgba(239, 239, 239, .5);
        }
    }
</style>