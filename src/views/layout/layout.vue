<template>
    <div class="layout">
        <LayoutHeader :title="title" :showRightText="showRightText" :rightText="rightText" @onClickRight="onClickRight"></LayoutHeader>
        <div class="layout-concent">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import { LayoutHeader } from './components'
    export default {
        name: 'layout',
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
            onClickRight() {
                this.$emit('onClickRight')
            }
        },
        components: {
            LayoutHeader
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .layout {
        width: 100%;
        height: 100%;
        position: relative;
        .layout-concent {
            position: absolute;
            top: 46px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>
<style>
    * {
        box-sizing: border-box;
    }
</style>