import {request} from './request'

// 悬浮框（联系我们）
export function onlineConsultationPage(data) {
    return request({
        url: "/online/consultation/page",
        method: 'post',
        data
    })
}

// 飘窗
export function surveyPage(data) {
    return request({
        url: "/survey/page",
        method: 'post',
        data
    })
}

// 置灰
export function websiteGreyStatus() {
    return request({
        url: "/website/greyStatus",
        method: 'get',
    })
}

// 底部链接
export function repairPointPage(data) {
    return request({
        url: "/repair/point/page",
        method: 'post',
        data
    })
}

// 新闻分类
export function storyTypePage(data) {
    return request({
        url: "/story/type/page",
        method: 'post',
        data
    })
}

// 新闻动态
export function storyPage(data) {
    return request({
        url: "/story/page",
        method: 'post',
        data
    })
}

// 新闻动态详情
export function storyGet(id) {
    return request({
        url: `/story/get/${id}`,
        method: 'post',
    })
}

// 科普教育分类
export function restTypePage(data) {
    return request({
        url: "/rest/type/page",
        method: 'post',
        data
    })
}

// 科普教育
export function restaurantPage(data) {
    return request({
        url: "/restaurant/page",
        method: 'post',
        data
    })
}

// 科普教育详情
export function restaurantGet(id) {
    return request({
        url: `/restaurant/get/${id}`,
        method: 'post',
    })
}

// 算力资源
export function noticePage(data) {
    return request({
        url: "/notice/page",
        method: 'post',
        data
    })
}

// 管理团队
export function strategyPage(data) {
    return request({
        url: "/strategy/page",
        method: 'post',
        data
    })
}

// 活动预约
export function mealSet(data) {
    return request({
        url: "/meal/set",
        method: 'post',
        data
    })
}

// 中心介绍
export function introGet() {
    return request({
        url: "/intro/get",
        method: 'get',
    })
}

// 首页轮播图和各个页面的banner
export function scenicPage(data) {
    return request({
        url: "/scenic/page",
        method: 'post',
        data
    })
}

// 合作伙伴
export function suggestionsTypePage(data) {
    return request({
        url: "/suggestions/type/page",
        method: 'post',
        data
    })
}

// 荣誉资质
export function serviceTypePage(data) {
    return request({
        url: "/service/type/page",
        method: 'post',
        data
    })
}

// 发展历程
export function dishPage() {
    return request({
        url: `/dish/getAll`,
        method: 'get',
    })
}

// 中心风采
export function playNanshanPage(data) {
    return request({
        url: "/play/nanshan/page",
        method: 'post',
        data
    })
}

// 中心介绍模块列表
export function moduleList(data) {
    return request({
        url: "/module/list",
        method: 'post',
        data
    })
}

// 中心介绍模块数据
export function moduleDataPage(data) {
    return request({
        url: "/module/dataPage",
        method: 'post',
        data
    })
}

// 可预约活动列表
export function restaurantActivityList() {
    return request({
        url: "/restaurant/activityList",
        method: 'get',
    })
}

// 备案号
export function websiteNumber() {
    return request({
        url: "/websiteNumber/get",
        method: 'get',
    })
}