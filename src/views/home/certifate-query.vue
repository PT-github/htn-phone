<template>
    <Layout :title="'证书查询'">
        <van-cell-group style="margin-top: -1px;">
            <van-field label="姓名" v-model="name" placeholder="请输入姓名" clearable required />
            <van-cell title="查询方式" :value="typeValue" @click="showTypeSelect">
                <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon van-cell__right-icon--down" />
            </van-cell>
            <van-field v-show="type === '0'" label="身份证" v-model="identifier" placeholder="请输入身份证" clearable required />
            <van-field v-show="type !== '0'" label="证书编号" v-model="certifateCode" placeholder="请输入证书编号" clearable required />
        </van-cell-group>
        <div class="submit">
            <van-button size="large" type="primary" @click="queryCertificate">查 询</van-button>
        </div>
        <template v-if="hasData">
            <h2 class="van-doc-demo-block__title">基本信息</h2>
            <van-cell-group style="margin-top: -1px;">
                <van-field label="姓名" :value="renderData.username" disabled />
                <van-field label="性别" :value="renderData.sex" disabled />
                <van-cell title="照片" value="点击查看" @click="showImage(renderData.imgUrl)">
                    <van-icon slot="right-icon" name="browsing-history" class="van-cell__right-icon" />
                </van-cell>
                <van-field label="身份证号" :value="renderData.certId" disabled />
                <van-field label="出生日期" :value="renderData.birth" disabled />
            </van-cell-group>
            <h2 class="van-doc-demo-block__title">获证信息({{renderData.certifications.length}}条记录)</h2>
            <template v-if="renderData.certifications.length > 0">
                <div class="box" v-for="item in renderData.certifications">
                    <van-cell-group style="margin-top: -1px;">
                        <van-field label="证书类型" :value="item.cerType" disabled />
                        <van-field label="岗位名称" :value="item.cerName" disabled />
                        <van-field label="证书编号" :value="item.cerNo" disabled />
                        <van-field label="级别" :value="item.cerLevel" disabled />
                        <van-field label="成绩" :value="item.cerReport" disabled />
                        <van-field label="文化程度" :value="item.education" disabled />
                        <van-field label="获证时间" :value="item.getCerTime" disabled />
                        <van-field label="发证机构" :value="item.issuingAgency" disabled />
                        <van-field label="备注说明" :value="item.remark" disabled />
                    </van-cell-group>
                </div>
            </template>
        </template>
        <van-actionsheet v-model="show" :actions="actions"  cancel-text="取消" />
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryCerti } from '@/api/service'
    import { Toast, Field, CellGroup, Button, Cell, Icon, Actionsheet, ImagePreview } from 'vant';
    export default {
        name: 'certifateQuery',
        computed: {
            typeValue() {
                return this.type === '0' ? '身份证' : '证书编号'
            },
            value() {
                return this.type === '0' ? this.identifier : this.certifateCode
            }
        },
        data() {
            return {
                name: '',
                identifier: '',
                certifateCode: '',
                type: '0',
                show: false,
                hasData: false,
                renderData: {
                    username: '',
                    sex: '',
                    certId: '',
                    birth: '',
                    imgUrl: '',
                    certifications: []
                },
                actions: [
                    {
                        name: '身份证',
                        callback: this.onClick
                    },
                    {
                        name: '证书编码',
                        callback: this.onClick
                    }
                ]
            }
        },
        methods: {
            showImage(url) {
                ImagePreview([ url ])
            },
            showTypeSelect() {
                this.show = true
            },
            onClick(item) {
                this.type = item.name === '身份证' ? '0' : '1'
                this.$nextTick(() => {
                    this.show = false
                })
            },
            // 通过名称name
            queryCertificate() {
                if (!this.name) {
                    Toast('请输入姓名')
                    return
                }
                if (!this.value) {
                    Toast('请输入身份证或证书编码')
                    return
                }
                let obj = { name: this.name, type: this.type, typeValue: this.typeValue, value: this.value }
                Toast.loading()
                queryCerti(obj).then(res => {
                    console.log(res)
                    if (res.success && res.data) {
                        this.hasData = true
                        this.renderData.username = res.data.username
                        this.renderData.sex = res.data.sex
                        this.renderData.certId = res.data.certId
                        this.renderData.birth = res.data.birth
                        this.renderData.imgUrl = res.data.imgUrl
                        this.renderData.certifications.splice(0, this.renderData.certifications.length)
                        this.renderData.certifications.push(...res.data.certifications)
                    } else {
                        this.hasData = false
                    }
                    this.$nextTick(() => {
                        Toast.clear()
                    })
                })
            }
        },
        components: {
            Layout,
            [Field.name]: Field,
            [Button.name]: Button,
            [Cell.name]: Cell,
            [Icon.name]: Icon,
            [Actionsheet.name]: Actionsheet,
            [ImagePreview.name]: ImagePreview,
            [CellGroup.name]: CellGroup
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .van-doc-demo-block__title {
        font-weight: 400;
        font-size: 14px;
        color: rgba(69, 90, 100, 0.6);
        padding: 5px;
        /*border: 1px solid #e5e5e5;*/
        margin: 20px auto 0;
        width: 95%;
    }
    .box {
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        width: 95%;
        margin: 0 auto 10px;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .submit {
        text-align: center;
        margin: 10px 0;
        .van-button--large {
            width: 95%;
            height: 35px;
            line-height: 33px;
        }
    }
    .van-cell__right-icon--down::before {
        transform: rotate(90deg);
    }
</style>