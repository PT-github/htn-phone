<template>
    <ul class="links lr clearfix" v-if="list.length > 0">
        <li class="talents-item" v-for="(item, index) in list" :key="'s-links' + index">
            <a :href="item.link" :style="{backgroundImage: 'url(' + item.imgUrl + ')'}"></a>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'sLinks',
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
    .links {
        padding-top: 5px;
        li {
            width: 49%;
            margin-right: 2%;
            margin-bottom: 5px;
            height: 35px;
            float: left;
            background-color: rgba(204, 204, 204, .3);
            a {
                display: block;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center center;
                border-radius: 2px;
            }
            &:nth-child(2n) {
                margin-right: 0;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

