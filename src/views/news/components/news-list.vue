<template>
    <ul class="news-list lr" v-if="list.length > 0">
        <li class="news-list-item" v-for="(item, index) in list" :key="'news-list' + index">
            <router-link tag="a" :to="{ path: '/news-detail', query: { id: item.id } }">{{ item.name }}
            <span class="arrow"><van-icon name="arrow" /></span></router-link>
        </li>
    </ul>
</template>
<script>
    import { Icon } from 'vant';
    export default {
        name: 'newsList',
        props: {
            list: {
                type: Array,
                default: () => []
            }
        },
        computed: {

        },
        components: {
            [Icon.name]: Icon
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .news-list {
        .news-list-item {
            border-bottom: 1px dotted #dadada;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 35px;
            line-height: 35px;
            font-size: 12px;
            color: #000;
            position: relative;
            padding-right: 30px;
            text-indent: 5px;
            a {
                color: #000;
            }
            .arrow {
                position: absolute;
                right: 8px;
                top: 2px;
                height: 33px;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

