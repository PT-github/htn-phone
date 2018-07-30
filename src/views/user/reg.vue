<template>
    <Layout class="user-login" :title="'注册'">
        <van-cell-group style="margin-top: -1px;">
            <van-field label="用户名" v-model="username" placeholder="请输入用户名" required clearable/>
            <van-field label="密码" v-model="password" type="password" placeholder="请输入密码" required clearable/>
            <van-field label="手机号码" v-model="tel" placeholder="请输入用户名" required clearable/>
            <van-field label="邮箱" v-model="email" placeholder="请输入用户名" required clearable/>
            <van-cell title="用户类型" is-link arrow-direction="down" :value="userType" @click="userTypeShow = true"/>
        </van-cell-group>
        <div class="submit">
            <van-button size="small" type="primary" @click="reg">注册</van-button>
        </div>
        <van-actionsheet v-model="userTypeShow" :actions="actions" />
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { Toast, Field, CellGroup, Button, Cell, Actionsheet } from 'vant';
    import { regAction } from '@/api/login'
    export default {
        name: 'user',
        computed: {
            userType() {
                return this.type === 1 ? '个人用户' : '企业用户'
            }
        },
        data() {
            return {
                username: '',
                password: '',
                type: 1,
                tel: '',
                email: '',
                userTypeShow: false,
                actions: [
                    {
                        name: '个人用户',
                        type: 1,
                        callback: this.onClick
                    },{
                        name: '企业用户',
                        type: 2,
                        callback: this.onClick
                    }
                ]
            }
        },
        methods: {
            onClick(item) {
                this.type = item.type
                this.userTypeShow = false
            },
            reg(){
                const toast = Toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    message: '注册中...'
                })
                regAction({
                    userName: this.username,
                    password: this.password,
                    tel: this.tel,
                    email: this.email,
                    type: this.type
                }).then(res => {
                    if (res.success) {
                        Toast.success('注册成功')
                        this.$store.dispatch('SetLoginData', res.data)
                        history.go(-2)
                        this.$nextTick(() => {
                            Toast.clear()
                        })
                    } else {
                        toast.clear()
                    }
                })
            }
        },
        components: {
            Layout,
            [Field.name] : Field,
            [CellGroup.name] : CellGroup,
            [Button.name] : Button,
            [Cell.name] : Cell,
            [Actionsheet.name] : Actionsheet,
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .submit {
        padding: 10px;
        display: flex;
        .van-button {
            flex: 1;
        }
    }

</style>
<style rel="stylesheet/scss" lang="scss">
    .user-login {
        .van-cell__right-icon::before {
            transform: rotate(90deg);
        }
    }
</style>