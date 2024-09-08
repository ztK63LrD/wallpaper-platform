import request from "@/utils/request.js"

// 获取轮播图数据
export function apiGerBanner() {
	return request({
		url: '/homeBanner'
	})
}

// 获取每日推荐数据
export function apiGetDayRandom() {
	return request({
		url: '/randomWall'
	})
}

// 获取专题精选数据
export function apiGetNotice(data={}) {
	return request({
		url: '/wallNewsList',
		data
	})
}
// 获取壁纸分类数据
export function apiGetClassify(data={}) {
	return request({
		url: '/classify',
		data
	})
}

// 获取公告数据
export function apiNoticeDetail(data={}) {
	return request({
		url: "/wallNewsDetail",
		data
	})
}