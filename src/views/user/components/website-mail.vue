<template>
    <van-cell-group>
        <van-cell v-for="(item, index) in list" :key="'mail_-list' + index" :title="item.des" style="margin-top: -1px;">
            <div slot="right-icon">
                <van-tag type="success" v-if="index < unreadCounts">最新消息</van-tag>
                <van-tag v-else>历史消息</van-tag>
            </div>
        </van-cell>
    </van-cell-group>
</template>
<script>
    import { CellGroup, Cell, Tag, Toast } from 'vant';
    import { searchMail} from '@/api/service'
    export default {
        name: 'websiteMail',
        data() {
            return  {
                list: []
            }
        },
        computed: {
            unreadCounts() {
                return this.$route.query.count || 0
            }
        },
        mounted() {
            this.queryByKeywords()
        },
        methods: {
            queryByKeywords() {
                this.$toast.loading()
                searchMail(this.$store.state.user.id).then(res => {
                    Toast.clear()
                    this.list.splice(0, this.list.length)
                    this.list.push(...res.list)
                    this.$store.dispatch('setCount', false)
                })
            }
        },
        components: {
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Tag.name]: Tag
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .enterpise-baseinfo {
        height: 100%;
        .add-btn {
            background-color: #f44;
            width: 35px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            border-radius: 100px;
            position: fixed;
            right: 30px;
            bottom: 75px;
            a {
                color: #FFF;
                font-size: 30px;
            }
        }
        .table-box {
            border: 1px solid rgba(204, 204, 204, 0.5);
            border-radius: 5px;
            font-size: 14px;
            margin: 10px;
            padding: 5px 10px 10px;
            .title {
                font-weight: bold;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
                margin-bottom: 5px;
                a {
                    font-size: 14px;
                    color: #ff7d7d;
                }
            }
            .flex {
                display: flex;
                line-height: 22px;
                .label {
                    width: 80px;
                }
                .value {
                    flex: 1;
                    word-wrap: break-word;
                    word-break: break-all;
                    .button {
                        border: 1px solid #CCC;
                        border-radius: 5px;
                        padding: 0 4px;
                        font-size: 12px;
                        display: inline-block;
                        height: 22px;
                        line-height: 20px;
                        margin-right: 10px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
        .submit {
            .van-button--small {
                width: 94%;
                margin: 10px 3%;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .enterpise-baseinfo {
        .van-tabs__wrap {
            top: -1px;
        }
        .van-tabs {
            height: 100%;
        }
        .van-tabs__content {
            height: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            background-color: #FFF;
        }
    }
</style>