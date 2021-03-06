import request from '@/utils/request'
// =======================首页开始=========================
// 首页左右滑动区域=>获取广告列表
export function queryPoster() {
  return request({
    url: '/home/queryPoster',
    method: 'post'
  })
}
// 首页新闻列表
export function queryNews() {
  return request({
    url: '/home/queryNews',
    method: 'post'
  })
}
// 首页课程列表
export function queryLessons() {
  return request({
    url: '/home/queryLessons',
    method: 'post'
  })
}
// 首页导师列表
export function queryTeachers() {
  return request({
    url: '/home/queryTeachers',
    method: 'post'
  })
}
// 首页热门招聘单位列表
export function queryCompany() {
  return request({
    url: '/home/queryCompany',
    method: 'post'
  })
}
// 首页职位列表
export function queryJobs() {
  return request({
    url: '/home/queryJobs',
    method: 'post'
  })
}
// 首页人才列表
export function queryTalents() {
  return request({
    url: '/home/queryTalents',
    method: 'post'
  })
}

// 首页友情链接列表
export function queryFriendShips() {
	return request({
		url: '/home/queryFriendShips',
		method: 'post'
	})
}

// 首页视频列表
export function queryVideos() {
	return request({
		url: '/home/queryVideos',
		method: 'post'
	})
}

// =======================首页结束=========================


// =======================新闻二级页面开始=========================
// 工作动态列表
export function queryWorkDynamics() {
    return request({
        url: '/news/queryWorkDynamics',
        method: 'post'
    })
}
// 通知列表
export function queryNoticeList() {
    return request({
        url: '/news/queryNoticeList',
        method: 'post'
    })
}
// 行业资讯列表
export function queryIndustryInfos() {
    return request({
        url: '/news/queryIndustryInfos',
        method: 'post'
    })
}
// 政法政规列表
export function queryPoliticalAndRegulations() {
    return request({
        url: '/news/queryPoliticalAndRegulations',
        method: 'post'
    })
}
// 培训风采列表
export function queryTrainingAndDemeanor(data) {
    return request({
        url: '/news/queryTrainingAndDemeanor',
        method: 'post',
        data: data
    })
}
// 最新新闻-滚图列表
export function queryLatestNews() {
    return request({
        url: '/news/queryLatestNews',
        method: 'post'
    })
}
// 新闻详情列表
export function queryNewsDetail(params) {
    return request({
        url: '/news/queryNewsDetail',
        method: 'post',
        params: params
    })
}
// 分类新闻列表
export function queryNewsListByCategory(data) {
    return request({
        url: '/news/queryNewsListByCategory',
        method: 'post',
        data: data
    })
}
// =======================新闻二级页面结束=========================


// =======================教育培新页面开始=========================
// 培训项目列表
export function queryProject() {
    return request({
        url: '/education/queryProject',
        method: 'post'
    })
}
// 培训项目列表
export function queryTeachersByPage(data) {
    return request({
        url: '/education/queryTeachersByPage',
        method: 'post',
        data
    })
}
// 获取分类列表
export function queryCategory() {
    return request({
        url: '/education/queryCategory',
        method: 'post'
    })
}
// 通过分类获取视频列表
export function queryVideoByCategory(params) {
    return request({
        url: '/education/queryVideoByCategory',
        method: 'post',
        params: params
    })
}
// =======================教育培新页面结束=========================


// =======================招揽人才开始=========================
// 获取过滤条件
export function queryFilterOptions(data) {
    return request({
        url: '/personel/queryFilterOptions',
        method: 'post',
        data
    })
}
// 获取简历
export function queryResume(data) {
    return request({
        url: '/personel/queryResume',
        method: 'post',
        data
    })
}
// 邀约面试
export function invateInterViewByIds(data) {
    return request({
        url: '/personel/invateInterViewByIds',
        method: 'post',
        data
    })
}
// 简历收藏
export function collectResumesByIds(data) {
    return request({
        url: '/personel/collectResumesByIds',
        method: 'post',
        data
    })
}
// 简历详情
export function queryResumeDetail(params) {
    return request({
        url: '/personel/queryResumeDetail',
        method: 'post',
        params
    })
}
// =======================招揽人才结束=========================



// =======================找工作开始=========================
// 分页获取工作
export function queryJobsByPage(data) {
    return request({
        url: '/personel/queryJobsByPage',
        method: 'post',
        data
    })
}
// 职位申请
export function applyJob(data) {
    return request({
        url: '/personel/applyJob',
        method: 'post',
        data
    })
}
// 职位收藏
export function collectJobs(data) {
    return request({
        url: '/personel/collectJobs',
        method: 'post',
        data
    })
}
// 职位详情
export function queryJobDetail(params) {
    return request({
        url: '/personel/queryJobDetail',
        method: 'post',
        params
    })
}
// =======================找工作结束=========================