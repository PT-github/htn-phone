<template>
    <div class="header">
        <div class="left" @click="toggleNav">
            <span>导航</span>
        </div>
        <div class="center">
            <span>输入搜索关键词</span>
        </div>
        <div class="right">
            <span>会员</span>
        </div>
        <ul class="nav" v-show="navShow">
            <li><router-link tag="a" :to="'news-home'">新闻中心</router-link></li>
            <li><router-link tag="a" :to="'news-home'">教育培训</router-link></li>
            <li><router-link tag="a" :to="'personnel-list'">招揽人才</router-link></li>
            <li><router-link tag="a" :to="'news-home'">找工作</router-link></li>
            <li><router-link tag="a" :to="'personnel-list'">中高级人才</router-link></li>
            <li><router-link tag="a" :to="'about'">关于我们</router-link></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'sHeader',
        data() {
            return {
                navShow: false
            }
        },
        methods: {
            hideNav() {
                this.navShow = false
            },
            toggleNav() {
                this.navShow = !this.navShow
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 46px;
        z-index: 1;
        background: linear-gradient(#343434, #cccccc);
        .nav {
            width:110px;
            position: absolute;
            left: 0;
            top: 50px;
            background-color: rgba(0, 0, 0, .7);
            border-radius: 7px;
            &:after {
                content: '';
                width: 20px;
                height: 20px;
                border: 10px solid red;
                box-sizing: border-box;
                position: absolute;
                top: -20px;
                left: 10px;
                border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
            }
            li {
                width: 100%;
                display: block;
                height: 35px;
                line-height: 35px;
                a {
                    font-size: 14px;
                    color: #FFF;
                    display: block;
                    text-align: center;
                }
            }
        }
        .left, .right {
            width: 42px;
            height: 100%;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            text-align: center;
            background-position: center 6px;
            background-size: 23px;
            padding-top: 25px;
            span {
                font-size: 12px;
                color: #FFF;
            }
        }
        .left {
            left: 0;
            background-image: url("/static/imgs/icon_03.png");
        }
        .center {
            position: absolute;
            top: 7px;
            left: 42px;
            right: 42px;
            font-size: 14px;
            height: 32px;
            line-height: 32px;
            background-color: #FFF;
            color: #999999;
            padding-left: 12px;
            border-radius: 5px;
        }
        .right {
            right: 0;
            background-image: url("/static/imgs/icon_01.png");
        }
    }
</style>
<style>
    * {
        box-sizing: border-box;
    }
</style>