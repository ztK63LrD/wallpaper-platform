<template>
	<view class="theme-item">
		<navigator 
			:url="`/pages/classlist/classlist?id=` + item._id + '&name=' + item.name" 
			class="box" 
			v-if="!props.isMore"
		>
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{ item.name }}</view>
			<view class="tab">{{ compareTimestamp(item.updateTime) || 'n月' }}前更新</view>
		</navigator>
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-else>
			<image class="pic" src="../../common/image/2.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import { compareTimestamp } from '@/utils/tool.js'
	
const props = defineProps({
	isMore: {
		type: Boolean,
		default: false
	},
	item: {
		type: Object,
		default() {
			return {
				name: '默认名称',
				picurl: '../../common/image/2.jpg',
				updateTime: Date.now() - 1000 * 60 * 60 * 5
			}
		}
 	}
})
</script>

<style scoped lang="scss">
.theme-item {
	.box {
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic {
			width: 100%;
			height: 100%;
		}
		.mask {
			width: 100%;
			height: 70rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			background: rgba(0,0,0,.2);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(15rpx);
			font-weight: 600;
			font-size: 30rpx
		}
		.tab {
			position: absolute;
			left: 0;
			top: 0;
			background: rgba(250,129,90,.7);
			backdrop-filter: blur(20rpx);
			color: #fff;
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
			transform: scale(1.05);
			transform-origin: left top; 
		}
	}
	.more {
		.mask {
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text {
			font-size: 28rpx
		}
	}
}
</style>