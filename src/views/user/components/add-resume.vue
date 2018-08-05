<template>
    <div class="add-resume">
        <div class="title">基础信息</div>
        <van-cell-group>
            <van-field label="姓名" v-model="form.name" placeholder="请输入姓名" required clearable/>
            <van-field label="出生日期" v-model="form.birth" placeholder="请输入出生日期" required clearable/>
            <van-field label="手机" v-model="form.phoneNumber" placeholder="请输入手机" required clearable/>
            <van-field label="性别" v-model="form.sex" placeholder="请输入性别" required clearable/>
            <van-field label="名族" v-model="form.nameFamily" placeholder="请输入名族" required clearable/>
            <van-field label="邮箱" v-model="form.email" placeholder="请输入邮箱" required clearable/>
            <van-field label="户籍" v-model="form.householdRegister" placeholder="请输入户籍" required clearable/>
            <van-field label="身高" v-model="form.height" placeholder="请输入身高" required clearable/>
            <van-field label="QQ" v-model="form.qq" placeholder="请输入QQ" required clearable/>
            <van-field label="体重" v-model="form.weight" placeholder="请输入体重" required clearable/>
            <van-field label="政治面貌" v-model="form.politicalOutlook" placeholder="请输入政治面貌" required clearable/>
            <van-field label="学历" v-model="form.education" placeholder="请输入学历" required clearable/>
            <van-field label="固话" v-model="form.faxedLine" placeholder="请输入固话" required clearable/>
            <van-field label="毕业时间" v-model="form.universityGraduatedFrom" placeholder="请输入毕业时间" required clearable/>
            <van-field label="毕业院校" v-model="form.birth" placeholder="请输入毕业院校" required clearable/>
            <van-field label="身份证" v-model="form.certificate" placeholder="请输入身份证" required clearable/>
            <van-field label="专业" v-model="form.major" placeholder="请输入专业" required clearable/>
            <van-field label="现有职称" v-model="form.technicalTitle" placeholder="请输入现有职称" required clearable/>
            <van-field label="第二专业" v-model="form.secondMajor" placeholder="请输入第二专业" required clearable/>
            <van-field label="现居住地" v-model="form.placeResidence" placeholder="请输入现居住地" required clearable/>
            <van-field label="求职意向" v-model="form.jobIntention" placeholder="请输入求职意向" required clearable/>
            <van-field label="期望薪资" v-model="form.expectSalary" placeholder="请输入期望薪资" required clearable/>
            <van-field label="职位" v-model="form.job" placeholder="请输入职位" required clearable/>
            <van-field label="希望工作地区" v-model="form.expectedArea" placeholder="请输入希望工作地区" required clearable/>
            <van-field label="到岗时间" v-model="form.postTime" placeholder="请输入到岗时间" required clearable/>
        </van-cell-group>

        <div class="title" style="margin-top: 10px;">工作经验 <van-icon name="add-o" @click="addWordExperience"/></div>
        <template v-if="form.handsOnWorkExperience.length > 0">
            <van-cell-group v-for="(item, index) in form.handsOnWorkExperience" :key="'handsOnWorkExperience_' + index" style="margin-bottom:10px">
                <van-field label="入职时间" v-model="item.entryTime" placeholder="请输入入职时间" required clearable/>
                <van-field label="离职时间" v-model="item.departureTime" placeholder="请输入离职时间" required clearable/>
                <van-field label="公司" v-model="item.company" placeholder="请输入公司" required clearable/>
                <van-field label="职位" v-model="item.job" placeholder="请输入职位" required clearable/>
                <van-field label="工作描述" v-model="item.jobDes" placeholder="请输入工作描述" required clearable/>
                <van-field label="离职原因" v-model="item.reseanForLeaving" placeholder="请输入离职原因" required clearable/>
                <div class="delete-btn" @click="deleteExperience(index)">删除该项</div>
            </van-cell-group>
        </template>
        <template v-else>
            <div class="no-msg">暂未添加工作经验</div>
        </template>
        <div class="title" style="margin-top: 10px;">教育/培训经历 <van-icon name="add-o" @click="addEducationExperience"/></div>
        <template v-if="form.educationExperience.length > 0">
            <van-cell-group v-for="(item, index) in form.educationExperience" :key="'educationExperience_' + index" style="margin-bottom:10px">
                <van-field label="入学时间" v-model="item.enrolmentTime" placeholder="请输入入学时间" required clearable/>
                <van-field label="毕业时间" v-model="item.graduationTime" placeholder="请输入毕业时间" required clearable/>
                <van-field label="学校" v-model="item.school" placeholder="请输入学校" required clearable/>
                <van-field label="学历" v-model="item.education" placeholder="请输入学历" required clearable/>
                <van-field label="专业" v-model="item.major" placeholder="请输入专业" required clearable/>
                <van-field label="专业描述" v-model="item.professionalDes" placeholder="请输入专业描述" required clearable/>
                <div class="delete-btn" @click="deleteEducation(index)">删除该项</div>
            </van-cell-group>
        </template>
        <template v-else>
            <div class="no-msg">暂未添加教育/培训经历</div>
        </template>
        <div class="title" style="margin-top: 10px;">自我介绍</div>
        <van-cell-group>
            <van-field label="工作技能" v-model="form.workingSkills" placeholder="请输入工作技能" required clearable/>
            <van-field label="自我评价" v-model="form.selfEvalution" type="textarea" placeholder="请输入自我评价" required clearable/>
        </van-cell-group>
        <div class="submit">
            <van-button size="small" type="primary" @click="resumeEditSubmit">提交</van-button>
        </div>
    </div>
