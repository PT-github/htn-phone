<template>
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
            <van-tab :title="'账户信息'">
                <van-cell-group :border="false">
                    <van-cell title="账户名称" :value="companyData.account" />
                    <van-cell title="账户状态" :value="companyData.accountState"/>
                    <van-cell title="账户等级" :value="companyData.accountLevel"/>
                </van-cell-group>
            </van-tab>
            <van-tab :title="'密码修改'">
                <van-cell-group :border="false">
                    <van-field v-model="password" type="password" placeholder="请输入原始密码" />
                    <van-field v-model="modifyPwd" type="password" placeholder="请输入修改密码" />
                    <van-field v-model="confirmPwd" type="password" placeholder="请再次输入密码" />
                </van-cell-group>
                <div class="submit">
                    <van-button size="small" type="primary" @click="mocifyPwdFun">确认</van-button>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
    import { Tab, Tabs, Cell, CellGroup, Toast, Field, Button } from 'vant';
    import { queryCompanyMessage, modifyCompanyPassword } from '@/api/service'
    export default {
        name: 'enterpiseBaseinfo',
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
                queryCompanyMessage(this.$store.state.user.id).then(res => {
                    Toast.clear()
                    this.companyData = res.data
                })
            },
            mocifyPwdFun() {
                if (!this.password) {
                    this.$toast('请输入原始密码')
                    return
                }
                if (!this.modifyPwd) {
                    this.$toast('请输入修改密码')
                    return
                }
                if (!this.confirmPwd) {
                    this.$toast('请输入确认密码')
                    return
                }
                if (this.confirmPwd !== this.modifyPwd) {
                    this.$toast('两次密码不一致')
                    return
                }
                const loading = this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    message: '密码修改中...'
                })
                modifyCompanyPassword({
                    password: this.password,
                    newPassword: this.modifyPwd,
                    id: this.companyData.id
                }).then(res => {
                    loading.close()
                    if (res.success) {
                        this.$toast('密码修改成功')
                    } else {
                        this.$toast('密码修改失败')
                    }
                }).catch(() => {
                    this.$toast('密码修改失败')
                })
            },
        },
        components: {
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