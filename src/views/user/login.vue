<template>
    <Layout class="user-login" :title="'用户登录'">
        <van-cell-group style="margin-top: -1px;">
            <van-field label="用户名" v-model="username" placeholder="请输入用户名" required clearable/>
            <van-field label="密码" v-model="password" type="password" placeholder="请输入密码" required clearable/>
            <van-cell title="用户类型" is-link arrow-direction="down" :value="userType" @click="userTypeShow = true"/>
        </van-cell-group>
        <div class="submit">
            <van-button tag="a" href="/#/reg" size="small" type="default">注册</van-button>
            <van-button size="small" type="primary" @click="login">登录</van-button>
        </div>
        <!--<div class="bottom" @click="goAuth">
            已有账号，直接登录
        </div>-->
        <van-actionsheet v-model="userTypeShow" :actions="actions" />
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { Toast, Field, CellGroup, Button, Cell, Actionsheet } from 'vant';
    import { queryUserInfo } from '@/api/login'
    export default {
        name: 'user',
        computed: {
            userType() {
                return this.type === 1 ? '个人用户' : '企业用户'
            }
        },
        mounted() {
            if (this.$route.query.token) {
                this.getUserInfo(this.$route.query.token)
            }
            sessionStorage.setItem('openid', this.$route.query.openid || '')
        },
        data() {
            return {
                username: '',
                password: '',
                type: 1,
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
            getUserInfo(token) {
                Toast.loading({
                    mask: true,
                    duration: 0,
                    forbidClick: true,
                    message: '加载中...'
                });
                queryUserInfo(token).then(response => {
                    const data = response.data
                    sessionStorage.setItem('userInfo', JSON.stringify(data))
                    this.$store.dispatch('SET_USERINFO', data)
                    this.$store.dispatch('SET_ISLOGIN', true)
                    this.$nextTick(() => {
                        if (data.type === 1) {
                            this.$router.push('/individual-member')
                        } else {
                            this.$router.push('/enterpise-member')
                        }
                    })
                })
            },
            onClick(item) {
                this.type = item.type
                this.userTypeShow = false
            },
            login(){
                Toast.loading()
                this.$store.dispatch('Login', {username: this.username, password: this.password, type: this.type}).then(() => {
                    Toast.clear()
                    history.back()
                })
            },
            goAuth() {
                let url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
                url += '?appid=wx212c673025d035a9'
                //url += '&redirect_uri=' + escape('http://' + window.location.host + '/oauth/autoLogin')
              url += '&redirect_uri=' + escape('http://www.hnjkrcw.club/oauth/autoLogin')
                url += '&response_type=code'
                url += '&scope=snsapi_base'
                url += '&state=STATE#wechat_redirect'
                window.location.href = url
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
    .bottom {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -65px;
        width: 130px;
        background-repeat: no-repeat;
        background-position: center 10px;
        padding-top: 45px;
        background-image: url(/static/imgs/weixn.png);
        font-size: 10px;
        height: 100px;
        text-align: center;
    }
    .submit {
        padding: 10px;
        display: flex;
        .van-button {
            flex: 1;
            &:nth-child(1) {
                margin-right: 10px;
            }
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
