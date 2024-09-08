<template>
	<view class="preview" v-if="currentInfo">
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item, index) in classList" :key="item._id">
				<image v-if="readImgs.includes(index)" @tap="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-show="maskState">
			<view class="goBack" :style="{ top: getStatusBarHeight() + 'px' }" @tap="goBack">
				<uni-icons type="back" size="24" color="#fff"></uni-icons>
			</view>
			<view class="count">{{ currentIndex + 1 }} / {{ classList.length }}</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" v-for="item in information" :key="item" @tap="handleTap(item.name)">
					<uni-icons :type="item.icon" size="28" :color="item.color"></uni-icons>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<!-- 信息弹出层 -->
		<uni-popup ref="infoPopup" type="bottom" :safe-area="false">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @tap="handleClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row" v-for="item in popData" :key="item">
							<view class="label">{{ item.label }}</view>
							<view class="value roteBox" v-if="item.label == '评分:'">
								<uni-rate readonly touchable value="3.5" size="16" />
								<text class="score">{{ item.value }}</text>
							</view>
							<view class="value tabs" v-else-if="item.label == '标签:'">
								<view class="tab" v-for="tab in item.tabs" :key="tab">{{ tab }}</view>
							</view>
							<text v-else selectable class="value">{{ item.value }}</text>
						</view>
						<view class="copyright">声明：仅用于学习，切勿商业用途</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 评分弹出层 -->
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{ isScore ? '评分过了~' : '壁纸评分' }}</view>
					<view class="close" @tap="handleScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore" allowHalf :disabled="isScore" disabled-color="#FFCA3E" />
					<text class="text">{{ userScore }}分</text>
				</view>
				<view class="footer">
					<button @tap="submitScore" :disabled="!userScore || isScore" type="default" size="mini" plain="">确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref} from 'vue'
