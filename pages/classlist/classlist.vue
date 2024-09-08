<template>
	<view class="classlist">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator 
				:url="'/pages/preview/preview?id=' + item._id" 
				class="item" 
				v-for="item in classList" 
				:key="item._id"
			>
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
		</view>
		<view class="safe-area-insert-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue'	
import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
import { apiGetClassList } from '@/api/classlist.js'
import { apiGetHistoryList } from "@/api/user.js"
import { gotoHome } from "@/utils/tool.js"

const classList = ref([])
const noData = ref(false)
const queryParams = {
	pageNum: 1,
	pageSize: 12
}
let pageName = null

// 获取分类列表数据
const getClassList = async () => {
	let res
	if (queryParams.classid) res = await apiGetClassList(queryParams)
	if (queryParams.type) res = await apiGetHistoryList(queryParams)
	classList.value = [...classList.value, ...res.data]
	if (queryParams.pageSize > res.data.length) noData.value = true // 最后的数据小于最初设置的大小
	uni.setStorageSync("storgClassList", classList.value)
}

onLoad((e)=> {
	let { id = null, name=null, type=null } = e
	if (type) queryParams.type = type
	if (id) queryParams.classid = id
	queryParams.classid = id
	pageName = name
	// 修改当前分类列表页面的标题
	uni.setNavigationBarTitle({
		title: name
	})
	getClassList()
})

// 分享给好友
onShareAppMessage((e) => {
	return {
		title: "看我分享的图片" + pageName,
		path: "/pages/classlist/classlist?id=" + queryParams.classid + "&name=" + pageName
	}
})
// 分享到朋友圈
onShareTimeline(() => {
	return {
		title: "朋友圈分享啦" + pageName,
		query: "id=" + queryParams.classid + "&name=" + pageName
	}
})

onReachBottom(() => {
	if (noData.value) return 
	queryParams.pageNum++
	getClassList()
})
onUnload(() => {
	uni.removeStorageSync("storgClassList")
})
</script>

<style scoped lang="scss">
.classlist {
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item {
			height: 440rpx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
