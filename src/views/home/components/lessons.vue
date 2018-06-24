<template>
    <div class="lessons lr" v-if="list.length > 0">
        <ul class="lessons-list">
            <li v-for="(item, index) in list" :key="'s-lesson-' + index">
                <router-link tag="a" :to="{path: 'lesson-detail', params: { id: item.id }}">
                    <div class="pic">
                        <img :src="item.imgUrl" :alt="item.name">
                    </div>
                    <div class="title">{{ item.name }}</div>
                </router-link>
            </li>
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
    .lessons {
        margin-top: 10px;
        .lessons-list {
            width: 100%;
            overflow-x: scroll;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            li {
                margin-right: 7px;
                display: inline-block;
                a {
                    display: inline-block;
                }
                .title {
                    text-align: center;
                    color: #515151;
                    font-size: 10px;
                    line-height: 25px;
                }
                .pic {
                    width: 110px;
                    height: 86px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

