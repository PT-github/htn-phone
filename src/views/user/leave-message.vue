<template>
    <Layout :title="'在线留言'">
        <van-cell-group style="margin-top: -1px;">
            <van-field label="联系人" v-model="contactor" placeholder="请输联系人" required clearable/>
            <van-field label="联系方式" v-model="phoneNumber" placeholder="请输入您的联系方式" required clearable/>
            <van-field label="留言内容" v-model="desc" type="textarea" placeholder="请输入您的宝贵留言" required clearable/>
        </van-cell-group>
        <div class="submit">
            <van-button size="small" type="primary" @click="onSubmit">确定</van-button>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { Toast, Field, CellGroup, Button, Cell, Actionsheet } from 'vant';
    import {leaveMessgage} from '@/api/service'
    export default {
        name: 'leaveMessage',
        data() {
            return {
                contactor: '',
                phoneNumber: '',
                desc: '',
            }
        },
        methods: {
            onSubmit(){
                Toast.loading()
                leaveMessgage({
                    contactor: this.contactor,
                    phoneNumber: this.phoneNumber,
                    desc: this.desc,
                    id: this.$store.state.user.id
                }).then(() => {
                    Toast.clear()
                    history.back()
                })
            }
        },
        components: {
            Layout,
            [Field.name] : Field,
            [CellGroup.name] : CellGroup,
            [Button.name] : Button,
            [Cell.name] : Cell,
            [Actionsheet.name] : Actionsheet,
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .submit {
        padding: 10px;
        display: flex;
        .van-button {
            flex: 1;
            &:nth-child(1) {
                margin-right: 10px;
            }
        }
    }

</style>