import { onLoad, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
import { getStatusBarHeight } from "@/utils/system.js"
import { apiSetupScore, apiWriteDownload, apiDetailWall } from "@/api/preview.js"

const maskState = ref(true) // 默认显示遮罩内容
const infoPopup = ref() // 信息弹窗实例
const scorePopup = ref() // 评分弹窗实例
const userScore = ref(0) // 用户评分
const currentId = ref(null) // 当前的id
const currentIndex = ref(0) // 当前的索引
const readImgs = ref([]) // 要查看的图片
const currentInfo = ref(null) // 当前要查看的图片信息
const classList = ref([]) // 预览图片数据
const isScore = ref(false) // 是否评分

let information = ref([ // 遮罩文本信息
	{ name: '信息', icon: 'info', color: 'orange' },
	{ name: '评分', icon: 'star', color: 'yellow' },
	{ name: '下载', icon: 'download', color: 'green' },
])
let popData = ref([ // 弹框文本数据
	{ label: '壁纸ID:', value: '52315631563' },
	{ label: '发布者:', value: 'author' },
	{ label: '评分:', value: '5分' },
	{ label: '摘要:', value: '52315123123' },
	{ label: '标签:', tabs: ['标签名', '标签名', '标签名'] }
])


const storgClassList = uni.getStorageSync("storgClassList") || [] // 缓存中的数据
classList.value = storgClassList.map(item => {
	return {
		...item,
		picurl: item.smallPicurl.replace("_small.webp", ".jpg")
	}
})

const readImgFun = () => {
	readImgs.value.push(
		currentIndex.value <= 0 ? classList.value.length-1 : currentIndex.value-1,
		currentIndex.value,
		currentIndex.value >= classList.value.length-1 ? 0 : currentIndex.value+1
	)
	readImgs.value = [...new Set(readImgs.value)]
}

onLoad(async (e) => {
	currentId.value = e.id
	if (e.type == 'share') {
		let res = await apiDetailWall({id: currentId.value})
		classList.value = res.data.map(item => {
			return {
				...item,
				picurl: item.smallPicurl.replace("_small.webp", ".jpg")
			}
		})
	}
	currentIndex.value = classList.value.findIndex(item => item._id == currentId.value)
	currentInfo.value = classList.value[currentIndex.value]
	if (currentInfo.value) {
		information.value[1].name = currentInfo.value.score + '分'
		popData.value[0].value = currentInfo.value._id
		popData.value[1].value = currentInfo.value.nickname
		popData.value[2].value = currentInfo.value.score + '分'
		popData.value[3].value = currentInfo.value.description
		popData.value[4].tabs = currentInfo.value.tabs
	}
	readImgFun()
})

const swiperChange = (e) => {
	currentIndex.value = e.detail.current
	currentInfo.value = classList.value[currentIndex.value]
	if (currentInfo.value) {
		information.value[1].name = currentInfo.value.score + '分'
		popData.value[0].value = currentInfo.value._id
		popData.value[1].value = currentInfo.value.nickname
		popData.value[2].value = currentInfo.value.score + '分'
		popData.value[3].value = currentInfo.value.description
		popData.value[4].tabs = currentInfo.value.tabs
	}
	readImgFun()
}

// 点击返回按钮
const goBack = () => {
	uni.navigateBack({
		success: () => {
			uni.navigateBack()
		},
		fail: (err) => {
			uni.reLaunch({
				url: "/pages/index/index"
			})
		}
	})
}
 
// 点击图片取消遮罩内容
const maskChange = () => {
	maskState.value = !maskState.value
}
// 处理底部遮罩内容的点击事件
const handleTap = async (name) => {
	if (name == '信息') {
		infoPopup.value.open()
	} else if (name.includes('分')) {
		if (currentInfo.value.userScore) {
			isScore.value = true
			userScore.value = currentInfo.value.userScore
		}
		scorePopup.value.open()
	} else if (name == '下载') {
		// #ifdef H5
		uni.showModal({
			content: "请长按保存按钮",
			showCancel: false
		})
		// #endif
		// #ifdef MP-WEIXIN
		try{
			uni.showLoading({
				title: "下载中...",
				mask: true
			})
			let { classid, _id: wallId } = currentInfo.value
			// 获取下载记录
			let res = await apiWriteDownload({
				classid,
				wallId
			})
			if (res.errCode !=0) throw res
			uni.getImageInfo({
				src: currentInfo.value.picurl,
				success: (res) => {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success(res) {
							uni.showToast({
								title: "保存成功，请到相册查看",
								icon: "none"
							})
						},
						fail: err => {
							if (err.errMsg === 'saveTmageToPhotosAlbum:fail cancel') {
								uni.showToast({
									title: "保存失败，请重新点击下载",
									icon: "none"
								})
								return
							}
							uni.showModal({
								title: "授权提示",
								content: "需要授权保存相册",
								success: res => {
									if (res.confirm) {
										uni.openSetting({
											success: (setting) => {
												if (setting.authSetting['scope.writePhotosAlbum']) {
													uni.showToast({
														title: "获取授权成功",
														icon: "none"
													})
												} else {
													uni.showToast({
														title: "获取权限失败",
														icon: "none"
													})
												}
											}
										})
									}
								}
							})
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				}
			})
		}catch(e){
			uni.hideLoading()
		}
		// #endif
	}
}
// 处理弹框中关闭图标的点击事件
const handleClose = () => {
	infoPopup.value.close()
}

// 关闭评分弹出
const handleScoreClose = () => {
	scorePopup.value.close()
	userScore.value = 0
	isScore.value = false
}
// 处理提交分数
const submitScore = async () => {
	uni.showLoading({
		title: "加载中..."
	})
	let { classid, _id: wallId } = currentInfo.value
	let res = await apiSetupScore({
		classid,
		wallId,
		userScore: userScore.value
	})
	uni.hideLoading()
	if (res.errCode === 0) {
		uni.showToast({
			title: "评分成功",
			icon: "none"
		})
		classList.value[currentIndex.value].userScore = userScore.value
		uni.setStorageSync("storgClassList", classList.value)
		handleScoreClose()
	}
}

// 分享给好友
onShareAppMessage((e) => {
	return {
		title: "看我分享的图片",
		path: "/pages/preview/preview?id=" + currentId.value + "&type=share"
	}
})
// 分享到朋友圈
onShareTimeline(() => {
	return {
		title: "朋友圈分享啦",
		query: "id=" + currentId.value + "&type=share"
	}
})
</script>

<style scoped lang="scss">
.preview {
	width: 100%;
	height: 100vh;
	position: relative;
	swiper {
		width: 100%;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.mask {
		&>view {
			position: absolute;
			width: fit-content;
			left: 0;
			right: 0;
			margin: auto;
			color: #fff;
		}
		.goBack {
			width: 80rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(0,0,0,.5);
			top: 0;
			left: 30rpx;
			margin-left: 0;
			border-radius: 100rpx;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255,255,255,.3);
		}
		.count {
			top: 10vh;
			background: rgba(0,0,0,.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding: 8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}
		.time {
			font-size: 140rpx;
			top: calc(10vh + 80rpx);
			font-weight: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0,0,0,.3);
		}
		.date {
			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0,0,0,.3);
		}
		.footer {
			background: rgba(255,255,255,.8);
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color: #000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-sizing: 0 2rpx 0 rgba(0,0,0,.1);
			backdrop-filter: blur(20rpx);
			.box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 2rpx 12rpx;
				.text {
					font-size: 26rpx;
					color: $font-color-small-title;
				}
			}
		}
	}
	.popHeader {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			color: $font-color-small-title;
			font-size: 26rpx
		}
		.close {
			padding: 6rpx;
		}
	}
	.infoPopup {
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		scroll-view {
			max-height: 60vh;
			.content {
				.row {
					display: flex;
					align-items: center;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label {
						color: $font-color-title;
						width: 140rpx;
						text-align: right;
						font-size: 35rpx;
						margin-right: 10rpx;
					}
					.value {
						flex: 1;
						width: 0;
					}
					.roteBox {
						display: flex;
						align-items: center;
						.score {
							font-size: 26rpx;
							color: $font-color-small-title;
							padding-left: 10rpx;
						}
					}
					.tabs {
						display: flex;
						flex-wrap: wrap;
						.tab {
							border: 1px solid $font-color-primary;
							color: $font-color-primary;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin-right: 10rpx;
						}
					}
				}
				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background-color: #f6f6f6;
					color: #000;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}
	.scorePopup {
		background-color: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.content {
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text {
				color: #ffca3e;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}
		.footer {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
