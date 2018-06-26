<template>
    <div class="title lr">
        <div class="left"><slot></slot></div>
        <div class="right" v-if="showMore">
            <router-link tag="a" :to="to">更多>></router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'sTitle',
        props: {
            link: {
                type: String,
                default: ''
            },
            query: {
                type: Object,
                default: null
            },
            showMore: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            to() {
                if (this.showMore) {
                    let obj = {}
                    obj.path = '/' + this.link
                    if (this.query) {
                        obj.query = this.query
                    }
                    return obj
                }
            }
        },
        components: {
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    $color: #2a89de;
    .title {
        height: 46px;
        position: relative;
        color: $color;
        border-bottom: 1px solid #dadada;
        .left {
            position: absolute;
            left: 0;
            right: 40px;
            font-size: 14px;
            height: 24px;
            line-height: 24px;
            border-left: 3px solid $color;
            padding-left: 12px;
            margin-top: 11px;
            font-weight: bold;
        }
        .right {
            position: absolute;
            top: 0;
            right: 0;
            height: 46px;
            line-height: 46px;
            a {
                color: $color;
                font-size: 12px;
                display: block;
                width: 40px;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

