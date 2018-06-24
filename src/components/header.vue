<template>
    <div class="header">
        <div class="left">
            <span>导航</span>
        </div>
        <div class="center">
            <span>输入搜索关键词</span>
        </div>
        <div class="right">
            <span>会员</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'sHeader'
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 46px;
        background: linear-gradient(#343434, #cccccc);
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