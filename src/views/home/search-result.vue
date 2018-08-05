<template>
    <Layout>
        <div class="search-box">
            <van-search placeholder="请输入商品名称" v-model="value" show-action>
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <template v-if="list.length > 0">
            <van-cell-group>
                <van-cell v-for="(item, index) in list" :key="'search-list' + index" :title="item.name" :to="{path: tag[item.type].to, query: { id: item.id }}">
                    <div slot="right-icon">
                        <van-tag type="danger">{{ tag[item.type].name  }}</van-tag>
                        <van-icon name="arrow" class="van-cell__right-icon" />
                    </div>
                </van-cell>
            </van-cell-group>
        </template>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { searchByKeywords } from '@/api/service'
    import { Toast, Cell, CellGroup, Tag, Search, Icon } from 'vant';
    export default {
        name: 'searchResult',
        data() {
            return {
                value: '',
                list: [],
                tag: {
                    '0': {
                        name: '新闻',
                        to: 'news-detail'
                    },
                    '1': {
                        name: '开班信息',
                        to: 'lesson-detail'
                    },
                    '2': {
                        name: '培训项目',
                        to: 'project-detail'
                    },
                    '3': {
                        name: '人才简历',
                        to: 'resume-detail'
                    },
                    '4': {
                        name: '职位',
                        to: 'job-detail'
                    },
                    '5': {
                        name: '公司',
                        to: 'company-detail'
                    },
                }
            }
        },
        mounted() {
            // this.getLessonDetail(this.$route.query.id)
        },
        methods: {
            onSearch() {
                Toast.loading()
                searchByKeywords(this.value).then(res => {
                    this.list.splice(0, this.list.length)
                    this.list.push(...res.list)
                    this.$nextTick(() => {
                        Toast.clear()
                    })
                })
            }
        },
        components: {
            Layout,
            [Search.name]: Search,
            [Cell.name]: Cell,
            [Tag.name]: Tag,
            [CellGroup.name]: CellGroup,
            [Icon.name]: Icon
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .search-box {
        .van-search__action div {
            padding: 0 10px;
        }
    }
</style>