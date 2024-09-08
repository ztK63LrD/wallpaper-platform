import request from "@/utils/request.js"

// 获取评分数据
export function apiSetupScore(data={}) {
	return request({
		url: '/setupScore',
		data
	})
}
// 获取下载图片记录
export function apiWriteDownload(data={}) {
	return request({
		url: "/downloadWall",
		data
	})
}
// 获取单张壁纸数据
export function apiDetailWall(data={}) {
	return request({
		url: "/detailWall",
		data
	})
}