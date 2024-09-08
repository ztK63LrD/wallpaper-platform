import request from "@/utils/request.js"

// 获取分类列表数据
export function apiGetClassList(data={}) {
	return request({
		url: '/wallList',
		data
	})
}