</template>
<script>
    import Layout from '@/views/layout/layout'
    import {Toast, Field, Button, Cell, CellGroup, Area, Popup, Actionsheet, Icon} from 'vant';
    import {editResumeSubmit} from '@/api/service'
    export default {
        name: 'addResume',
        props: {
            form: {
                type: Object,
                default: () => {
                    return {
                        id: '',
                        name: '',
                        birth: '',
                        phoneNumber: '',
                        sex: '',
                        nameFamily: '',
                        email: '',
                        householdRegister: '',
                        height: '',
                        qq: '',
                        weight: '',
                        politicalOutlook: '',
                        education: '',
                        faxedLine: '',
                        graduationTime: '',
                        universityGraduatedFrom: '',
                        certificate: '',
                        major: '',
                        technicalTitle: '',
                        secondMajor: '',
                        placeResidence: '',
                        jobIntention: '',
                        expectSalary: '',
                        job: '',
                        expectedArea: '',
                        postTime: '',
                        handsOnWorkExperience: [],
                        educationExperience: [],
                        workingSkills: '',
                        selfEvalution: ''
                    }
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            deleteEducation(i) {
                this.form.educationExperience.splice(i, 1)
            },
            deleteExperience(i) {
                this.form.handsOnWorkExperience.splice(i, 1)
            },
            addWordExperience() {
                this.form.handsOnWorkExperience.push({
                    entryTime: '',
                    departureTime: '',
                    company: '',
                    job: '',
                    jobDes: '',
                    reseanForLeaving: ''
                })
            },
            addEducationExperience() {
                this.form.educationExperience.push({
                    enrolmentTime: '',
                    graduationTime: '',
                    school: '',
                    education: '',
                    major: '',
                    professionalDes: ''
                })
            },
            resumeEditSubmit() {
                Toast.loading()
                let ms = '新增'
                if (this.form.id) {
                    ms = '修改'
                }
                editResumeSubmit(Object.assign(this.form, {userId: this.$store.state.user.id})).then(res => {
                    if (res.success) {
                        Toast.success('职位' + ms + '成功')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    } else {
                        Toast.fail('简历' + ms + '失败:' + res.message)
                    }
                })
            },
        },
        components: {
            Layout,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Area.name]: Area,
            [Popup.name]: Popup,
            [Actionsheet.name]: Actionsheet,
            [Icon.name]: Icon,
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .add-resume {
        .delete-btn {
            text-align: center;
            width: 100px;
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            color: #666;
            border: 1px solid #666;
            border-radius: 5px;
            margin: 5px auto;
        }
        .no-msg {
            font-size: 13px;
            text-align: center;
            color: #666;
            line-height: 35px;
        }
        .title {
            color: #f44;
            font-size: 14px;
            position: relative;
            padding: 10px;
            .van-icon {
                float: right;
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
    .add-job {
        .van-cell__right-icon::before {
            transform: rotate(90deg);
        }
    }
</style>