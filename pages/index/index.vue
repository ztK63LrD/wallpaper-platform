<template>
	<view class="home pageBg">
		<!-- 自定义头部导航 -->
		<custom-nav-bar :title="'推荐'"></custom-nav-bar>
		<!-- 轮播图区域 --> 
		<view class="banner">
			<swiper 
				circular
				indicator-dots 
				autoplay 
				indicator-color="rgba(255,255,255,.5)" 
				indicator-active-color="#fff"
				:interval="3000" 
				:duration="1000" 
			>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill" alt="轮播图"  />
				</swiper-item>	
			</swiper>
		</view>
		<!-- 公告区域 -->
		<view class="notice">
			<view class="notice-left">
				<uni-icons type="sound-filled" size="20" color="#008c8c"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="notice-center">
				<swiper vertical autoplay :interval="1500" :duration="300" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notice/notice?id=' + item._id">
							{{ item.title }}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="notice-right">
				<uni-icons type="right" size="20" color="#333"></uni-icons>
			</view>
		</view>
		<!-- 内容选择 -->
		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="24"></uni-icons>
						<uni-dateformat class="text" :date="Date.now()" format="dd日"></uni-dateformat>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x >
					<view class="box" v-for="item in randomList" :key="item._id" @tap="goPreview(item._id)">
						<navigator :url="'/pages/preview/preview?id=' + item._id">
							<image :src="item.smallPicurl" mode="aspectFill"></image>
						</navigator>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 主题选择 -->
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="" class="more">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
import { apiGerBanner, apiGetDayRandom, apiGetNotice, apiGetClassify } from '@/api/home.js'

const bannerList = ref([]) // 轮播图数据
const randomList = ref([]) // 随机九张图片
const noticeList = ref([]) // 公告内容数据
const classifyList = ref([]) // 专题精选数据

// 获取首页相关数据
const getHomeData = async () => {
	let banner = await apiGerBanner()
	let random = await apiGetDayRandom()
	let notice = await apiGetNotice({select:true})
	let classify = await apiGetClassify({select: true})
    // 等待所有请求完成,不会因为某个 Promise 失败而导致整个操作失败
    const results = await Promise.allSettled([banner, random, notice, classify]);
	// 处理每个请求的结果
	results.forEach((result, index) => {
	    if (result.status === 'fulfilled') {
	      // 请求成功
	      switch (index) {
	        case 0:
				bannerList.value = result.value.data || [];
				break;
	        case 1:
				randomList.value = result.value.data || [];
				break;
	        case 2:
				noticeList.value = result.value.data || [];
				break;
			case 3:
				classifyList.value = result.value.data || [];
				break;
	        default:
	            break;
	      }
	    } else {
	        // 请求失败
	        console.error(`Request ${index} failed:`, result.reason);
	    }
	});
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

// 跳转到预览界面
const goPreview = (id) => {
	uni.setStorageSync("storgClassList", randomList.value)
	// uni.navigateTo({
	// 	url: "/pages/preview/preview?id=" + id
	// })
}
 
onMounted(() => {
	getHomeData()
})
</script>

<style scoped lang="scss">
.home {
	.banner {
		width: 750rpx;
		padding: 30rpx 0;
		swiper {
			 width: 750rpx;
			 height: 340rpx;
			 &-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
			 }
		}
	}
	.notice {
		width: 690rpx;
		height: 80rpx;
		background: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;
		&-left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(.uni-icons) {
				color: $font-color-primary;
			}
			.text {
				color: $font-color-primary;
				font-weight: 600;
				font-size: 28rpx
			}
		}
		&-center {
			flex: 1;
			swiper {
				height: 100%;
				&-item {
					display: flex;
					align-items: center;
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			
		}
		&-right {
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.select {
		padding-top: 40rpx;
		.date {
			color: #28b389;
			display: flex;
			align-items: center;
			.text {
				margin-left: 5rpx;
				font-weight: bold;
			}
		}
		.content {
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view {
				white-space: nowrap;
				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					&:last-child {
						margin-right: 30rpx;
					}
					navigator {
						width: 100%;
						height: 100%;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
				}
			}
		}
	}
	.theme {
		padding: 30rpx 0 50rpx;
		.more {
			font-size: 32rpx;
			color: #888;
		}
		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}

</style>
