<template>
	<view class="user pageBg" v-if="userInfo">
		<view class="info">
			<view :style="{ height: getNavBarHeight() + 'px' }"></view>
			<view class="avatar">
				<image src="../../common/image/2.jpg" mode="aspectFill"></image>
			</view>
			<view class="ip">{{ userInfo.IP }}</view>
			<view class="address">来自于: {{ userInfo.address?.city || userInfo.address?.province || userInfo.address?.country }}</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator class="row" v-for="item in selectData.slice(0,3)" :key="item" :url="item.url">
					<view class="left">
						<uni-icons :type="item.icon" size="24" :color="item.color"></uni-icons>
						<view class="text">{{ item.name }}</view>
					</view>
					<view class="right">
						<view class="text">{{ item.text }}</view>
						<uni-icons type="right" size="18" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<!-- #ifdef MP -->
				<button open-type="contact">联系客服</button>
				<!-- #endif -->
				<!-- #ifndef MP -->
				<button @click="clickContent">拨打电话</button>
				<!-- #endif -->
			</view>
		</view>
		<view class="section">
			<view class="list"> 
				<navigator class="row" v-for="item in selectData.slice(3)" :key="item" :url="item.url">
					<view class="left">
						<uni-icons :type="item.icon" size="24" :color="item.color"></uni-icons>
						<view class="text">{{ item.name }}</view>
					</view>
					<view class="right">
						<view class="text">{{ item.text }}</view>
						<uni-icons type="right" size="18" color="#aaa"></uni-icons>
					</view>
				</navigator>
			</view>
		</view>
	</view>
	<view class="loadingLayout" v-else>
		<view :style="{ height: getNavBarHeight() + 'px' }"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { apiUserInfo } from '@/api/user.js'
import { getNavBarHeight } from "@/utils/system.js"

const userInfo = ref({})

// 定义section模块数据
let selectData = ref([
	{ url: '/pages/classlist/classlist?name=我的下载&type=download', icon: 'download-filled', color: '#008c8c', name: '我的下载', text: '0' },
	{ url: '/pages/classlist/classlist?name=我的评分&type=score', icon: 'star-filled', color: '#FFD700', name: '我的评分', text: '0' },
	{ url:'', icon: 'chatboxes-filled', color: '#4169E1', name: '联系客服', text: '0' },
	{ url: '', icon: 'notification-filled', color: '#5F9EA0', name: '订阅更新', text: '0' },
	{ url: '/pages/notice/notice?id=6536358ce0ec19c8d67fbe82', icon: 'info-filled', color: '#DC143C', name: '常见问题', text: '0' },
])
 
// H5等平台拨打电话回调
const clickContent = () => {
	uni.makePhoneCall({
		phoneNumber: "114"
	})
}

// 获取用户信息
const  getUserInfo = async () => {
	let res = await apiUserInfo()
	userInfo.value = res.data
	selectData.value[0].text = res.data.downloadSize
	selectData.value[1].text = res.data.scoreSize
	selectData.value[2].text = res.data.downloadSize
	selectData.value[3].text = res.data.downloadSize
	selectData.value[4].text = res.data.downloadSize
}

onLoad((e) => {
	getUserInfo()
})
</script>

<style scoped lang="scss">
.user {
	.info {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 1005;
			}
		}
		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.address {
			font-size: 28rpx;
			color: #aaa;
		}
	}
	.section {
		width: 690rpx;
		margin: 30rpx auto 50rpx;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0,0,0,.05);
		.list {
			position: relative;
			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				background-color: #fff;
				:deep(.navigator-wrap) {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				&:last-child {
					border-bottom: 0;
				}
				.left {
					display: flex;
					align-items: center;
					.text {
						padding-left: 20rpx;
						color: #666;
					}
				}
				.right {
					display: flex;
					align-items: center;
					.text {
						font-size: 28rpx;
						color: #aaa;
					}
				}
			}
			button {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100rpx;
				opacity: 0;
			}
		}
	}
}
</style>
