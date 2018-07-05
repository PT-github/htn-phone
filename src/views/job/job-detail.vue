<template>
    <Layout :title="'职位详情'">
        <div class="job-detail">
            <div class="job-top">
                <div class="name">{{ resume.name }}</div>
                <div class="workingLife">{{ resume.workingLife }}</div>
            </div>
            <div class="salary">{{ resume.salary }}</div>
            <div class="requirement clearfix">
                <span>{{ resume.numberRecruits }}</span><span>{{ resume.workingLife }}</span><span>{{ resume.workPlace }}</span>
            </div>
            <div class="jobDescription bg">
                <div class="title">职位描述</div>
                <div class="des">
                    {{ resume.jobDescription }}
                </div>
            </div>
            <div class="companyInfo bg">
                <div class="title">公司简介</div>
                <div class="des">
                    {{ resume.companyInfo }}
                </div>
            </div>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryJobDetail } from '@/api/service'
    import { Toast } from 'vant';
    export default {
        name: 'jobDetail',
        mounted() {
            this.getResumeDetail()
        },
        data() {
            return {
                resume: {}
            }
        },
        methods: {
            getResumeDetail() {
                Toast.loading()
                queryJobDetail({id: this.$route.params.id}).then((response) => {
                    Toast.clear()
                    if (response.success) {
                        this.resume = response.data
                    }

                }).catch((error) => {
                    Toast.clear()
                    console.log(error)
                })
            }
        },
        components: {
            Layout
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .job-detail {
        background-color: #f6f6f5;
        .bg {
            background-color: #fff;
            .des {
                font-size: 14px;
                line-height: 20px;
                padding: 11px 11px 0px;
            }
            .title {
                position: relative;
                height: 48px;
                padding-left: 30px;
                line-height: 48px;
                font-size: 15px;
                border-bottom: 1px solid #e6e6e6;
                margin: 0 11px;
                &:before {
                    content: '';
                    position: absolute;
                    width: 22px;
                    height: 20px;
                    left: 0;
                    top: 50%;
                    margin-top: -10px;
                    background: url(/static/imgs/icon_title.png) 0 1px no-repeat;
                    background-size: 22px auto;
                }
            }
        }
        .requirement {
            background-color: #FFF;
            padding: 0 11px;
            margin-bottom: 6px;
            span {
                position: relative;
                float: left;
                padding-right: 10px;
                line-height: 24px;
                color: #868686;
                font-size: 12px;
            }
        }
        .salary {
            background-color: #FFF;
            height: 32px;
            padding-left: 11px;
            color: #ff6000;
            line-height: 32px;
        }
        .job-top {
            background-color: #FFF;
            display: flex;
            padding: 15px 11px 10px;
            .name {
                flex: 1;
                font-size: 15px;
                font-weight: bold;
                line-height: 26px;
                max-height: 78px;
                overflow: hidden;
                word-wrap: break-word;
                word-break: break-all;
            }
            .workingLife {
                width: 84px;
                font-size: 12px;
                color: #868686;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                line-height: 20px;
                text-align: right;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">

</style>