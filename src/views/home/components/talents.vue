<template>
    <ul class="talents lr" v-if="list.length > 0">
        <li class="talents-item" v-for="(item, index) in list" :key="'s-talents' + index">
            <div class="left" v-if="showCheck" @click="chooseTalent(item.id)">
                <span class="checkbox" :class="{checked: choosed.indexOf(item.id) !== -1}"></span>
            </div>
            <div class="right">
                <router-link tag="a" :to="{ path: '/resume-detail', query: { id: item.id } }">
                    <div class="flex">
                        <div class="flex-left">{{item.name}}</div>
                        <div class="flex-right">更新时间：{{item.updateTime}}</div>
                    </div>
                    <div class="flex flex2">
                        <div class="flex-left">学历：{{item.education}}</div>
                        <div class="flex-right">工作经验：{{item.experience}}</div>
                    </div>
                </router-link>
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
            },
            showCheck: {
                type: Boolean,
                default: false
            },
            choosedFromTop: {
                type: Array,
                default: () => []
            }
        },
        watch: {
            choosedFromTop() {

            }
        },
        data() {
            return {
                choosed: []
            }
        },
        methods: {
            chooseTalent(id) {
                let index = this.choosed.indexOf(id)
                if (index !== -1) {
                    this.choosed.splice(index, 1)
                } else {
                    this.choosed.push(id)
                }
                this.$emit('choosedTalent', this.choosed)
            },
            selectAll() {
                if (this.list.length > 0) {
                    this.list.forEach((item) => {
                        this.choosed.indexOf(item.id) === -1 && this.choosed.push(item.id)
                    })
                    this.$emit('choosedTalent', this.choosed)
                }
            },
            reverseSelectAll() {
                if (this.list.length > 0) {
                    this.choosed.splice(0, this.choosed.length)
                    this.$emit('choosedTalent', [])
                }
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
            display: flex;
            .left {
                width: 35px;
                .checkbox {
                    display: block;
                    width: 22px;
                    height: 22px;
                    background-image: url(/static/imgs/icon_radio.png);
                    background-size: 75px auto;
                    margin: 9px auto 0;
                }
                .checked {
                    background-position: -25px 0;
                }
            }
            .right {
                flex: 1;
                a {
                    display: block;
                }
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
    }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>

