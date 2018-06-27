<template>
    <div class="news lr" v-if="list.length > 0">
        <div class="part-01">
            <router-link tag="a" :to="{ name: 'newsDetail', params: {newsId: list[0].id} }">
                <div class="left">
                    <div class="pic">
                        <img :src="list[0].imgUrl" :alt="list[0].name">
                    </div>
                </div>
                <div class="right">
                    <p class="p1">{{ list[0].name }}</p>
                    <p class="p2">{{ list[0].desc }}</p>
                </div>
            </router-link>
        </div>
        <ul class="part-02 clearfix">
            <template v-for="(item, index) in list">
                <template v-if="index > 0">
                    <li><router-link tag="a" :to="{name: 'newsDetail', params: { newsId: item.id }}">{{ item.name }}</router-link></li>
                </template>
            </template>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'sNews',
        props: {
            list: {
                type: Array,
                default: () => []
            }
        },
        components: {
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .news {
        margin-top: 10px;
        .part-02 {
            margin-top: 5px;
            li {
                float: left;
                width: 50%;
                font-size: 11px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-indent: 10px;
                padding-right: 7px;
                background-image: url("/static/imgs/icon_04.png");
                background-repeat: no-repeat;
                background-position: left center;
                background-size: 3px auto;
                line-height: 25px;
                a {
                    color: #333333;
                }
            }
        }
        .part-01 {
            height: 86px;
            width: 100%;
            position: relative;
            a {
                display: block;
                width: 100%;
                height: 100%;
            }
            .right {
                position: absolute;
                top: 0;
                right: 0;
                left: 120px;
                height: 100%;
                overflow: hidden;
                .p1 {
                    font-size: 12px;
                    text-align: center;
                    color: #000000;
                }
                .p2 {
                    font-size: 11px;
                    color: #515151;
                    line-height: 16px;
                    margin-top: 5px;
                }
            }
            .left {
                position: absolute;
                width:110px;
                left: 0;
                top: 0;
                height:100%;
                .pic {
                    width: 100%;
                    height: 100%;
                    img {
                        width:100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

