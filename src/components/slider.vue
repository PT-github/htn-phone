<template>
    <div class="slider" v-show="list.length > 0">
        <van-swipe :autoplay="0">
            <van-swipe-item v-for="(item, index) in list" :key="'s-lider-' + index">
                <a :href="item.link">
                    <div class="imgBg" :style="{backgroundImage: 'url(' + (item.imgUrl || item.imgurl) + ')'}"></div>
                </a>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
    import { Swipe, SwipeItem } from 'vant';
    export default {
        name: 'sSlider',
        props: {
            list: {
                type: Array,
                default: () => []
            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .slider {
        height: 180px;
        .van-swipe {
            height: 100%;
            a {
                display: block;
                width: 100%;
                height: 100%;
                .imgBg {
                    width: 100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: cover;
                }
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .slider {
        .van-swipe__indicators {
            right: 15px;
            left: initial;
            transform: none;
        }
        .van-swipe__indicator {
            background-color: transparent;
            border: 1px solid #FFF;
        }
        .van-swipe__indicator--active {
            background-color: #FFF;
        }
    }
</style>

