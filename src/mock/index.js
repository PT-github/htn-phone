import Mock from 'mockjs'
import api from './home'
Mock.setup({
    timeout: '500'
})
// 拦截首页接口请求
Mock.mock(/\/queryPoster/, 'post', api.queryPoster)
Mock.mock(/\/queryNews$/, 'post', api.queryNews)
Mock.mock(/\/queryLessons/, 'post', api.queryLessons)
Mock.mock(/\/queryTeachers$/, 'post', api.queryTeachers)
Mock.mock(/\/queryJobs$/, 'post', api.queryJobs)
Mock.mock(/\/queryCompany$/, 'post', api.queryCompany)
Mock.mock(/\/queryTalents/, 'post', api.queryTalents)
Mock.mock(/\/queryFriendShips/, 'post', api.queryFriendShips)
Mock.mock(/\/queryVideos/, 'post', api.queryVideos)

//拦截新闻二级页面接口请求
Mock.mock(/\/queryWorkDynamics/, 'post', api.queryWorkDynamics)
Mock.mock(/\/queryNoticeList/, 'post', api.queryNoticeList)
Mock.mock(/\/queryIndustryInfos/, 'post', api.queryIndustryInfos)
Mock.mock(/\/queryPoliticalAndRegulations/, 'post', api.queryPoliticalAndRegulations)
Mock.mock(/\/queryTrainingAndDemeanor/, 'post', api.queryTrainingAndDemeanor)
Mock.mock(/\/queryLatestNews/, 'post', api.queryLatestNews)
Mock.mock(/\/queryNewsDetail/, 'post', api.queryNewsDetail)
Mock.mock(/\/queryNewsListByCategory/, 'post', api.queryNewsListByCategory)
//用户模块
Mock.mock(/\/login$/, 'post', api.login)
Mock.mock(/\/user\/loginByCode$/, 'post', api.login)
Mock.mock(/\/user\/regAction$/, 'post', api.login)
Mock.mock(/\/user\/logout/, 'post', api.login)
Mock.mock(/\/cert\/queryCertificate$/, 'post', api.queryCertificate)
Mock.mock(/\/home\/searchByKeywords/, 'post', api.searchByKeywords)
// 教育培训
Mock.mock(/\/queryLessonCategory$/, 'post', api.queryLessonCategory)
Mock.mock(/\/queryLessonByCategory$/, 'post', api.queryLessonByCategory)
Mock.mock(/\/train\/queryTrainList/, 'post', api.queryProject)
Mock.mock(/\/teacher\/queryTeacherList$/, 'post', api.queryTeachersByPage)
Mock.mock(/\/video\/queryVideoKind/, 'post', api.queryCategory)
Mock.mock(/\/video\/queryVideoList/, 'post', api.queryVideoByCategory)
Mock.mock(/\/lesson\/queryLessonDetail/, 'post', api.queryLessonDetail)
Mock.mock(/\/train\/queryProjectDetail/, 'post', api.queryProjectDetail)
Mock.mock(/\/queryTeacherDetail$/, 'post', api.queryTeacherDetail)
// 招聘人才
Mock.mock(/\/talent\/queryFilterOptions/, 'post', api.queryFilterOptions)
Mock.mock(/\/talent\/queryResume$/, 'post', api.queryResume)
Mock.mock(/\/personel\/invateInterViewByIds/, 'post', api.invateInterViewByIds)
Mock.mock(/\/personel\/collectResumesByIds/, 'post', api.collectResumesByIds)
Mock.mock(/\/talent\/queryResumeDetail/, 'post', api.queryResumeDetail)


// 找工作
Mock.mock(/\/position\/queryJobsByPage/, 'post', api.queryJobsByPage)
Mock.mock(/\/personel\/applyJob/, 'post', api.invateInterViewByIds)
Mock.mock(/\/personel\/collectJobs/, 'post', api.invateInterViewByIds)
Mock.mock(/\/position\/queryJobDetail/, 'post', api.queryJobDetail)


Mock.mock(/\/company\/queryCompanyMessage/, 'post', api.queryCompanyMessage)
Mock.mock(/\/company\/modifyCompanyPassword$/, 'post', api.modifyCompanyPassword)
Mock.mock(/\/login\/position\/queryPubJobs$/, 'post', api.queryPubJobs)
Mock.mock(/\/login\/position\/refreshCompanyJob$/, 'post', api.queryPubJobs)
Mock.mock(/\/login\/position\/publishCompanyJob/, 'post', api.queryPubJobs)
Mock.mock(/\/login\/position\/revokeCompanyJob/, 'post', api.queryPubJobs)
Mock.mock(/\/login\/position\/deleteCompanyJob/, 'post', api.queryPubJobs)
Mock.mock(/\/company\/addCompanyJob/, 'post', api.queryPubJobs)
Mock.mock(/\/login\/vitae\/queryCollectList/, 'post', api.queryCollectList)
Mock.mock(/\/login\/interview\/queryInterviewList/, 'post', api.queryInterviewList)
Mock.mock(/\/company\/deleteCollectById/, 'post', api.queryInterviewList)
Mock.mock(/\/company\/deleteInterviewById/, 'post', api.queryInterviewList)
Mock.mock(/\/company\/queryApplyRecordList/, 'post', api.queryApplyRecordList)
Mock.mock(/\/company\/queryOwnTalentList/, 'post', api.queryOwnTalentList)
Mock.mock(/\/company\/queryNetWorkTalentList/, 'post', api.queryNetWorkTalentList)
Mock.mock(/\/company\/deleteApplyRecordList/, 'post', api.queryNetWorkTalentList)
Mock.mock(/\/company\/deleteOwnTalentList/, 'post', api.queryNetWorkTalentList)
Mock.mock(/\/company\/deleteNetWorkTalentList/, 'post', api.queryNetWorkTalentList)

