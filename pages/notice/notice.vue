<template>
	<view class="notice" v-if="notice">
		<view class="title">
			<view class="tag" v-if="notice.select">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">{{ notice.title }}</view>
		</view>
		<view class="info">
			<view class="item">{{ notice.author }}</view>
			<view class="item">
				<uni-dateformat :date="notice.publish_date" format="yyyy-MM-dd hh:mm:ss" />
			</view>
		</view>
		<view class="content">
			<rich-text :nodes="notice.content"></rich-text>
		</view>
		<view class="count">
			阅读 {{ notice.view_count }}
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import { apiNoticeDetail } from "@/api/home.js"
	
const notice = ref({})	
	
// 获取详情公告数据
const getNoticeDetail = async (id) => {
	let res = await apiNoticeDetail({ id: id })
	notice.value = res.data
}

onLoad((e) => {
	let { id=null } = e
	getNoticeDetail(id)
})
</script>

<style scoped lang="scss">
.notice {
	padding: 30rpx;
	.title {
		font-size: 40rpx;
		color: #111;
		line-height: 20rpx;
		padding-bottom: 30rpx;
		display: flex;
		.tag {
			transform: scale(0.8);
			transform-origin: left center;
			flex-shrink: 0;
		}
		.font {
			padding-left: 6rpx;
		}
	}
	
}
</style>
