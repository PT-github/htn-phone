<template>
    <Layout :title="'招揽人才'">
        <div class="resume-detail news-detail">
            <div class="title">基本信息</div>
            <div class="box">
                <div class="flex">
                    <div class="left">姓名</div>
                    <div class="right">{{ resume.name }}</div>
                </div>
                <div class="flex">
                    <div class="left">生日</div>
                    <div class="right">{{ resume.birth }}</div>
                </div>
                <div class="flex">
                    <div class="left">性别</div>
                    <div class="right">{{ resume.sex }}</div>
                </div>
                <div class="flex">
                    <div class="left">电话号码</div>
                    <div class="right">{{ resume.phoneNumber }}</div>
                </div>
                <div class="flex">
                    <div class="left">名族</div>
                    <div class="right">{{ resume.nameFamily }}</div>
                </div>
                <div class="flex">
                    <div class="left">邮箱</div>
                    <div class="right">{{ resume.email }}</div>
                </div>
                <div class="flex">
                    <div class="left">家庭住址</div>
                    <div class="right">{{ resume.householdRegister }}</div>
                </div>
                <div class="flex">
                    <div class="left">身高</div>
                    <div class="right">{{ resume.height }}</div>
                </div>
                <div class="flex">
                    <div class="left">体重</div>
                    <div class="right">{{ resume.weight }}</div>
                </div>
                <div class="flex">
                    <div class="left">QQ</div>
                    <div class="right">{{ resume.qq }}</div>
                </div>
                <div class="flex">
                    <div class="left">姓名</div>
                    <div class="right">{{ resume.name }}</div>
                </div>
                <div class="flex">
                    <div class="left">政治面貌</div>
                    <div class="right">{{ resume.politicalOutlook }}</div>
                </div>
                <div class="flex">
                    <div class="left">学历</div>
                    <div class="right">{{ resume.education }}</div>
                </div>
                <div class="flex">
                    <div class="left">毕业时间</div>
                    <div class="right">{{ resume.graduationTime }}</div>
                </div>
                <div class="flex">
                    <div class="left">毕业院校</div>
                    <div class="right">{{ resume.universityGraduatedFrom }}</div>
                </div>
                <div class="flex">
                    <div class="left">专业</div>
                    <div class="right">{{ resume.major }}</div>
                </div>
                <div class="flex">
                    <div class="left">到岗时间</div>
                    <div class="right">{{ resume.postTime }}</div>
                </div>
            </div>
            <div class="title">工作经验</div>
            <div class="box border">
                <div class="work" v-for="item in resume.handsOnWorkExperience">
                    <div class="flex">
                        <div class="left">入职时间</div>
                        <div class="right">{{ item.entryTime }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">离职时间</div>
                        <div class="right">{{ item.departureTime }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">公司</div>
                        <div class="right">{{ item.company }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">职位</div>
                        <div class="right">{{ item.job }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">工作描述</div>
                        <div class="right">{{ item.jobDes }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">离职原因</div>
                        <div class="right">{{ item.reseanForLeaving }}</div>
                    </div>
                </div>
            </div>
            <div class="title">教育经历</div>
            <div class="box border">
                <div class="work" v-for="item in resume.educationExperience">
                    <div class="flex">
                        <div class="left">入学时间</div>
                        <div class="right">{{ item.enrolmentTime }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">毕业时间</div>
                        <div class="right">{{ item.graduationTime }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">学校</div>
                        <div class="right">{{ item.school }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">学历</div>
                        <div class="right">{{ item.education }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">专业</div>
                        <div class="right">{{ item.major }}</div>
                    </div>
                    <div class="flex">
                        <div class="left">专业描述</div>
                        <div class="right">{{ item.professionalDes }}</div>
                    </div>
                </div>
            </div>
            <div class="title">工作技能</div>
            <div class="content" v-if="resume.workingSkills">{{ resume.workingSkills }}</div>
            <div class="title">自我评价</div>
            <div class="content">{{ resume.selfEvalution }}</div>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import { queryResumeDetail } from '@/api/service'
    import { Toast } from 'vant';
    export default {
        name: 'resumeDetail',
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
                queryResumeDetail({id: this.$route.query.id}).then((response) => {
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
    .resume-detail {
        padding: 0 5px 5px;
        font-size: 13px;
        .box {
            .work {
                border: 1px solid #CCC;
                margin: 10px 0;
                padding: 0 5px;
                .flex {
                    &:last-child {
                        border: 0;
                    }
                }
            }
            .flex {
                display: flex;
                line-height: 30px;
                border-bottom: 1px dotted rgba(204, 204, 204, .6);
                .left {
                    width: 80px;
                }
                .right {
                    flex: 1;
                }
            }

        }
        .content {
            line-height: 30px;
            text-indent: 13px;
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: break-all;
        }
        .title {
            color: #ff7e3e;
            line-height: 40px;
            border-bottom: 1px solid #ff7e3e;
            font-weight: bold;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">

</style>
