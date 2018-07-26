<template>
    <div class="teachers lr" v-if="list.length > 0">
        <ul class="teachers-list">
            <li v-for="(item, index) in list" :key="'s-lesson-' + index">
                <router-link tag="a" :to="{path: '/education-training', query: { mode: 3 }}">
                    <div class="pic">
                        <img :src="item.imgUrl" :alt="item.name">
                        <span>{{ item.category }}</span>
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
    .teachers {
        margin-top: 10px;
        .teachers-list {
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
                    width: 81px;
                    height: 90px;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                    }
                    span {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background-color: rgba(0, 0, 0, 0.3);
                        color: #FFF;
                        font-size: 10px;
                        text-align: center;
                        height: 20px;
                        line-height: 20px;
                    }
                }
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

