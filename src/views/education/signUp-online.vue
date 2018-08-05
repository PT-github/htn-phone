<template>
    <Layout :title="'在线报名'">
        <van-cell-group style="margin-top: -1px;">
            <template v-if="!$store.state.user.isLogin">
                <van-field label="账号" v-model="account" placeholder="请输入账号" clearable required />
                <van-field label="密码" v-model="password" placeholder="请输入密码" clearable required />
            </template>
            <van-field label="姓名" v-model="username" placeholder="请输入姓名" clearable required />
            <van-field label="手机号码" v-if="!$store.state.user.tel" type="tel" v-model="tel" placeholder="请输入手机号" clearable required />
        </van-cell-group>
        <div style="text-align: center;margin: 10px;" ><van-button @click="signUpOnline" type="primary" size="small">提交</van-button></div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { signUpOnlineAction } from '@/api/service'
    import { Toast, Field, CellGroup, Button } from 'vant';
    export default {
        name: 'signUpOnline',
        data() {
            return {
                account: '',
                password: '',
                username: '',
                tel: ''
            }
        },
        methods: {
            signUpOnline() {
                Toast.loading()
                signUpOnlineAction({
                    id: this.$store.state.user.id,
                    tel: this.tel || this.$store.state.user.tel,
                    account: this.account || this.$store.state.user.account,
                    username: this.username,
                    password: this.password,
                }).then(response => {
                    Toast.clear()
                    if (response.success) {
                        this.$toast('报名成功')
                    } else {
                        this.$message('报名失败，原因：' + response.message)
                    }
                })
            }
        },
        components: {
            Layout,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .news-detail {
        width: 100%;
        background-color: #FFF;
        padding: 10px;
        .title {
            padding-bottom: 20px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
        }
    }
</style>