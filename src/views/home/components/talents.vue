<template>
    <ul class="talents lr" v-if="list.length > 0">
        <li class="talents-item" v-for="(item, index) in list" :key="'s-talents' + index">
            <div class="flex">
                <div class="flex-left">{{item.name}}</div>
                <div class="flex-right">更新时间：{{item.updateTime}}</div>
            </div>
            <div class="flex flex2">
                <div class="flex-left">学历：{{item.education}}</div>
                <div class="flex-right">工作经验：{{item.experience}}</div>
            </div>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'sTalents',
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
    .talents {
        li {
            width: 100%;
            border-bottom: 1px solid #dadada;
            padding: 5px;
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
                    width: 130px;
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
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

