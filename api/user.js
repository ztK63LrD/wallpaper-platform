import request from "@/utils/request.js"

// 获取用户信息相关数据
export function apiUserInfo(data={}) {
	return request({
		url: '/userInfo',
		data
	})
}

// 获取历史分类列表数据
export function apiGetHistoryList(data={}) {
	return request({
		url: "/userWallList",
		data
	})
}