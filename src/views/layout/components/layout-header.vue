<template>
    <div class="layout-header">
        <van-nav-bar
                :title="title"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        >
            <span v-if="showRightText" slot="right">{{ rightText }}</span>
        </van-nav-bar>
    </div>
</template>
<script>
    import { NavBar } from 'vant';
    export default {
        name: 'layoutHeader',
        props: {
            title: {
                type: String,
                default: ''
            },
            rightText: {
                type: String,
                default: ''
            },
            showRightText: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onClickLeft() {
                if (document.referrer) {
                    history.back()
                } else {
                    window.location.href = '/'
                }
            },
            onClickRight() {
                this.$emit('onClickRight')
            }
        },
        components: {
            [NavBar.name]: NavBar
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .layout-header {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .layout-header {
        .van-nav-bar__text {
            color: #333;
        }
        .van-nav-bar .van-icon {
            color: #333;
        }
    }
</style>


