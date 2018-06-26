<template>
    <div class="hunters lr clearfix" v-if="list.length > 0">
        <div class="hunter-item" v-for="(item, index) in list" :key="'s-hunters' + index">
            <div class="flex">
                <div class="flex-left">{{ item.job }}</div>
                <div class="flex-right">{{ item.salary }}</div>
            </div>
            <div class="flex flex2">
                <div class="flex-left">{{ item.name }}</div>
                <div class="flex-right">{{ item.place }}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'sHunters',
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
    .hunters {
        margin-top: 10px;
        .hunter-item {
            width: 48%;
            margin-bottom: 10px;
            margin-right: 4%;
            float: left;
            border: 1px solid #dadada;
            padding: 4px;
            border-radius: 2px;
            .flex {
                display: flex;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                color: #000000;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .flex-left {
                    flex: 1;
                    padding-right: 5px;
                }
                .flex-right {
                    width: 60px;
                    text-align: right;
                    color: #ff6000;
                }
            }
            .flex2 {
                .flex-left {
                    color: #666;
                }
                .flex-right {
                    color: #999;
                }
            }
            &:nth-child(2n) {
                float: right;
                margin-right: 0;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

