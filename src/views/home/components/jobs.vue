<template>
    <ul class="jobs lr clearfix" v-if="list.length > 0">
        <li class="jobs-item" v-for="(item, index) in list" :key="'s-jobs' + index">
            <router-link tag="a" :to="{path: '/job-detail', query: { id: item.id }}">
                {{ item.name }}
            </router-link>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'sJobs',
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
    .jobs {
        margin-top: 10px;
        li {
            width: 48%;
            margin-right: 4%;
            font-size: 12px;
            color: #333;
            height: 25px;
            text-decoration: underline;
            line-height: 25px;
            float: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            a {
                dispaly: block;
                color: #333;
            }
            &:nth-child(2n) {
                margin-right: 0;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

