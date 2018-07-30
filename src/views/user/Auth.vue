<script>
    import { Toast } from 'vant';
    import { loginByCode } from '@/api/login'
    export default {
        mounted() {
            Toast.loading('登录中...')
        },
        methods: {
            login() {
                loginByCode(this.$route.query.code).then(res => {
                    if (res.success) {
                        this.$store.dispatch('SetLoginData', res.data)
                        history.go(-2)
                    } else {
                        setTimeout(() => {
                            history.back()
                        }, 1500)
                    }
                })
            }
        }
    }
</script>