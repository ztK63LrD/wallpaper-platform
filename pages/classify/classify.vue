<template>
	<view class="classify">
		<!-- 自定义头部导航 -->
		<custom-nav-bar :title="'分类'"></custom-nav-bar>
		<view class="content">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
import { apiGetClassify } from '@/api/home.js'

const classifyList = ref([]) // 专题精选数据
	
const getClassify = async () => {
	let res = await apiGetClassify({ pageSize: 15 })
	classifyList.value = res.data
}

// 分享给好友
onShareAppMessage((e) => {
	return {
		title: "看我分享的图片！",
		path: "/pages/classify/classify"
	}
})
// 分享到朋友圈
onShareTimeline(() => {
	return {
		title: "朋友圈分享啦",
		imageUrl: "/static/logo.png"
	}
})

onMounted(() => {
	getClassify()
})
</script>

<style scoped lang="scss">
.classify {
	padding: 30rpx;
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 15rpx;
	}
}
</style>
