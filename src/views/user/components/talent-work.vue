<template>
    <div class="enterpise-baseinfo" >
        <van-tabs v-model="active">
            <van-tab :title="'我的简历'">
                <div class="table-box" v-for="(item, index) in resume" :key="'resume_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/resume-detail', query: {id: item.id}}">{{ item.name }}</router-link>
                    </div>
                    <div class="flex">
                        <div class="label">公开程度：</div>
                        <div class="value">{{ item.openness }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="getResumeDetail(item.id)">编辑</span>
                            <span @click="refreshFun(item.id)">刷新</span>
                            <span @click="deleteFun(item.id)">删除</span>
                        </div>
                    </div>
                </div>
                <div class="add-btn" @click="addResumeFun">+</div>
            </van-tab>
            <van-tab :title="'职位收藏夹'">
                <div class="table-box" v-for="(item, index) in collectList" :key="'collectList_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/job-detail', query: {id: item.id}}">{{ item.job }}</router-link>
                    </div>
                    <div class="flex">
                        <div class="label">公司名：</div>
                        <div class="value">{{ item.company }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">工作地点：</div>
                        <div class="value">{{ item.place }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">薪资：</div>
                        <div class="value">{{ item.salary }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="applyJob(item.id)">申请</span>
                            <span @click="deleteJob(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'申请记录'">
                <div class="table-box" v-for="(item, index) in jobApplyRecods" :key="'jobApplyRecods_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/job-detail', query: {id: item.id}}">{{ item.job }}</router-link>
                    </div>
                    <div class="flex">
                        <div class="label">公司名：</div>
                        <div class="value">{{ item.company }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">工作地点：</div>
                        <div class="value">{{ item.place }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">薪资：</div>
                        <div class="value">{{ item.salary }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="applyJob(item.id)">再次申请</span>
                            <span @click="deleteApplyRecords(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'面试机会'">
                <div class="table-box" v-for="(item, index) in invitedChance" :key="'invitedChance_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/job-detail', query: {id: item.id}}">{{ item.job }}</router-link>
                    </div>
                    <div class="flex">
                        <div class="label">公司名：</div>
                        <div class="value">{{ item.company }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">工作地点：</div>
                        <div class="value">{{ item.place }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">薪资：</div>
                        <div class="value">{{ item.salary }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="applyJob(item.id)">再次申请</span>
                            <span @click="deleteInterviewRecords(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'简历查看率'">
                <div class="table-box" v-for="(item, index) in lookedRecords" :key="'lookedRecords_' + index">
                    <div class="title">
                        <router-link tag="a" :to="{path: '/resume-detail', query: {id: item.id}}">{{ item.vitaeName }}</router-link>
                    </div>
                    <div class="flex">
                        <div class="label">公司名：</div>
                        <div class="value">{{ item.companyName }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">查看次数：</div>
                        <div class="value">{{ item.lookNum }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">查看时间：</div>
                        <div class="value">{{ item.updateTime }}</div>
                    </div>
                    <div class="flex">
                        <div class="label">操作：</div>
                        <div class="value">
                            <span @click="deleteLookedRecordsById(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <van-popup v-model="showAddResume" position="right" :overlay="false" style="width: 100%;height: 100%;">
            <van-nav-bar :title="'新增简历'" left-text="返回" left-arrow @click-left="onClickLeft"/>
            <div class="exchange-pop_content">
                <add-resume :form="formData"></add-resume>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import { Tab, Tabs, Cell, CellGroup, Toast, Field, Button, Icon, ImagePreview, Popup, NavBar, Loading } from 'vant';
    import { queryResumeDetail, deleteLookedRecords, queryLookedRecords, deleteInvitedChance, queryInvitedChance, deleteJobApplyRecods, queryMyResume, refreshMyResume, deleteMyResume, queryCollectJobs, applyJob, deleteCollectJobs, queryJobApplyRecods } from '@/api/service'
    import addResume from './add-resume'
    export default {
        name: 'enterpiseBaseinfo',
        data() {
            return  {
                active: 0,
                resume: [],
                collectList: [],
                jobApplyRecods: [],
                invitedChance: [],
                lookedRecords: [],
                showAddResume: false,
                formData: {
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
        },
        mounted() {
            Toast.loading('数据加载中...')
            Promise.all([this.getLookedRecords(), this.getInvitedChance(), this.getMyResume(), this.getCollectJobs(), this.getJobApplyRecods()]).then(() => {
                Toast.clear()
            })
        },
        methods: {
            onClickLeft() {
                this.showAddResume = false
            },
            getResumeDetail(id) {
                if (id === this.formData.id) {
                    this.showAddResume = true
                    return
                }
                this.$toast.loading()
                queryResumeDetail({id: id}).then((res) => {
                    console.log(res)
                    Toast.clear()
                    let data = res.data
                    this.formData.id = data.id
                    this.formData.name = data.name || ''
                    this.formData.birth = data.birth || ''
                    this.formData.phoneNumber = data.phoneNumber || ''
                    this.formData.sex = data.sex || ''
                    this.formData.nameFamily = data.nameFamily || ''
                    this.formData.email = data.email || ''
                    this.formData.householdRegister = data.householdRegister || ''
                    this.formData.height = data.height || ''
                    this.formData.weight = data.weight || ''
                    this.formData.qq = data.qq || ''
                    this.formData.politicalOutlook = data.politicalOutlook || ''
                    this.formData.education = data.education || ''
                    this.formData.faxedLine = data.faxedLine || ''
                    this.formData.graduationTime = data.graduationTime || ''
                    this.formData.universityGraduatedFrom = data.universityGraduatedFrom || ''
                    this.formData.certificate = data.certificate || ''
                    this.formData.major = data.major || ''
                    this.formData.technicalTitle = data.technicalTitle || ''
                    this.formData.secondMajor = data.secondMajor || ''
                    this.formData.placeResidence = data.placeResidence || ''
                    this.formData.jobIntention = data.jobIntention || []
                    this.formData.expectSalary = data.expectSalary || ''
                    this.formData.job = data.job || ''
                    this.formData.expectedArea = data.expectedArea || ''
                    this.formData.postTime = data.postTime || ''
                    if (data.handsOnWorkExperience && data.handsOnWorkExperience.length > 0) {
                        this.formData.handsOnWorkExperience.splice(0, this.formData.handsOnWorkExperience.length)
                        this.formData.handsOnWorkExperience.push(...data.handsOnWorkExperience)
                    }
                    if (data.educationExperience && data.educationExperience.length > 0) {
                        this.formData.educationExperience.splice(0, this.formData.educationExperience.length)
                        this.formData.educationExperience.push(...data.educationExperience)
                    }
                    this.formData.workingSkills = data.workingSkills || ''
                    this.formData.selfEvalution = data.selfEvalution || ''
                    this.$nextTick(() => {
                        this.showAddResume = true
                    })
                }).catch(() => {
                    Toast.clear()
                })
            },
            addResumeFun() {
                this.formData.id = ''
                this.formData.name = ''
                this.formData.birth = ''
                this.formData.phoneNumber = ''
                this.formData.sex = ''
                this.formData.nameFamily = ''
                this.formData.email = ''
                this.formData.householdRegister = ''
                this.formData.height = ''
                this.formData.qq = ''
                this.formData.weight = ''
                this.formData.politicalOutlook = ''
                this.formData.education = ''
                this.formData.faxedLine = ''
                this.formData.graduationTime = ''
                this.formData.universityGraduatedFrom = ''
                this.formData.certificate = ''
                this.formData.major = ''
                this.formData.technicalTitle = ''
                this.formData.secondMajor = ''
                this.formData.placeResidence = ''
                this.formData.jobIntention = ''
                this.formData.expectSalary = ''
                this.formData.job = ''
                this.formData.expectedArea = ''
                this.formData.postTime = ''
                this.formData.handsOnWorkExperience = []
                this.formData.educationExperience = []
                this.formData.workingSkills = ''
                this.formData.selfEvalution = ''
                this.$nextTick(() => {
                    this.showAddResume = true
                })
            },
            deleteLookedRecordsById(id) {
                this.$toast.loading({duration: 0})
                deleteLookedRecords({jobId: id, userId: this.$store.state.user.id}).then(res => {
                    if (res.success) {
                        this.getLookedRecords().then(() => {
                            Toast.clear()
                        })
                    } else {
                        this.$toast.fail('记录删除失败')
                    }
                })
            },
            deleteInterviewRecords(id) {
                this.$toast.loading({duration: 0})
                deleteInvitedChance({jobId: id, userId: this.$store.state.user.id}).then(res => {
                    if (res.success) {
                        this.getInvitedChance().then(() => {
                            Toast.clear()
                        })
                    } else {
                        this.$toast.fail('记录删除失败')
                    }
                })
            },
            deleteApplyRecords(id) {
                this.$toast.loading({duration: 0})
                deleteJobApplyRecods({jobId: id, userId: this.$store.state.user.id}).then(res => {
                    if (res.success) {
                        this.getJobApplyRecods().then(() => {
                            Toast.clear()
                        })
                    } else {
                        this.$toast.fail('记录删除失败')
                    }
                })
            },
            deleteJob(id) {
                this.$toast.loading('职位删除中...')
                deleteCollectJobs({jobId: id, userId: this.$store.state.user.id}).then(res => {
                    Toast.clear()
                    if (res.success) {
                        this.getCollectJobs().then(() => {
                            this.$toast.success('职位删除成功')
                        })
                    } else {
                        this.$toast.fail('职位删除失败')
                    }
                })
            },
            applyJob(id) {
                this.$toast.loading('职位申请中...')
                applyJob({jobId: id, userId: this.$store.state.user.id}).then(res => {
                    Toast.clear()
                    if (res.success) {
                        this.$toast.success('职位申请成功')
                    } else {
                        this.$toast.fail('职位申请失败')
                    }
                })
            },
            getLookedRecords() {
                return queryLookedRecords({id: this.$store.state.user.id}).then(res => {
                    if (res.list && res.list.length > 0) {
                        this.lookedRecords.splice(0, this.lookedRecords.length)
                        this.lookedRecords.push(...res.list)
                    }
                })
            },
            // 我的面试机会
            getInvitedChance() {
                return queryInvitedChance({id: this.$store.state.user.id}).then(res => {
                    if (res.list && res.list.length > 0) {
                        this.invitedChance.splice(0, this.invitedChance.length)
                        this.invitedChance.push(...res.list)
                    }
                })
            },
            getJobApplyRecods() {
                return queryJobApplyRecods({id: this.$store.state.user.id}).then(res => {
                    if (res.list && res.list.length > 0) {
                        this.jobApplyRecods.push(...res.list)
                    }
                })
            },
            // 职位收藏夹
            getCollectJobs() {
                return queryCollectJobs({id: this.$store.state.user.id}).then(res => {
                    if (res.list && res.list.length > 0) {
                        this.collectList.splice(0, this.collectList.length)
                        this.collectList.push(...res.list)
                    }
                })
            },
            deleteFun(id) {
                this.$toast.loading({duration: 0, mask: true})
                deleteMyResume({id}).then(res => {
                    if (res.success) {
                        this.getMyResume().then(() => {
                            Toast.success('简历删除成功')
                        })
                    } else {
                        Toast.fail('简历删除失败:' + res.message)
                    }
                })
            },
            refreshFun(id) {
                this.$toast.loading({duration: 0, mask: true})
                refreshMyResume({id}).then(res => {
                    Toast.clear()
                    if (res.success) {
                        Toast.success('简历刷新成功')
                    } else {
                        Toast.fail('简历刷新失败:' + res.message)
                    }
                })
            },
            getMyResume() {
                return queryMyResume({id: this.$store.state.user.id}).then(res => {
                    this.resume.splice(0, this.resume.length)
                    this.resume.push(...res.list)
                })
            },
        },
        components: {
            addResume,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Cell.name]: Cell,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: CellGroup,
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [NavBar.name]: NavBar,
            [Loading.name]: Loading,
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .exchange-pop_content {
        position: absolute;
        top: 46px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
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
        color: #FFF;
        font-size: 30px;
    }
    .exchange-pop_content {
        position: absolute;
        top: 46px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .enterpise-baseinfo {
        height: 100%;
        .company-pic {
            img {
                max-width: 95%;
                display: block;
                margin: 10px auto;
            }
        }
        .submit {
            .van-button--small {
                width: 94%;
                margin: 10px 3%;
            }
        }
        .table-box-container {
            background-color: #FFF;
        }
        .table-box {
            border: 1px solid rgba(204, 204, 204, 0.5);
            border-radius: 5px;
            font-size: 14px;
            margin: 10px;
            padding: 5px 10px 10px;
            background-color: #FFF;
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
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .enterpise-baseinfo {
        .van-nav-bar__text {
            color: #333;
        }
        .van-icon {
            color: #333;
        }
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
            background-color: rgba(239, 239, 239, .5);
        }
    }
</style>