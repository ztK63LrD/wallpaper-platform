import request from "@/utils/request.js"

// 获取用户信息相关数据
export function apiSearchData(data={}) {
	return request({
		url: '/searchWall',
		data
	})
}
