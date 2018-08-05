<script>
    import { Toast } from 'vant';
    import { loginByCode } from '@/api/login'
    import axios from 'axios'
    export default {
        mounted() {
            Toast.loading('登录中...')
        },
        methods: {
            login() {
                axios.post({
                    url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=' + this.$route.query.code + '&grant_type=authorization_code'
                }).then(res => {
                    // { "access_token":"ACCESS_TOKEN",
                    //     "expires_in":7200,
                    //     "refresh_token":"REFRESH_TOKEN",
                    //     "openid":"OPENID",
                    //     "scope":"SCOPE" }
                    if(res.errcode) {
                        Toast.fail('微信授权失败')
                    } else {
                        loginByCode(res.openid).then(res => {
                            if (res.success) {
                                this.$store.dispatch('SetLoginData', res.data)
                                history.go(-2)
                            } else {
                                Toast.fail('登录失败:' + res.message + ',系统将在1s后返回')
                                setTimeout(() => {
                                    history.back()
                                }, 1000)
                            }
                        })
                    }
                })

            }
        }
    }
</script>