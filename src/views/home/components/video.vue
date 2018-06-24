<template>
    <div class="video lr" v-if="list.length > 0">
        <div class="flex">
            <div class="video-item" v-for="(item, index) in list" :key="'s-video' + index">
                <div class="pic">
                    <img :src="item.imgUrl" :alt="item.name">
                </div>
                <div class="title">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'sVideo',
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
    .video {
        margin-top: 10px;
        .flex {
            display: flex;
            .video-item {
                flex: 1;
                &:first-child {
                    margin-right: 10px;
                }
                .title {
                    text-align: center;
                    color: #515151;
                    font-size: 10px;
                    line-height: 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .pic {
                    width:100%;
                    height: 133px;
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

